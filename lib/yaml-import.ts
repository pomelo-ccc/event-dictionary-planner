import type { EventDictionaryItem, LegacyMapping } from "./types"

export function parseYamlToDictionary(yaml: string): EventDictionaryItem[] {
  const lines = yaml.split("\n")
  const items: EventDictionaryItem[] = []

  let currentItem: Partial<EventDictionaryItem> | null = null
  let currentMapping: LegacyMapping | null = null
  let inTypicalFields = false
  let inLegacyHelperMapping = false
  let inDetect = false
  let inNegative = false
  let inDetectAll = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith("#")) continue

    // Detect list item start: "- type_name: SomeValue" (must have value after colon)
    const eventStartMatch = line.match(/^(\s*)-\s+type_name:\s*(.*)$/)
    if (eventStartMatch) {
      // Save previous item
      if (currentItem && currentItem.type_name) {
        items.push(currentItem as EventDictionaryItem)
      }
      currentItem = {
        id: `d${Date.now()}${items.length}`,
        type_name: eventStartMatch[2].trim().replace(/^"|"$/g, "").replace(/\\"/g, '"'),
        group: "other",
        import_source: "",
        typical_fields: [],
        legacy_helper_mapping: [],
        detect_all: [],
        negative: [],
      }
      currentMapping = null
      inTypicalFields = false
      inLegacyHelperMapping = false
      inDetect = false
      inNegative = false
      inDetectAll = false
      continue
    }

    // Skip if no current item
    if (!currentItem) continue

    // Match key-value pairs at item level (indent 4 spaces: "    key: value")
    const kvMatch = line.match(/^    (\w+):\s*(.*)$/)
    if (kvMatch) {
      const [, key, value] = kvMatch
      const val = value.trim()

      // Reset section flags for new key
      inTypicalFields = false
      inLegacyHelperMapping = false
      inDetect = false
      inNegative = false
      inDetectAll = false

      switch (key) {
        case "group":
          currentItem.group = val.replace(/^"|"$/g, "")
          break
        case "import_source":
          currentItem.import_source = val.replace(/^"|"$/g, "").replace(/\\"/g, '"')
          break
        case "trigger_scene":
          currentItem.trigger_scene = val.replace(/^"|"$/g, "").replace(/\\"/g, '"')
          break
        case "fallback":
          currentItem.fallback = val.replace(/^"|"$/g, "").replace(/\\"/g, '"')
          break
        case "typical_fields":
          inTypicalFields = true
          break
        case "legacy_helper_mapping":
          inLegacyHelperMapping = true
          break
        case "detect":
          inDetect = true
          break
        case "negative":
          inNegative = true
          break
      }
      continue
    }

    // Match "all:" under detect
    const allMatch = line.match(/^      all:\s*$/)
    if (allMatch && inDetect) {
      inDetectAll = true
      continue
    }

    // Match list items (indent 6 spaces: "      - value")
    const listMatch = line.match(/^      - (.*)$/)
    if (listMatch) {
      const val = listMatch[1].trim().replace(/^"|"$/g, "").replace(/\\"/g, '"')

      if (inTypicalFields) {
        currentItem.typical_fields!.push(val)
      } else if (inDetectAll) {
        currentItem.detect_all!.push(val)
      } else if (inNegative) {
        currentItem.negative!.push(val)
      }
      continue
    }

    // Match legacy_helper_mapping items (indent 6 spaces with from/to)
    const mappingStartMatch = line.match(/^      - from:\s*(.*)$/)
    if (mappingStartMatch && inLegacyHelperMapping) {
      const val = mappingStartMatch[1].trim().replace(/^"|"$/g, "").replace(/\\"/g, '"')
      currentMapping = { from: val, to: "" }
      currentItem.legacy_helper_mapping!.push(currentMapping)
      continue
    }

    // Match "to:" inside mapping
    const mappingToMatch = line.match(/^        to:\s*(.*)$/)
    if (mappingToMatch && currentMapping && inLegacyHelperMapping) {
      const val = mappingToMatch[1].trim().replace(/^"|"$/g, "").replace(/\\"/g, '"')
      currentMapping.to = val
      currentMapping = null
      continue
    }
  }

  // Add last item
  if (currentItem && currentItem.type_name) {
    items.push(currentItem as EventDictionaryItem)
  }

  return items
}
