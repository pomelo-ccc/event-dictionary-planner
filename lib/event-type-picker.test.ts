import test from "node:test"
import assert from "node:assert/strict"

import type { EventDictionaryItem } from "./types"
// @ts-ignore -- Node's native test runner requires the explicit .ts extension here.
import { buildEventTypePickerState } from "./event-type-picker.ts"

const dictionary: EventDictionaryItem[] = [
  {
    id: "d1",
    type_name: "TableToolbarClickEvent",
    group: "table",
    import_source: "@demo/table",
    trigger_scene: "toolbar click",
    typical_fields: [],
    legacy_helper_mapping: [],
    detect_all: [],
    negative: [],
  },
  {
    id: "d2",
    type_name: "TableRowExpandEvent",
    group: "table",
    import_source: "@demo/table",
    trigger_scene: "row expand",
    typical_fields: [],
    legacy_helper_mapping: [],
    detect_all: [],
    negative: [],
  },
  {
    id: "d3",
    type_name: "ModalSubmitEvent",
    group: "modal",
    import_source: "@demo/modal",
    trigger_scene: "submit",
    typical_fields: [],
    legacy_helper_mapping: [],
    detect_all: [],
    negative: [],
    starred: true,
  },
  {
    id: "d4",
    type_name: "CardActionClickEvent",
    group: "card",
    import_source: "@demo/card",
    trigger_scene: "card action",
    typical_fields: [],
    legacy_helper_mapping: [],
    detect_all: [],
    negative: [],
  },
  {
    id: "d5",
    type_name: "FieldBlurEvent",
    group: "form",
    import_source: "@demo/form",
    trigger_scene: "field blur",
    typical_fields: [],
    legacy_helper_mapping: [],
    detect_all: [],
    negative: [],
  },
]

test("buildEventTypePickerState separates starred items and sorts groups by count", () => {
  const state = buildEventTypePickerState({
    dictionary,
    search: "",
  })

  assert.deepEqual(
    state.starred.items.map((item) => item.type_name),
    ["ModalSubmitEvent"],
  )
  assert.deepEqual(
    state.groups.map((group) => `${group.key}:${group.count}`),
    ["table:2", "card:1", "form:1"],
  )
})

test("buildEventTypePickerState filters by search across type name and group", () => {
  const byTypeName = buildEventTypePickerState({
    dictionary,
    search: "toolbar",
  })
  const byGroup = buildEventTypePickerState({
    dictionary,
    search: "form",
  })

  assert.deepEqual(
    byTypeName.groups.flatMap((group) => group.items.map((item) => item.type_name)),
    ["TableToolbarClickEvent"],
  )
  assert.deepEqual(
    byGroup.groups.flatMap((group) => group.items.map((item) => item.type_name)),
    ["FieldBlurEvent"],
  )
})

test("buildEventTypePickerState preserves starred results while searching", () => {
  const state = buildEventTypePickerState({
    dictionary,
    search: "modal",
  })

  assert.equal(state.starred.count, 1)
  assert.equal(state.groups.length, 0)
  assert.equal(state.hasResults, true)
})
