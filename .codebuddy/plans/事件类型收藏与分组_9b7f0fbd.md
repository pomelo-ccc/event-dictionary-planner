---
name: 事件类型收藏与分组
overview: 为事件字典添加收藏功能（收藏事件类型而非函数），并按已有的 group 分组显示，高使用率/收藏的置顶显示。
todos:
  - id: add-starred-field
    content: 为 EventDictionaryItem 类型添加 starred 字段
    status: completed
  - id: update-function-card
    content: 修改 FunctionCard 下拉框按 group 分组 + 收藏置顶
    status: completed
    dependencies:
      - add-starred-field
---

## 用户需求

在**函数卡片（FunctionCard）**的事件类型下拉选择器中：

1. 收藏事件类型，收藏的置顶显示
2. 按 group 分组显示事件类型

## 涉及文件

- `lib/types.ts` - EventDictionaryItem 添加 starred 字段
- `components/planner/function-card.tsx` - 下拉框按 group 分组 + 收藏优先

## 技术方案

1. **lib/types.ts** - 为 EventDictionaryItem 添加 `starred?: boolean` 字段
2. **function-card.tsx** - 下拉框实现：

- 对 dictionary 排序：starred 优先
- 使用 SelectGroup 按 group 分组显示
- 每个分组标题显示分组名和数量

### TODO

- [ ] 为 EventDictionaryItem 添加 starred 字段
- [ ] 修改 FunctionCard 下拉框分组显示 + 收藏置顶