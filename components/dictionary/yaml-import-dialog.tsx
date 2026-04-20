"use client"

import { useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload, FileText, AlertCircle, Check } from "lucide-react"
import type { EventDictionaryItem } from "@/lib/types"
import { parseYamlToDictionary } from "@/lib/yaml-import"
import { cn } from "@/lib/utils"

interface Props {
  open: boolean
  onOpenChange: (o: boolean) => void
  onImport: (items: EventDictionaryItem[]) => void
  existingGroups: string[]
}

export function YamlImportDialog({ open, onOpenChange, onImport, existingGroups }: Props) {
  const [mode, setMode] = useState<"file" | "paste">("file")
  const [pasteContent, setPasteContent] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      processContent(content)
    }
    reader.readAsText(file)
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function handlePaste() {
    if (!pasteContent.trim()) {
      setError("请粘贴 YAML 内容")
      return
    }
    processContent(pasteContent)
  }

  function processContent(content: string) {
    setError(null)
    setSuccess(null)

    try {
      const items = parseYamlToDictionary(content)
      
      if (items.length === 0) {
        setError("未解析到任何事件类型，请检查 YAML 格式")
        return
      }

      // Validate required fields
      const invalidItems = items.filter(item => !item.type_name || !item.import_source)
      if (invalidItems.length > 0) {
        setError(`有 ${invalidItems.length} 条记录缺少 type_name 或 import_source 字段`)
        return
      }

      // Check for new groups that don't exist
      const newGroups = items
        .map(item => item.group)
        .filter(group => group && !existingGroups.includes(group))
      
      if (newGroups.length > 0) {
        setSuccess(`解析成功 ${items.length} 条记录，将自动创建新分组: ${[...new Set(newGroups)].join(", ")}`)
      } else {
        setSuccess(`解析成功 ${items.length} 条记录`)
      }

      // Import after showing success message
      setTimeout(() => {
        onImport(items)
        handleClose()
      }, 1500)
    } catch (err) {
      setError(`解析失败: ${err instanceof Error ? err.message : "未知错误"}`)
    }
  }

  function handleClose() {
    setPasteContent("")
    setError(null)
    setSuccess(null)
    setMode("file")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b border-border px-6 py-4">
          <DialogTitle className="text-base">导入 YAML 字典</DialogTitle>
          <DialogDescription className="text-xs">
            从 YAML 文件或剪贴板导入事件类型配置
          </DialogDescription>
        </DialogHeader>

        <div className="flex border-b border-border">
          <button
            onClick={() => setMode("file")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
              mode === "file"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Upload className="h-4 w-4" />
            从文件导入
          </button>
          <button
            onClick={() => setMode("paste")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
              mode === "paste"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <FileText className="h-4 w-4" />
            粘贴内容
          </button>
        </div>

        <div className="p-6">
          {mode === "file" ? (
            <div className="flex flex-col items-center justify-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".yml,.yaml,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="h-20 w-full flex-col gap-2 border-dashed"
              >
                <Upload className="h-6 w-6" />
                <span>点击选择 YAML 文件</span>
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                支持 .yml, .yaml, .txt 格式
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                value={pasteContent}
                onChange={(e) => {
                  setPasteContent(e.target.value)
                  setError(null)
                  setSuccess(null)
                }}
                placeholder="在此粘贴 YAML 内容..."
                className="min-h-[200px] w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button onClick={handlePaste} className="w-full">
                解析导入
              </Button>
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 flex items-center gap-2 rounded-md bg-emerald-50 p-3 text-sm text-emerald-600">
              <Check className="h-4 w-4 shrink-0" />
              {success}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}