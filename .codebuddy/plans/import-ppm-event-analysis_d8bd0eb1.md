---
name: import-ppm-event-analysis
overview: 将 PPM 项目的 event-analysis-report.json 导入当前项目，把 JSON 中的 analyses 数据转换为 EventFile + FunctionCard 数据结构，填充到 PPM 项目的文件中（当前 mock-data.ts 中 PPM 文件都是空的 groups）
todos:
  - id: create-json-import
    content: 创建 lib/json-import.ts，实现 parseEventAnalysisReport 转换函数
    status: completed
  - id: update-mock-data
    content: 更新 mock-data.ts 中 PPM 文件的 groups 为预填充的函数数据
    status: completed
    dependencies:
      - create-json-import
---

## 产品概述

将 PPM 项目的事件文件分析报告 (`event-analysis-report.json`) 中的函数信息导入到当前项目的 Planner 视图中，使 PPM 文件不再是空的 groups，而是包含从 JSON 解析出的函数卡片数据。

## 核心功能

- 编写 JSON 报告解析转换函数，将 `analyses[].methods` 映射为 `FunctionCard` 结构
- 更新 `mock-data.ts` 中 10 个 PPM 文件的 groups 数据，每个文件的 methods 放入一个默认分组"全部函数"
- 字段映射：method.name → FunctionCard.name, method.lineCount → FunctionCard.lines, method.comment → FunctionCard.note, method.params/isAsync → FunctionCard.event_type
- 确保已通过 IndexedDB 持久化数据的用户也能通过重置获取新数据

## 技术栈

- 框架: Next.js + React + TypeScript (沿用现有)
- UI: Tailwind CSS + shadcn/ui (沿用现有)
- 数据持久化: IndexedDB (沿用现有 idb.ts)

## 实现方案

采用**静态数据注入**方案：直接修改 `mock-data.ts` 中 PPM 文件的 groups 数据为预填充值。同时新增一个 JSON 导入转换工具函数，供将来动态导入使用。

### 核心策略

1. 在 `lib/json-import.ts` 中新增 `parseEventAnalysisReport()` 函数，将 JSON 报告的 analyses 结构转换为 `EventFile[]` 数据
2. 更新 `lib/mock-data.ts` 中 PPM 文件条目，将空 groups 替换为包含"全部函数"分组的预填充数据
3. 映射规则：

- `method.name` → `FunctionCard.name`
- `method.lineCount` → `FunctionCard.lines`
- `method.comment` → `FunctionCard.note`（空注释则不设置）
- `method.isAsync ? "async " + method.params : method.params` → `FunctionCard.event_type`
- 每个 analysis 的 methods 归入一个 `SplitGroup`（name: "全部函数"）

### 性能与可靠性

- 静态数据注入无运行时性能开销
- 已持久化到 IndexedDB 的用户需清除浏览器数据或使用 reset-idb.js 才能看到新数据

## 目录结构

```
project-root/
├── lib/
│   ├── json-import.ts     # [NEW] JSON 报告解析转换函数，将 event-analysis-report.json 的 analyses 转为 EventFile[]
│   └── mock-data.ts       # [MODIFY] PPM 文件的 groups 从空数组更新为包含"全部函数"分组的预填充数据
```

### 文件详细说明

**lib/json-import.ts** [NEW]

- 导出 `parseEventAnalysisReport(report: any): EventFile[]` 函数
- 接收 JSON 报告对象，遍历 `analyses` 数组
- 每个 analysis 映射为一个 `EventFile`（project: "PPM"）
- 每个 analysis 的 methods 映射为 `FunctionCard[]`，放入名为"全部函数"的 `SplitGroup`
- `event_type` 字段拼接 isAsync + params，如 `"async (params, ganttCpm)"` 或 `"(fieldCpm, formCpm)"`
- `note` 字段仅当 comment 非空时设置
- 生成稳定的 id（如 `ppm_f{index}`, `ppm_g{fileIndex}`, `ppm_c{methodIndex}`）

**lib/mock-data.ts** [MODIFY]

- PPM 文件条目（ppm_f0 ~ ppm_f9）的 groups 从 `[]` 替换为从 JSON 报告转换而来的预填充数据
- 每个文件一个"全部函数"分组，内含该文件所有 methods 转换后的 FunctionCard
- 不影响 PDM 和 UMC 的文件数据