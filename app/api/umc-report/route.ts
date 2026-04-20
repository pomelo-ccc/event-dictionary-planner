import { readFile } from "node:fs/promises"
import { NextResponse } from "next/server"

const REPORT_PATH = "/Users/pomelo/work/projects/umc/src/app/event/_analysis.json"

export async function GET() {
  try {
    const content = await readFile(REPORT_PATH, "utf-8")
    const json = JSON.parse(content)
    return NextResponse.json(json)
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to read UMC report", path: REPORT_PATH },
      { status: 500 },
    )
  }
}

