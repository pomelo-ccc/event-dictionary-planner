import type { ProjectId } from "@/lib/types"

/**
 * CSV 上游追踪工具
 *
 * 逻辑：
 * 1. 给定一个函数名 a，在所有 CSV 中搜索 a 出现的行
 * 2. 忽略 Description、Label 列中的匹配
 * 3. 取该行第一列的值作为上游名称
 * 4. 用这个上游名称继续在所有 CSV 中搜索，递归向上
 * 5. 直到找不到更多上游为止
 */

export interface TraceNode {
  /** 当前名称（某行的第一列值或初始搜索值） */
  name: string
  /** 来源文件名 */
  sourceFile: string
  /** 在来源文件中哪一列匹配到的 */
  matchedColumn: string
  /** 匹配行的第一列值（即上游名称） */
  firstColumnValue: string
  /** 该行完整数据 */
  rowData: Record<string, string>
  /** 子节点（更上游） */
  children: TraceNode[]
}

export interface CsvFile {
  fileName: string
  headers: string[]
  rows: Record<string, string>[]
}

const CSV_FILES = [
  "command.csv",
  "form.csv",
  "form_field.csv",
  "page.csv",
  "panel.csv",
  "table.csv",
  "tablefield.csv",
  "toolbar.csv",
]

/** 项目空间到子目录的映射 */
const PROJECT_DIR: Record<string, string> = {
  PDM: "pdm",
  UPM: "umc",
  PPM: "ppm",
}

/** 需要忽略的列名 */
const IGNORE_COLUMNS = new Set(["Description", "Label"])

/**
 * 匹配单元格值中是否包含目标名称
 * 
 * 支持两种情况：
 * 1. 用 | 分隔的列表中的精确匹配，如 "cmdA|cmdB|cmdC" 匹配 "cmdB"
 * 2. 嵌入在长字符串中的子串匹配，如 "event:form/xxx?process=actionName&..." 匹配 "actionName"
 */
function matchCellValue(cellValue: string, targetName: string): boolean {
  // 先尝试 | 分隔的精确匹配
  const items = cellValue.split("|").map((s) => s.trim()).filter(Boolean)
  if (items.includes(targetName)) return true

  // 再尝试子字符串包含匹配
  if (cellValue.includes(targetName)) return true

  return false
}

/** 解析 CSV 文本为结构化数据 */
export function parseCsv(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text.split(/\r?\n/).filter((l) => l.trim())
  if (lines.length === 0) return { headers: [], rows: [] }

  const headers = splitCsvLine(lines[0])
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = splitCsvLine(lines[i])
    const row: Record<string, string> = {}
    headers.forEach((h, idx) => {
      row[h.trim()] = (values[idx] || "").trim()
    })
    rows.push(row)
  }

  return { headers, rows }
}

/** 按逗号分割 CSV 行，支持引号内逗号 */
function splitCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      inQuotes = !inQuotes
    } else if (ch === "," && !inQuotes) {
      result.push(current)
      current = ""
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

/** 加载指定项目空间下的所有 CSV 文件 */
export async function loadAllCsvs(project?: ProjectId): Promise<CsvFile[]> {
  const subDir = project ? (PROJECT_DIR[project] || project.toLowerCase()) : ""
  const basePath = subDir ? `/csv/${subDir}` : "/csv"

  const results = await Promise.all(
    CSV_FILES.map(async (fileName) => {
      try {
        const resp = await fetch(`${basePath}/${fileName}`)
        if (!resp.ok) return null
        const text = await resp.text()
        const { headers, rows } = parseCsv(text)
        return { fileName, headers, rows }
      } catch {
        return null
      }
    })
  )
  return results.filter((r): r is CsvFile => r !== null)
}

/**
 * 在所有 CSV 中搜索包含目标值的行（忽略 Description、Label 列），
 * 返回匹配到的 TraceNode 列表
 */
function findMatches(
  targetName: string,
  csvFiles: CsvFile[],
  visited: Set<string>
): TraceNode[] {
  const nodes: TraceNode[] = []

  for (const csv of csvFiles) {
    for (const row of csv.rows) {
      for (const header of csv.headers) {
        if (IGNORE_COLUMNS.has(header)) continue
        // 第一列是自身名称，也跳过（避免自引用）
        if (header === csv.headers[0]) continue

        const cellValue = row[header] || ""
        // 子字符串匹配：目标名可能作为 | 分隔的独立项出现，
        // 也可能嵌入在长字符串中（如 event:form/xxx?process=actionName&...）
        const matched = matchCellValue(cellValue, targetName)
        if (!matched) continue

        const firstColValue = row[csv.headers[0]] || ""
        // 防止循环
        const visitKey = `${csv.fileName}:${firstColValue}`
        if (visited.has(visitKey)) continue

        nodes.push({
          name: targetName,
          sourceFile: csv.fileName,
          matchedColumn: header,
          firstColumnValue: firstColValue,
          rowData: row,
          children: [],
        })
      }
    }
  }

  return nodes
}

/**
 * 递归追踪上游
 */
export function traceUpstream(
  functionName: string,
  csvFiles: CsvFile[],
  maxDepth: number = 20
): TraceNode[] {
  const visited = new Set<string>()
  return traceRecursive(functionName, csvFiles, visited, maxDepth, 0)
}

function traceRecursive(
  targetName: string,
  csvFiles: CsvFile[],
  visited: Set<string>,
  maxDepth: number,
  currentDepth: number
): TraceNode[] {
  if (currentDepth >= maxDepth) return []

  const matches = findMatches(targetName, csvFiles, visited)

  for (const node of matches) {
    const visitKey = `${node.sourceFile}:${node.firstColumnValue}`
    visited.add(visitKey)
  }

  for (const node of matches) {
    // 用该行的第一列值继续向上追踪
    const upstream = traceRecursive(
      node.firstColumnValue,
      csvFiles,
      visited,
      maxDepth,
      currentDepth + 1
    )
    node.children = upstream
  }

  return matches
}

/** 将追踪树扁平化为链路列表（用于展示） */
export interface TraceChain {
  /** 链路中的每一步 */
  steps: {
    name: string
    sourceFile: string
    matchedColumn: string
    firstColumnValue: string
    rowData: Record<string, string>
  }[]
}

export function flattenTraceTree(nodes: TraceNode[]): TraceChain[] {
  const chains: TraceChain[] = []

  function walk(node: TraceNode, currentSteps: TraceChain["steps"]) {
    const step = {
      name: node.name,
      sourceFile: node.sourceFile,
      matchedColumn: node.matchedColumn,
      firstColumnValue: node.firstColumnValue,
      rowData: node.rowData,
    }

    if (node.children.length === 0) {
      chains.push({ steps: [...currentSteps, step] })
    } else {
      for (const child of node.children) {
        walk(child, [...currentSteps, step])
      }
    }
  }

  for (const node of nodes) {
    walk(node, [])
  }

  return chains
}
