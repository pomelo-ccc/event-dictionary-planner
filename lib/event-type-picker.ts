import type { EventDictionaryItem } from "./types"

export interface EventTypePickerGroup {
  key: string
  label: string
  count: number
  items: EventDictionaryItem[]
}

export interface EventTypePickerState {
  starred: EventTypePickerGroup
  groups: EventTypePickerGroup[]
  hasResults: boolean
  query: string
}

interface BuildEventTypePickerStateInput {
  dictionary: EventDictionaryItem[]
  search: string
}

function normalizeQuery(value: string) {
  return value.trim().toLowerCase()
}

function matchesQuery(item: EventDictionaryItem, query: string) {
  if (!query) return true

  return [item.type_name, item.group, item.import_source, item.trigger_scene]
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .some((value) => value.toLowerCase().includes(query))
}

function sortItems(items: EventDictionaryItem[]) {
  return [...items].sort((left, right) => left.type_name.localeCompare(right.type_name))
}

export function buildEventTypePickerState({
  dictionary,
  search,
}: BuildEventTypePickerStateInput): EventTypePickerState {
  const query = normalizeQuery(search)
  const filtered = dictionary.filter((item) => matchesQuery(item, query))
  const starredItems = sortItems(filtered.filter((item) => item.starred))

  const groupedItems = new Map<string, EventDictionaryItem[]>()
  for (const item of filtered) {
    if (item.starred) continue
    const items = groupedItems.get(item.group) ?? []
    items.push(item)
    groupedItems.set(item.group, items)
  }

  const groups = [...groupedItems.entries()]
    .map(([key, items]) => ({
      key,
      label: key,
      count: items.length,
      items: sortItems(items),
    }))
    .sort((left, right) => {
      if (right.count !== left.count) return right.count - left.count
      return left.label.localeCompare(right.label)
    })

  return {
    query,
    starred: {
      key: "starred",
      label: "收藏",
      count: starredItems.length,
      items: starredItems,
    },
    groups,
    hasResults: starredItems.length > 0 || groups.length > 0,
  }
}
