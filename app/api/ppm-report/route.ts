import { readFile } from "node:fs/promises"
import { NextResponse } from "next/server"

const REPORT_PATH = "/Users/pomelo/work/projects/ppm/scripts-output/event-analysis-report.json"

export async function GET() {
  try {
    const content = await readFile(REPORT_PATH, "utf-8")
    const json = JSON.parse(content)
    return NextResponse.json(json)
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to read PPM report", path: REPORT_PATH },
      { status: 500 },
    )
  }
}

