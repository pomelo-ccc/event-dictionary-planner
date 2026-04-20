import type { EventDictionaryItem } from "./types"

function isEmptyValue(v: unknown): boolean {
  if (v === undefined || v === null) return true
  if (typeof v === "string" && v.trim() === "") return true
  if (Array.isArray(v) && v.length === 0) return true
  return false
}

function escapeYamlString(str: string): string {
  if (/[:#\-?&*!|>'"%@`{}[\]]|^\s|\s$/.test(str) || str === "") {
    return `"${str.replace(/"/g, '\\"')}"`
  }
  return str
}

export function exportDictionaryToYaml(items: EventDictionaryItem[]): string {
  const lines: string[] = ["# Event Dictionary", "events:"]
  for (const item of items) {
    lines.push(`  - type_name: ${escapeYamlString(item.type_name)}`)
    lines.push(`    group: ${item.group}`)
    lines.push(`    import_source: ${escapeYamlString(item.import_source)}`)
    if (!isEmptyValue(item.trigger_scene)) {
      lines.push(`    trigger_scene: ${escapeYamlString(item.trigger_scene!)}`)
    }
    if (!isEmptyValue(item.typical_fields)) {
      lines.push(`    typical_fields:`)
      for (const f of item.typical_fields) {
        lines.push(`      - ${escapeYamlString(f)}`)
      }
    }
    if (!isEmptyValue(item.legacy_helper_mapping)) {
      lines.push(`    legacy_helper_mapping:`)
      for (const m of item.legacy_helper_mapping) {
        lines.push(`      - from: ${escapeYamlString(m.from)}`)
        lines.push(`        to: ${escapeYamlString(m.to)}`)
      }
    }
    if (!isEmptyValue(item.detect_all)) {
      lines.push(`    detect:`)
      lines.push(`      all:`)
      for (const d of item.detect_all) {
        lines.push(`        - ${escapeYamlString(d)}`)
      }
    }
    if (!isEmptyValue(item.negative)) {
      lines.push(`    negative:`)
      for (const n of item.negative) {
        lines.push(`      - ${escapeYamlString(n)}`)
      }
    }
    if (!isEmptyValue(item.fallback)) {
      lines.push(`    fallback: ${escapeYamlString(item.fallback!)}`)
    }
  }
  return lines.join("\n")
}
