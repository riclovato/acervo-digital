import { readFileSync, existsSync } from "fs";

interface PdfMeta {
  title: string | null;
  author: string | null;
  pages: number;
}

interface ExtractResult {
  text: string;
  method: "pdf-parse" | "tesseract-ocr" | "error";
  meta: PdfMeta;
  error?: string;
}

function parsePageRange(range: string, totalPages: number): number[] {
  const pages: Set<number> = new Set();
  for (const part of range.split(",")) {
    const trimmed = part.trim();
    if (trimmed.includes("-")) {
      const [a, b] = trimmed.split("-").map(Number);
      if (!isNaN(a) && !isNaN(b)) {
        for (let i = Math.max(1, a); i <= Math.min(b, totalPages); i++) {
          pages.add(i);
        }
      }
    } else {
      const n = Number(trimmed);
      if (!isNaN(n) && n >= 1 && n <= totalPages) {
        pages.add(n);
      }
    }
  }
  return [...pages].sort((a, b) => a - b);
}

async function extractWithPdfParse(
  buffer: Buffer,
  pageNums?: number[]
): Promise<ExtractResult> {
  const pdfParse = require("pdf-parse");
  const data = await pdfParse(buffer);

  const meta: PdfMeta = {
    title: data.info?.Title || null,
    author: data.info?.Author || null,
    pages: data.numpages,
  };

  let text = data.text || "";

  if (pageNums && pageNums.length > 0) {
    const lines = text.split("\n");
    const perPage = Math.ceil(lines.length / data.numpages);
    const selectedLines: string[] = [];
    for (const p of pageNums) {
      const start = (p - 1) * perPage;
      const end = start + perPage;
      selectedLines.push(...lines.slice(start, end));
    }
    text = selectedLines.join("\n");
  }

  return { text, method: "pdf-parse", meta };
}

async function extractWithOcr(buffer: Buffer): Promise<ExtractResult> {
  const { createWorker } = require("tesseract.js");
  const worker = await createWorker("por+eng");
  const { data } = await worker.recognize(buffer);
  await worker.terminate();

  return {
    text: data.text,
    method: "tesseract-ocr",
    meta: { title: null, author: null, pages: 0 },
  };
}

export async function extractPdf(
  filePath: string,
  pages?: string
): Promise<ExtractResult> {
  const resolvedPath = existsSync(filePath)
    ? filePath
    : existsSync(filePath.replace(/^~/, process.env.USERPROFILE || ""))
      ? filePath.replace(/^~/, process.env.USERPROFILE || "")
      : null;

  if (!resolvedPath) {
    return {
      text: "",
      method: "error",
      meta: { title: null, author: null, pages: 0 },
      error: `File not found: ${filePath}`,
    };
  }

  try {
    const buffer = readFileSync(resolvedPath);

    let result = await extractWithPdfParse(buffer);

    const pageNums = pages ? parsePageRange(pages, result.meta.pages) : undefined;
    if (pages) {
      result = await extractWithPdfParse(buffer, pageNums);
    }

    const meaningfulText = result.text.replace(/\s+/g, " ").trim();
    if (meaningfulText.length < 50 && result.meta.pages > 0) {
      console.error(
        `[read-pdf] pdf-parse returned little text (${meaningfulText.length} chars), trying OCR...`
      );
      const ocrResult = await extractWithOcr(buffer);
      ocrResult.meta = result.meta;
      return ocrResult;
    }

    return result;
  } catch (err: any) {
    try {
      const buffer = readFileSync(resolvedPath);
      console.error(
        `[read-pdf] pdf-parse failed (${err.message}), falling back to OCR...`
      );
      return await extractWithOcr(buffer);
    } catch (ocrErr: any) {
      return {
        text: "",
        method: "error",
        meta: { title: null, author: null, pages: 0 },
        error: `Failed to extract PDF: ${err.message}. OCR also failed: ${ocrErr.message}`,
      };
    }
  }
}