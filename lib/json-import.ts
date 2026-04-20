import type { EventFile, FunctionCard, SplitGroup } from "./types"

// PPM 数据结构
interface PPMMethod {
  name: string
  params: string
  comment: string
  lineCount: number
  isAsync: boolean
  code?: string
}

interface PPMAnalysis {
  fileName: string
  filePath: string
  totalLines: number
  className: string
  methods: PPMMethod[]
  importLines: number
  classBodyStartLine: number
  needsSplit: boolean
}

interface PPMReport {
  generatedAt: string
  splitThreshold: number
  scanDir: string
  totalFiles: number
  totalLines: number
  totalMethods: number
  filesNeedingSplit: string[]
  analyses: PPMAnalysis[]
}

// UMC 数据结构
interface UMCMethod {
  name: string
  params: string
  start_line: number
  end_line: number
  lines: number
  comment: string
  code?: string
}

interface UMCFile {
  filename: string
  filepath: string
  total_lines: number
  class_name: string
  methods: UMCMethod[]
  method_count: number
}

interface UMCReport {
  directory: string
  file_count: number
  total_lines: number
  total_methods: number
  files: UMCFile[]
}

// PDM 数据结构
interface PDMMethod {
  name: string
  access: string
  isAsync: boolean
  comment: string | null
  params: string
  startLine: number
  endLine: number
  lines: number
  code?: string
}

interface PDMDetail {
  fileName: string
  totalLines: number
  methodCount: number
  methods: PDMMethod[]
}

interface PDMReport {
  summary: {
    totalFiles: number
    totalLines: number
    totalMethods: number
    filesNeedSplit: number
  }
  details: PDMDetail[]
}

/**
 * 解析 PPM 项目的事件分析报告
 */
export function parsePPMReport(report: PPMReport): EventFile[] {
  return report.analyses.map((analysis, fileIndex) => {
    const cards: FunctionCard[] = analysis.methods.map((method, methodIndex) => {
      const card: FunctionCard = {
        id: `ppm_c${fileIndex}_${methodIndex}`,
        name: method.name,
        lines: method.lineCount,
      }
      const eventType = method.isAsync ? `async ${method.params}` : method.params
      if (eventType) {
        card.event_type = eventType
      }
      if (method.comment) {
        card.note = method.comment
      }
      if (method.code) {
        card.code = method.code
      }
      return card
    })

    const group: SplitGroup = {
      id: `ppm_g${fileIndex}`,
      name: "全部函数",
      cards,
    }

    return {
      id: `ppm_f${fileIndex}`,
      project: "PPM" as const,
      filename: analysis.fileName,
      groups: [group],
    }
  })
}

/**
 * 解析 UMC 项目的事件分析报告
 */
export function parseUMCReport(report: UMCReport): EventFile[] {
  return report.files.map((file, fileIndex) => {
    const cards: FunctionCard[] = file.methods.map((method, methodIndex) => {
      const card: FunctionCard = {
        id: `umc_c${fileIndex}_${methodIndex}`,
        name: method.name,
        lines: method.lines,
      }
      if (method.params) {
        card.event_type = method.params
      }
      if (method.comment) {
        card.note = method.comment
      }
      if (method.code) {
        card.code = method.code
      }
      return card
    })

    const group: SplitGroup = {
      id: `umc_g${fileIndex}`,
      name: "全部函数",
      cards,
    }

    return {
      id: `umc_f${fileIndex}`,
      project: "UMC" as const,
      filename: file.filename,
      groups: [group],
    }
  })
}

/**
 * 解析 PDM 项目的事件分析报告
 */
export function parsePDMReport(report: PDMReport): EventFile[] {
  return report.details.map((file, fileIndex) => {
    const cards: FunctionCard[] = file.methods.map((method, methodIndex) => {
      const card: FunctionCard = {
        id: `pdm_c${fileIndex}_${methodIndex}`,
        name: method.name,
        lines: method.lines,
      }
      const eventType = method.isAsync ? `async ${method.params}` : method.params
      if (eventType) {
        card.event_type = eventType
      }
      if (method.comment) {
        card.note = method.comment
      }
      if (method.code) {
        card.code = method.code
      }
      return card
    })

    const group: SplitGroup = {
      id: `pdm_g${fileIndex}`,
      name: "全部函数",
      cards,
    }

    return {
      id: `pdm_f${fileIndex}`,
      project: "PDM" as const,
      filename: file.fileName,
      groups: [group],
    }
  })
}

/**
 * 兼容旧接口 - 解析 PPM 格式
 */
export function parseEventAnalysisReport(
  report: PPMReport,
  project: "PDM" | "UMC" | "PPM" = "PPM",
): EventFile[] {
  if (project === "PPM") {
    return parsePPMReport(report)
  }
  if (project === "UMC") {
    return parseUMCReport(report as unknown as UMCReport)
  }
  return parsePDMReport(report as unknown as PDMReport)
}
