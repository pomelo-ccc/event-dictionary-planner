"use client"

import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X, ArrowRight } from "lucide-react"
import type { EventDictionaryItem, EventGroup, LegacyMapping } from "@/lib/types"
import { cn } from "@/lib/utils"
import { groupColorMap } from "@/lib/mock-data"


const empty: EventDictionaryItem = {
  id: "",
  type_name: "",
  group: "table",
  import_source: "ng-lc-dpp/table",
  trigger_scene: "",
  typical_fields: [],
  legacy_helper_mapping: [],
  detect_all: [],
  negative: [],
  fallback: "",
}

interface Props {
  open: boolean
  onOpenChange: (o: boolean) => void
  item: EventDictionaryItem | null
  onSave: (data: EventDictionaryItem) => void
  groups: string[]
}

export function EventEditorSheet({ open, onOpenChange, item, onSave, groups: GROUPS }: Props) {
  const [data, setData] = useState<EventDictionaryItem>(empty)

  useEffect(() => {
    if (open) setData(item ? { ...item } : { ...empty, id: "new" })
  }, [open, item])

  const update = <K extends keyof EventDictionaryItem>(k: K, v: EventDictionaryItem[K]) => {
    setData((d) => {
      const next = { ...d, [k]: v };
      if (k === 'group' && v !== d.group && next.import_source === `ng-lc-dpp/${d.group}`) {
        next.import_source = `ng-lc-dpp/${v}`;
      }
      return next;
    });
  }

  const valid = data.type_name.trim() && data.import_source.trim()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-xl" onInteractOutside={(e) => e.preventDefault()}>
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="text-base">{item ? "编辑事件类型" : "新增事件类型"}</SheetTitle>
          <SheetDescription className="text-xs">
            填写完整的元数据,字段会被导出到 YAML 给 AST 转换脚本使用。
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            <FormSection title="基础信息">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label className="mb-1.5 block text-xs">
                    类型名 <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    value={data.type_name}
                    onChange={(e) => update("type_name", e.target.value)}
                    placeholder="TableCellToolbarExecuteEvent"
                    className="h-9 font-mono text-sm"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block text-xs">
                    分组 <span className="text-rose-500">*</span>
                  </Label>
                  <div className="flex flex-wrap gap-1">
                    {GROUPS.map((g) => {
                      const c = groupColorMap[g] || groupColorMap["other"]
                      const active = data.group === g
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => update("group", g)}
                          className={cn(
                            "inline-flex items-center gap-1 rounded px-1.5 py-1 text-[11px] font-medium ring-1 ring-inset transition-colors",
                            active ? cn(c.bg, c.text, c.ring) : "bg-card text-muted-foreground ring-border hover:bg-accent",
                          )}
                        >
                          <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} />
                          {g}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <Label className="mb-1.5 block text-xs">
                    导入来源 <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    value={data.import_source}
                    onChange={(e) => update("import_source", e.target.value)}
                    placeholder="@pdm/table/types"
                    className="h-9 font-mono text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="mb-1.5 block text-xs">触发场景</Label>
                  <Textarea
                    value={data.trigger_scene}
                    onChange={(e) => update("trigger_scene", e.target.value)}
                    placeholder="说明该事件的触发场景..."
                    rows={2}
                    className="resize-none text-sm"
                  />
                </div>
              </div>
            </FormSection>

            <FormSection title="典型字段" hint="通过 Enter 或点击 + 添加">
              <ChipInput values={data.typical_fields} onChange={(v) => update("typical_fields", v)} placeholder="data" />
            </FormSection>

            <FormSection title="替换规则" hint="旧 API → 新写法">
              <MappingEditor
                values={data.legacy_helper_mapping}
                onChange={(v) => update("legacy_helper_mapping", v)}
              />
            </FormSection>

            <div className="grid grid-cols-2 gap-4">
              <FormSection title="判断依据 (detect.all)">
                <ChipInput
                  values={data.detect_all}
                  onChange={(v) => update("detect_all", v)}
                  placeholder="getRowData"
                  variant="emerald"
                />
              </FormSection>
              <FormSection title="排除条件 (negative)">
                <ChipInput
                  values={data.negative}
                  onChange={(v) => update("negative", v)}
                  placeholder="getFormApi"
                  variant="rose"
                />
              </FormSection>
            </div>

            <FormSection title="兜底规则 (fallback)">
              <Input
                value={data.fallback}
                onChange={(e) => update("fallback", e.target.value)}
                placeholder="RowEvent"
                className="h-9 font-mono text-sm"
              />
            </FormSection>
          </div>
        </div>

        <SheetFooter className="flex-row items-center justify-between border-t border-border bg-muted/30 px-6 py-3">
          <span className="text-[11px] text-muted-foreground">
            {valid ? "可保存" : "请填写必填字段"}
          </span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button size="sm" disabled={!valid} onClick={() => onSave(data)}>
              {item ? "保存修改" : "创建类型"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function FormSection({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</h4>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

function ChipInput({
  values,
  onChange,
  placeholder,
  variant = "default",
}: {
  values: string[]
  onChange: (v: string[]) => void
  placeholder?: string
  variant?: "default" | "emerald" | "rose"
}) {
  const [draft, setDraft] = useState("")
  const variantClass =
    variant === "emerald"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : variant === "rose"
      ? "bg-rose-50 text-rose-700 ring-rose-200"
      : "bg-muted text-foreground ring-border"

  function add() {
    const v = draft.trim()
    if (!v || values.includes(v)) return
    onChange([...values, v])
    setDraft("")
  }

  return (
    <div className="rounded-md border border-input bg-background p-2">
      <div className="flex flex-wrap items-center gap-1">
        {values.map((v) => (
          <span
            key={v}
            className={cn(
              "inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[11px] ring-1 ring-inset",
              variantClass,
            )}
          >
            {v}
            <button
              type="button"
              onClick={() => onChange(values.filter((x) => x !== v))}
              className="text-current/60 hover:text-current"
              aria-label={`移除 ${v}`}
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              add()
            }
            if (e.key === "Backspace" && !draft && values.length) {
              onChange(values.slice(0, -1))
            }
          }}
          placeholder={values.length ? "" : placeholder}
          className="min-w-[80px] flex-1 bg-transparent px-1 py-0.5 font-mono text-xs outline-none placeholder:text-muted-foreground"
        />
      </div>
    </div>
  )
}

function MappingEditor({ values, onChange }: { values: LegacyMapping[]; onChange: (v: LegacyMapping[]) => void }) {
  return (
    <div className="space-y-2">
      {values.map((m, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={m.from}
            onChange={(e) => onChange(values.map((x, j) => (j === i ? { ...x, from: e.target.value } : x)))}
            placeholder="getRowData(event)"
            className="h-8 flex-1 font-mono text-xs"
          />
          <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
          <Input
            value={m.to}
            onChange={(e) => onChange(values.map((x, j) => (j === i ? { ...x, to: e.target.value } : x)))}
            placeholder="event.data"
            className="h-8 flex-1 font-mono text-xs"
          />
          <button
            type="button"
            onClick={() => onChange(values.filter((_, j) => j !== i))}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-rose-50 hover:text-rose-600"
            aria-label="删除"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, { from: "", to: "" }])}
        className="flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-border py-1.5 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
      >
        <Plus className="h-3 w-3" />
        添加替换规则
      </button>
    </div>
  )
}
