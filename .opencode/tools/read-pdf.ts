import { tool } from "@opencode-ai/plugin";
import { extractPdf } from "../lib/pdf-extractor";

export default tool({
  description:
    "Read a PDF file and return its text content. Supports page selection (e.g. '1-3,5') and automatic OCR fallback for scanned PDFs. Returns title, author, page count, and extracted text.",

  args: {
    path: tool.schema
      .string()
      .describe("Absolute path to the PDF file"),

    pages: tool.schema
      .string()
      .optional()
      .describe(
        "Page range to extract, e.g. '1-3,5' for pages 1,2,3 and 5. Omit for all pages."
      ),
  },

  async execute(args, context) {
    const { path, pages } = args;

    const result = await extractPdf(path, pages);

    if (result.method === "error") {
      return `ERROR: ${result.error}`;
    }

    const meta = result.meta;
    const header = [
      `📄 PDF: ${path}`,
      `   Title:  ${meta.title || "(not available)"}`,
      `   Author: ${meta.author || "(not available)"}`,
      `   Pages:  ${meta.pages}`,
      `   Method: ${result.method}`,
      `   Length: ${result.text.length} characters`,
      "",
      "--- CONTENT ---",
      result.text,
    ].join("\n");

    return header;
  },
});