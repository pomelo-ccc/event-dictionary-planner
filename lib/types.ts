export type EventGroup = string

export type ProjectId = "PDM" | "UMC" | "PPM"

export interface LegacyMapping {
  from: string
  to: string
}

export interface EventDictionaryItem {
  id: string
  type_name: string
  group: EventGroup
  import_source: string
  trigger_scene?: string
  typical_fields: string[]
  legacy_helper_mapping: LegacyMapping[]
  detect_all: string[]
  negative: string[]
  fallback?: string
  /** 收藏状态，用于高使用率事件类型置顶 */
  starred?: boolean
}

export interface FunctionCard {
  id: string
  name: string
  event_type?: string
  lines: number
  note?: string
  /** 收藏状态，用于高使用率函数置顶 */
  starred?: boolean
  /** 使用次数统计 */
  usageCount?: number
  /** 函数代码内容 */
  code?: string
  /** 标记为需要移除 */
  toRemove?: boolean
  /** 标记为工具函数 */
  isUtility?: boolean
}

export interface SplitGroup {
  id: string
  name: string
  cards: FunctionCard[]
}

export interface EventFile {
  id: string
  project: ProjectId
  filename: string
  groups: SplitGroup[]
}
