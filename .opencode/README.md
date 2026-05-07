# read-pdf — Custom Tool for OpenCode

Extracts text from PDF files with automatic OCR fallback for scanned documents.

## Features

- Extract text from digital PDFs (via `pdf-parse`)
- Automatic fallback to OCR for scanned/image PDFs (via `tesseract.js`)
- Page selection: `pages: "1-3,5"` extracts only pages 1, 2, 3, and 5
- Returns metadata: title, author, page count

## Usage

```
> read-pdf path:"C:\\docs\\relatorio.pdf"
> read-pdf path:"C:\\docs\\relatorio.pdf" pages:"1-3,5"
```

## Installation

### Prerequisites

- [Bun](https://bun.sh) runtime (required by OpenCode)

### Setup

```bash
cd .opencode
bun install
```

That's it. The tool is auto-discovered by OpenCode.

## How it works

1. Tries `pdf-parse` first (fast, no external dependencies)
2. If extracted text is very short (< 50 chars), falls back to `tesseract.js` OCR
3. If pdf-parse throws an error, also falls back to OCR

## Portability

Copy this `.opencode/` folder to any OpenCode project to reuse the tool.