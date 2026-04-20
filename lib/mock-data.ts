import type { EventDictionaryItem, EventFile } from "./types"

export const groupColorMap: Record<string, { bg: string; text: string; ring: string; dot: string }> = {
  table: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200", dot: "bg-emerald-500" },
  form: { bg: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-200", dot: "bg-sky-500" },
  card: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200", dot: "bg-amber-500" },
  menu: { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-200", dot: "bg-rose-500" },
  page: { bg: "bg-indigo-50", text: "text-indigo-700", ring: "ring-indigo-200", dot: "bg-indigo-500" },
  modal: { bg: "bg-teal-50", text: "text-teal-700", ring: "ring-teal-200", dot: "bg-teal-500" },
  action: { bg: "bg-orange-50", text: "text-orange-700", ring: "ring-orange-200", dot: "bg-orange-500" },
  wizard: { bg: "bg-cyan-50", text: "text-cyan-700", ring: "ring-cyan-200", dot: "bg-cyan-500" },
  other: { bg: "bg-slate-100", text: "text-slate-700", ring: "ring-slate-200", dot: "bg-slate-500" },
}

export const initialDictionary: EventDictionaryItem[] = [
  {
    id: "d1",
    type_name: "TableCellToolbarExecuteEvent",
    group: "table",
    import_source: "@pdm/table/types",
    trigger_scene: "用户点击表格单元格工具栏中的执行按钮时触发",
    typical_fields: ["data", "node", "tableApi", "rowIndex"],
    legacy_helper_mapping: [
      { from: "getRowData(event)", to: "event.data" },
      { from: "getTableApi(event)", to: "event.tableApi" },
    ],
    detect_all: ["getRowData", "getContentCom"],
    negative: ["getFormApi"],
    fallback: "RowEvent",
  },
  {
    id: "d2",
    type_name: "FormFieldChangeEvent",
    group: "form",
    import_source: "@pdm/form/types",
    trigger_scene: "表单字段值变化时触发",
    typical_fields: ["value", "field", "formApi"],
    legacy_helper_mapping: [
      { from: "getFormValue(event)", to: "event.value" },
      { from: "getFormApi(event)", to: "event.formApi" },
    ],
    detect_all: ["getFormApi"],
    negative: [],
    fallback: "FormEvent",
  },
  {
    id: "d3",
    type_name: "CardActionClickEvent",
    group: "card",
    import_source: "@pdm/card/types",
    trigger_scene: "卡片操作按钮点击事件",
    typical_fields: ["action", "cardId", "data"],
    legacy_helper_mapping: [{ from: "getCardData(event)", to: "event.data" }],
    detect_all: ["getCardData"],
    negative: [],
  },
  {
    id: "d4",
    type_name: "MenuItemSelectEvent",
    group: "menu",
    import_source: "@pdm/menu/types",
    trigger_scene: "菜单项被选中时触发",
    typical_fields: ["item", "key", "path"],
    legacy_helper_mapping: [{ from: "getMenuKey(event)", to: "event.key" }],
    detect_all: ["getMenuKey"],
    negative: [],
  },
  {
    id: "d5",
    type_name: "ModalConfirmEvent",
    group: "modal",
    import_source: "@pdm/modal/types",
    trigger_scene: "弹窗确认按钮点击",
    typical_fields: ["modalApi", "data"],
    legacy_helper_mapping: [{ from: "getModalApi(event)", to: "event.modalApi" }],
    detect_all: ["getModalApi"],
    negative: [],
  },
  {
    id: "d6",
    type_name: "PageMountEvent",
    group: "page",
    import_source: "@pdm/page/types",
    trigger_scene: "页面挂载完成时触发",
    typical_fields: ["route", "params"],
    legacy_helper_mapping: [],
    detect_all: ["getRoute"],
    negative: [],
  },
]

export const initialFiles: EventFile[] = [
  {
    "id": "ppm_f0",
    "project": "PPM",
    "filename": "form-event.ts",
    "groups": [
      {
        "id": "ppm_g0",
        "name": "全部函数",
        "cards": [
          {
            "id": "ppm_c0_0",
            "name": "sysFolderClickAction",
            "lines": 27,
            "event_type": "(fieldCpm, formCpm)"
          },
          {
            "id": "ppm_c0_1",
            "name": "sysObjectClick",
            "lines": 19,
            "event_type": "(item)"
          },
          {
            "id": "ppm_c0_2",
            "name": "cadValueOptionAfterAction",
            "lines": 12,
            "event_type": "(value, fieldCpm, formCpm)",
            "note": "cad复选框option动态变化"
          },
          {
            "id": "ppm_c0_3",
            "name": "cadValueAfterAction",
            "lines": 26,
            "event_type": "(value, fieldCpm, formCpm)",
            "note": "交付物-新建-cad配置-模板表单值变化监听"
          },
          {
            "id": "ppm_c0_4",
            "name": "formTemplateChangeAction",
            "lines": 14,
            "event_type": "(value, fieldCpm, formCpm)"
          }
        ]
      }
    ]
  },
  {
    "id": "ppm_f1",
    "project": "PPM",
    "filename": "gantt-event.ts",
    "groups": [
      {
        "id": "ppm_g1",
        "name": "全部函数",
        "cards": [
          {
            "id": "ppm_c1_0",
            "name": "sysGanttAssociatedAction",
            "lines": 37,
            "event_type": "(params, ganttCpm)"
          },
          {
            "id": "ppm_c1_1",
            "name": "sysGanttUpdateTimeAction",
            "lines": 22,
            "event_type": "(params, ganttCpm)"
          },
          {
            "id": "ppm_c1_2",
            "name": "_sysGanttAssociatedAction",
            "lines": 35,
            "event_type": "(params, ganttCpm)"
          },
          {
            "id": "ppm_c1_3",
            "name": "_sysGanttUpdateTimeAction",
            "lines": 24,
            "event_type": "(params, ganttCpm)"
          }
        ]
      }
    ]
  },
  {
    "id": "ppm_f2",
    "project": "PPM",
    "filename": "global-search.event.ts",
    "groups": [
      {
        "id": "ppm_g2",
        "name": "全部函数",
        "cards": [
          {
            "id": "ppm_c2_0",
            "name": "sysGlobalSearchObjectClickAction",
            "lines": 8,
            "event_type": "(event: HasModelEventInterface)"
          },
          {
            "id": "ppm_c2_1",
            "name": "sysGlobalSearchIDClickAction",
            "lines": 3,
            "event_type": "(event: HasModelEventInterface)"
          },
          {
            "id": "ppm_c2_2",
            "name": "sysGlobalSearchNameClickAction",
            "lines": 3,
            "event_type": "(event: HasModelEventInterface)"
          }
        ]
      }
    ]
  },
  {
    "id": "ppm_f3",
    "project": "PPM",
    "filename": "project-statistic-query.event.ts",
    "groups": [
      {
        "id": "ppm_g3",
        "name": "全部函数",
        "cards": [
          {
            "id": "ppm_c3_0",
            "name": "sysProjectStatisticsQueryAction",
            "lines": 20,
            "event_type": "(event: EventInterface)",
            "note": "项目统计查询入口事件"
          },
          {
            "id": "ppm_c3_1",
            "name": "sysDeliveryStatisticExportAction",
            "lines": 34,
            "event_type": "(event: EventInterface)",
            "note": "交付物导出"
          },
          {
            "id": "ppm_c3_2",
            "name": "sysProjectStatisticsExportAction",
            "lines": 34,
            "event_type": "(event: EventInterface)",
            "note": "项目统计导出"
          },
          {
            "id": "ppm_c3_3",
            "name": "sysTaskStatisticsExportAction",
            "lines": 34,
            "event_type": "(event: EventInterface)",
            "note": "任务统计导出"
          },
          {
            "id": "ppm_c3_4",
            "name": "sysProjectWithTaskExportAction",
            "lines": 34,
            "event_type": "(event: EventInterface)",
            "note": "项目与任务统计导出(任务统计-项目总数)"
          },
          {
            "id": "ppm_c3_5",
            "name": "sysSummaryTableExportAction",
            "lines": 122,
            "event_type": "(event: EventInterface)",
            "note": "汇总表格导出"
          }
        ]
      }
    ]
  },
  {
    "id": "ppm_f4",
    "project": "PPM",
    "filename": "project-task-template.event.ts",
    "groups": [
      {
        "id": "ppm_g4",
        "name": "全部函数",
        "cards": [
          {
            "id": "ppm_c4_0",
            "name": "sysProjectTemplateTaskDragAction",
            "lines": 138,
            "event_type": "(event: RowDragEvent)",
            "note": "项目模板拖拽"
          },
          {
            "id": "ppm_c4_1",
            "name": "getWbsLevelComparison",
            "lines": 16,
            "event_type": "(dragNode: RowNode, targetNode: RowNode)",
            "note": "同层拖拽，获取目标节点的WBSNUMBER"
          },
          {
            "id": "ppm_c4_2",
            "name": "getTargetWbs",
            "lines": 14,
            "event_type": "(dragNode: RowNode, targetNode: RowNode, allNodes: RowNode[], dropNode: RowNode, direction = 0)"
          },
          {
            "id": "ppm_c4_3",
            "name": "getMaxIndex",
            "lines": 11,
            "event_type": "(list: string[], dropNode: RowNode)"
          },
          {
            "id": "ppm_c4_4",
            "name": "generateTargetWbs",
            "lines": 25,
            "event_type": "(targetNode: RowNode, index: number = 0)",
            "note": "默认获取目标节点WBSNUMBER"
          },
          {
            "id": "ppm_c4_5",
            "name": "sysWbsTemplateNewChildNodeAction",
            "lines": 23,
            "event_type": "(event: EventInterface)",
            "note": "新建子阶-新版"
          },
          {
            "id": "ppm_c4_6",
            "name": "sysWbsTemplateNewChildNodeAction_",
            "lines": 142,
            "event_type": "(event: EventInterface)",
            "note": "新建子阶-旧版（废）"
          },
          {
            "id": "ppm_c4_7",
            "name": "sysWbsTemplateNewBrotherNodeAction",
            "lines": 23,
            "event_type": "(event: EventInterface)",
            "note": "相邻位置新建-新版"
          },
          {
            "id": "ppm_c4_8",
            "name": "sysWbsTemplateNewBrotherNodeAction_",
            "lines": 158,
            "event_type": "(event: EventInterface)",
            "note": "相邻位置新建-旧版（废）"
          },
          {
            "id": "ppm_c4_9",
            "name": "sysTaskTemplateBatchEditAciton",
            "lines": 71,
            "event_type": "(event: EventInterface)",
            "note": "编辑 （批量）"
          },
          {
            "id": "ppm_c4_10",
            "name": "sysTaskTemplateBatchSetMilestonesAciton",
            "lines": 38,
            "event_type": "(event: EventInterface)",
            "note": "设置里程碑 （批量）"
          },
          {
            "id": "ppm_c4_11",
            "name": "sysTaskTemplateBatchSetExeRoleAciton",
            "lines": 91,
            "event_type": "(event: EventInterface)",
            "note": "设置执行角色 （批量）"
          },
          {
            "id": "ppm_c4_12",
            "name": "sysTaskTemplateBatchAddRelAciton",
            "lines": 94,
            "event_type": "(event: EventInterface)",
            "note": "添加关系 （批量）"
          },
          {
            "id": "ppm_c4_13",
            "name": "sysTaskTemplateBatchRemoveRelAciton",
            "lines": 39,
            "event_type": "(event: EventInterface)",
            "note": "移除关系 （批量）"
          },
          {
            "id": "ppm_c4_14",
            "name": "sysTaskTemplateBatchDeleteAction",
            "lines": 3,
            "event_type": "(event: EventInterface)",
            "note": "删除 (批量)"
          },
          {
            "id": "ppm_c4_15",
            "name": "operateTaskBatchHandle",
            "lines": 42,
            "event_type": "(event: EventInterface, type: OperateTaskType)"
          },
          {
            "id": "ppm_c4_16",
            "name": "sysTaskTemplateSearchAction",
            "lines": 32,
            "event_type": "(event: EventInterface)",
            "note": "搜索"
          },
          {
            "id": "ppm_c4_17",
            "name": "sysTemplateTaskImportAction",
            "lines": 44,
            "event_type": "(event: EventInterface)",
            "note": "导入"
          },
          {
            "id": "ppm_c4_18",
            "name": "sysTemplateTaskExportAction",
            "lines": 28,
            "event_type": "(event: EventInterface)",
            "note": "导出"
          },
          {
            "id": "ppm_c4_19",
            "name": "sysTaskTemplateBatchCopyAction",
            "lines": 17,
            "event_type": "(event: EventInterface)",
            "note": "批量复制"
          },
          {
            "id": "ppm_c4_20",
            "name": "sysTaskTemplatePasteAciton",
            "lines": 139,
            "event_type": "(event: EventInterface)",
            "note": "粘贴"
          },
          {
            "id": "ppm_c4_21",
            "name": "sysTaskTemplateCopyAction",
            "lines": 12,
            "event_type": "(event: EventInterface)",
            "note": "复制"
          },
          {
            "id": "ppm_c4_22",
            "name": "sysTaskTemplatePlanRearAction",
            "lines": 70,
            "event_type": "(event: EventInterface)",
            "note": "计划重排"
          }
        ]
      }
    ]
  },
  {
    "id": "ppm_f5",
    "project": "PPM",
    "filename": "project-task.event.ts",
    "groups": [
      {
        "id": "ppm_g5",
        "name": "全部函数",
        "cards": [
          {
            "id": "ppm_c5_0",
            "name": "initializeComponents",
            "lines": 26,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c5_1",
            "name": "initializeComponentsBatch",
            "lines": 12,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c5_2",
            "name": "processFormData",
            "lines": 9,
            "event_type": "(formData: any)"
          },
          {
            "id": "ppm_c5_3",
            "name": "buildTaskSaveParams",
            "lines": 44,
            "event_type": "(formData: any, context: TaskContext, operation: TaskOperation)"
          },
          {
            "id": "ppm_c5_4",
            "name": "buildRefreshParams",
            "lines": 32,
            "event_type": "(operation: TaskOperation, context: TaskContext)"
          },
          {
            "id": "ppm_c5_5",
            "name": "shouldRefresh",
            "lines": 13,
            "event_type": "(operation: TaskOperation, context: TaskContext)"
          },
          {
            "id": "ppm_c5_6",
            "name": "updateTaskView",
            "lines": 63,
            "event_type": "(params: TaskViewUpdateParams)"
          },
          {
            "id": "ppm_c5_7",
            "name": "sysWbsNewChildNodeAction",
            "lines": 25,
            "event_type": "(event: EventInterface)",
            "note": "新建子阶 wbs"
          },
          {
            "id": "ppm_c5_8",
            "name": "sysWbsNewBrotherNodeAction",
            "lines": 21,
            "event_type": "(event: EventInterface)",
            "note": "相邻位置新建"
          },
          {
            "id": "ppm_c5_9",
            "name": "buildOperateParams",
            "lines": 8,
            "event_type": "(type: OperateTaskType, context: TaskContext)",
            "note": "操作列上的事件"
          },
          {
            "id": "ppm_c5_10",
            "name": "buildDropParamsAndContext",
            "lines": 69,
            "event_type": "(event: RowDragEvent)"
          },
          {
            "id": "ppm_c5_11",
            "name": "getWbsLevelComparison",
            "lines": 16,
            "event_type": "(dragNode: RowNode, targetNode: RowNode)",
            "note": "同层拖拽，获取目标节点的WBSNUMBER"
          },
          {
            "id": "ppm_c5_12",
            "name": "getTargetWbs",
            "lines": 14,
            "event_type": "(dragNode: RowNode, targetNode: RowNode, allNodes: RowNode[], dropNode: RowNode, direction = 0)"
          },
          {
            "id": "ppm_c5_13",
            "name": "getMaxIndex",
            "lines": 11,
            "event_type": "(list: string[], dropNode: RowNode)"
          },
          {
            "id": "ppm_c5_14",
            "name": "generateTargetWbs",
            "lines": 25,
            "event_type": "(targetNode: RowNode, index: number = 0)",
            "note": "默认获取目标节点WBSNUMBER"
          },
          {
            "id": "ppm_c5_15",
            "name": "sysTaskDeleteAciton",
            "lines": 58,
            "event_type": "(event: EventInterface)",
            "note": "删除任务"
          },
          {
            "id": "ppm_c5_16",
            "name": "sysTaskCompleteAciton",
            "lines": 3,
            "event_type": "(event: EventInterface)",
            "note": "完成任务"
          },
          {
            "id": "ppm_c5_17",
            "name": "sysTaskStartAciton",
            "lines": 3,
            "event_type": "(event: EventInterface)",
            "note": "开始任务"
          },
          {
            "id": "ppm_c5_18",
            "name": "sysTaskPusAciton",
            "lines": 3,
            "event_type": "(event: EventInterface)",
            "note": "暂停任务"
          },
          {
            "id": "ppm_c5_19",
            "name": "sysTaskStopAciton",
            "lines": 3,
            "event_type": "(event: EventInterface)",
            "note": "停用任务"
          },
          {
            "id": "ppm_c5_20",
            "name": "operateTaskHandle",
            "lines": 89,
            "event_type": "(event: EventInterface, type: OperateTaskType)"
          },
          {
            "id": "ppm_c5_21",
            "name": "sysWorkbenchTaskStartAction",
            "lines": 3,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c5_22",
            "name": "sysWorkbenchTaskPusAction",
            "lines": 3,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c5_23",
            "name": "sysWorkbenchTaskTerminateAction",
            "lines": 3,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c5_24",
            "name": "sysWorkbenchTaskCompleteAction",
            "lines": 3,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c5_25",
            "name": "workbenchOperateTaskHandle",
            "lines": 29,
            "event_type": "(event: EventInterface, type: OperateTaskType)"
          },
          {
            "id": "ppm_c5_26",
            "name": "sysWorkbenchUpdateTaskAction",
            "lines": 60,
            "event_type": "(event: EventInterface)",
            "note": "更新进度(工作台打开的任务对象)"
          },
          {
            "id": "ppm_c5_27",
            "name": "sysWorkbenchTaskRotorItemAction",
            "lines": 52,
            "event_type": "(event: EventInterface)",
            "note": "转为子项目(工作台打开的任务对象)"
          },
          {
            "id": "ppm_c5_28",
            "name": "sysTaskCopyAction",
            "lines": 12,
            "event_type": "(event: EventInterface)",
            "note": "复制"
          },
          {
            "id": "ppm_c5_29",
            "name": "sysTaskBatchCopyAction",
            "lines": 17,
            "event_type": "(event: EventInterface)",
            "note": "批量复制"
          },
          {
            "id": "ppm_c5_30",
            "name": "sysTaskSetMilestonesAciton",
            "lines": 47,
            "event_type": "(event: EventInterface)",
            "note": "设置里程碑"
          },
          {
            "id": "ppm_c5_31",
            "name": "updateNodesWithFreshData",
            "lines": 9,
            "event_type": "(freshData: DppSafeAny[], nodeMap: Map<string, RowNode>)"
          },
          {
            "id": "ppm_c5_32",
            "name": "sysTaskCancelMilestonesAciton",
            "lines": 22,
            "event_type": "(event: EventInterface)",
            "note": "取消里程碑"
          },
          {
            "id": "ppm_c5_33",
            "name": "sysTaskBatchCompleteAction",
            "lines": 3,
            "event_type": "(event: EventInterface)",
            "note": "完成任务 （批量）"
          },
          {
            "id": "ppm_c5_34",
            "name": "sysTaskBatchStartAction",
            "lines": 3,
            "event_type": "(event: EventInterface)",
            "note": "开始任务（批量）"
          },
          {
            "id": "ppm_c5_35",
            "name": "sysTaskBatchPusAction",
            "lines": 3,
            "event_type": "(event: EventInterface)",
            "note": "暂停任务（批量）"
          },
          {
            "id": "ppm_c5_36",
            "name": "sysTaskBatchTerminateAction",
            "lines": 3,
            "event_type": "(event: EventInterface)",
            "note": "停用任务（批量）"
          },
          {
            "id": "ppm_c5_37",
            "name": "sysTaskBatchDeleteAction",
            "lines": 110,
            "event_type": "(event: EventInterface)",
            "note": "批量删除"
          },
          {
            "id": "ppm_c5_38",
            "name": "operateTaskBatchHandle",
            "lines": 101,
            "event_type": "(event: EventInterface, type: OperateTaskType)"
          },
          {
            "id": "ppm_c5_39",
            "name": "sysAssignExecutorAction",
            "lines": 70,
            "event_type": "(event: EventInterface)",
            "note": "自动分配执行人"
          },
          {
            "id": "ppm_c5_40",
            "name": "sysTaskImportAction",
            "lines": 82,
            "event_type": "(event: EventInterface)",
            "note": "导入"
          },
          {
            "id": "ppm_c5_41",
            "name": "sysTaskExportAction",
            "lines": 84,
            "event_type": "(event: EventInterface)",
            "note": "导出"
          },
          {
            "id": "ppm_c5_42",
            "name": "sysTaskPlanRearAction",
            "lines": 82,
            "event_type": "(event: EventInterface)",
            "note": "// 计划重排"
          },
          {
            "id": "ppm_c5_43",
            "name": "sysTaskPlanScalingAction",
            "lines": 141,
            "event_type": "(event: EventInterface)",
            "note": "计划缩放"
          },
          {
            "id": "ppm_c5_44",
            "name": "sysTaskCopyNewAciton",
            "lines": 70,
            "event_type": "(event: EventInterface)",
            "note": "复制新建"
          },
          {
            "id": "ppm_c5_45",
            "name": "sysTaskPasteAciton",
            "lines": 135,
            "event_type": "(event: EventInterface)",
            "note": "粘贴"
          },
          {
            "id": "ppm_c5_46",
            "name": "sysUpdateTaskAciton",
            "lines": 60,
            "event_type": "(event: EventInterface)",
            "note": "更新进度"
          },
          {
            "id": "ppm_c5_47",
            "name": "sysTaskBatchUpdateAciton",
            "lines": 72,
            "event_type": "(event: EventInterface)",
            "note": "更新进度 （批量）"
          },
          {
            "id": "ppm_c5_48",
            "name": "sysTaskBatchEditAciton",
            "lines": 71,
            "event_type": "(event: EventInterface)",
            "note": "编辑 （批量）"
          },
          {
            "id": "ppm_c5_49",
            "name": "sysTaskBatchAddRelAciton",
            "lines": 94,
            "event_type": "(event: EventInterface)",
            "note": "添加关系 （批量）"
          },
          {
            "id": "ppm_c5_50",
            "name": "sysTaskBatchRemoveRelAciton",
            "lines": 39,
            "event_type": "(event: EventInterface)",
            "note": "移除关系 （批量）"
          },
          {
            "id": "ppm_c5_51",
            "name": "sysProjectTaskSaveAction",
            "lines": 46,
            "event_type": "(event: CellSaveEvent)",
            "note": "单元格保存"
          },
          {
            "id": "ppm_c5_52",
            "name": "sysProjectTaskDragAction",
            "lines": 54,
            "event_type": "(event: RowDragEvent)",
            "note": "拖拽"
          },
          {
            "id": "ppm_c5_53",
            "name": "sysTaskRotorItemAciton",
            "lines": 52,
            "event_type": "(event: EventInterface)",
            "note": "转为子项目"
          },
          {
            "id": "ppm_c5_54",
            "name": "sysTranProSaveAndCloseAction",
            "lines": 26,
            "event_type": "(event: EventInterface)",
            "note": "保存并关闭"
          },
          {
            "id": "ppm_c5_55",
            "name": "sysTranProSaveAndContinueAction",
            "lines": 33,
            "event_type": "(event: EventInterface)",
            "note": "保存并继续"
          },
          {
            "id": "ppm_c5_56",
            "name": "sysWorkbenchTranProSaveAndCloseAction",
            "lines": 28,
            "event_type": "(event: EventInterface)",
            "note": "保存并关闭"
          },
          {
            "id": "ppm_c5_57",
            "name": "sysWorkbenchTranProSaveAndContinueAction",
            "lines": 35,
            "event_type": "(event: EventInterface)",
            "note": "保存并继续"
          },
          {
            "id": "ppm_c5_58",
            "name": "sysTaskBatchSetExeRoleAciton",
            "lines": 91,
            "event_type": "(event: EventInterface)",
            "note": "设置执行角色 （批量）"
          },
          {
            "id": "ppm_c5_59",
            "name": "sysTaskBatchSetExeUserAciton",
            "lines": 91,
            "event_type": "(event: EventInterface)",
            "note": "设置执行人 （批量）"
          },
          {
            "id": "ppm_c5_60",
            "name": "sysTaskSearchAction",
            "lines": 29,
            "event_type": "(event: EventInterface)",
            "note": "搜索"
          },
          {
            "id": "ppm_c5_61",
            "name": "sysTaskDetailSaveAction",
            "lines": 48,
            "event_type": "(event: EventInterface)",
            "note": "保存"
          },
          {
            "id": "ppm_c5_62",
            "name": "sysProjectStructuretAction",
            "lines": 12,
            "event_type": "(event: EventInterface)",
            "note": "交付物清单项目结构对象列"
          },
          {
            "id": "ppm_c5_63",
            "name": "sysProjectTaskObjectAction",
            "lines": 6,
            "event_type": "(event: EventInterface)",
            "note": "任务-交付物-任务结构-对象列"
          }
        ]
      }
    ]
  },
  {
    "id": "ppm_f6",
    "project": "PPM",
    "filename": "project.event.ts",
    "groups": [
      {
        "id": "ppm_g6",
        "name": "全部函数",
        "cards": [
          {
            "id": "ppm_c6_0",
            "name": "sysProjectManagementNewAction",
            "lines": 127,
            "event_type": "(event: EventInterface)",
            "note": "新建项目"
          },
          {
            "id": "ppm_c6_1",
            "name": "sysSaveAsProjectAction",
            "lines": 194,
            "event_type": "(event: EventInterface)",
            "note": "另存为项目"
          },
          {
            "id": "ppm_c6_2",
            "name": "sysInstanceSaveAsProjectTemplateAction",
            "lines": 13,
            "event_type": "(event: EventInterface)",
            "note": "另存为模板(对象上)"
          },
          {
            "id": "ppm_c6_3",
            "name": "sysSaveAsProjectTemplateAction",
            "lines": 10,
            "event_type": "(event: EventInterface)",
            "note": "另存为模板"
          },
          {
            "id": "ppm_c6_4",
            "name": "sysProjectManagementStartAciton",
            "lines": 11,
            "event_type": "(event: EventInterface)",
            "note": "开始项目"
          },
          {
            "id": "ppm_c6_5",
            "name": "sysProjectManagementPusAciton",
            "lines": 11,
            "event_type": "(event: EventInterface)",
            "note": "停用项目"
          },
          {
            "id": "ppm_c6_6",
            "name": "sysProjectManagementStopAciton",
            "lines": 11,
            "event_type": "(event: EventInterface)",
            "note": "暂停项目"
          },
          {
            "id": "ppm_c6_7",
            "name": "sysProjectManagementCompleteAciton",
            "lines": 11,
            "event_type": "(event: EventInterface)",
            "note": "完成项目"
          },
          {
            "id": "ppm_c6_8",
            "name": "sysProjectManagementDeleteAciton",
            "lines": 11,
            "event_type": "(event: EventInterface)",
            "note": "删除项目"
          },
          {
            "id": "ppm_c6_9",
            "name": "sysTaskImportFromTempAction",
            "lines": 18,
            "event_type": "(event: EventInterface)",
            "note": "从模板导入"
          },
          {
            "id": "ppm_c6_10",
            "name": "refreshInstance",
            "lines": 6,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c6_11",
            "name": "sysProductManageStartAction",
            "lines": 55,
            "event_type": "(event: EventInterface)",
            "note": "启动项目"
          },
          {
            "id": "ppm_c6_12",
            "name": "sysProductManagePauseAction",
            "lines": 17,
            "event_type": "(event: EventInterface)",
            "note": "项目暂停"
          },
          {
            "id": "ppm_c6_13",
            "name": "sysProductManageStopAction",
            "lines": 17,
            "event_type": "(event: EventInterface)",
            "note": "项目终止"
          },
          {
            "id": "ppm_c6_14",
            "name": "sysProductManageCompleteAction",
            "lines": 17,
            "event_type": "(event: EventInterface)",
            "note": "项目完成"
          },
          {
            "id": "ppm_c6_15",
            "name": "sysProducChangeAction",
            "lines": 63,
            "event_type": "(event: EventInterface)",
            "note": "项目变更"
          },
          {
            "id": "ppm_c6_16",
            "name": "sysProducFinishChangeAction",
            "lines": 35,
            "event_type": "(event: EventInterface)",
            "note": "完成变更"
          },
          {
            "id": "ppm_c6_17",
            "name": "sysStartApprovalProcessAction",
            "lines": 272,
            "event_type": "(event: EventInterface)",
            "note": "项目-启动审批流程"
          },
          {
            "id": "ppm_c6_18",
            "name": "sysProducUpdateProgressDataAction",
            "lines": 55,
            "event_type": "(event: EventInterface)",
            "note": "更新进度数据"
          },
          {
            "id": "ppm_c6_19",
            "name": "sysRemindMembersUpdateProgressAction",
            "lines": 21,
            "event_type": "(event: EventInterface)",
            "note": "提醒成员更新进度"
          },
          {
            "id": "ppm_c6_20",
            "name": "sysProductManageSaveAction",
            "lines": 24,
            "event_type": "(event: EventInterface)",
            "note": "项目保存"
          },
          {
            "id": "ppm_c6_21",
            "name": "sysProjectTemplateManageAction",
            "lines": 15,
            "event_type": "(event: EventInterface)",
            "note": "项目模板管理"
          },
          {
            "id": "ppm_c6_22",
            "name": "sysProjectManageAction",
            "lines": 14,
            "event_type": "()",
            "note": "项目管理"
          },
          {
            "id": "ppm_c6_23",
            "name": "sysProjectTemplateManagementNewAction",
            "lines": 81,
            "event_type": "(event: EventInterface)",
            "note": "新建项目模板"
          },
          {
            "id": "ppm_c6_24",
            "name": "sysProjectManagementSearchAciton",
            "lines": 13,
            "event_type": "(event: EventInterface)",
            "note": "项目管理搜索"
          },
          {
            "id": "ppm_c6_25",
            "name": "sysProjectTemplateManagementSearchAction",
            "lines": 13,
            "event_type": "(event: EventInterface)",
            "note": "项目模板管理搜索"
          },
          {
            "id": "ppm_c6_26",
            "name": "sysProjectFilterAction",
            "lines": 7,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c6_27",
            "name": "sysProjectTemplateManagementStartAction",
            "lines": 11,
            "event_type": "(event: EventInterface)",
            "note": "启用项目模板"
          },
          {
            "id": "ppm_c6_28",
            "name": "sysProjectTemplateManagementStopAction",
            "lines": 11,
            "event_type": "(event: EventInterface)",
            "note": "停用项目模板"
          },
          {
            "id": "ppm_c6_29",
            "name": "sysProjectTemplateManagementDeleteAction",
            "lines": 11,
            "event_type": "(event: EventInterface)",
            "note": "删除项目模板"
          },
          {
            "id": "ppm_c6_30",
            "name": "sysProjectTemplateManagementBatchStartAction",
            "lines": 26,
            "event_type": "(event: EventInterface)",
            "note": "批量启用项目模板"
          },
          {
            "id": "ppm_c6_31",
            "name": "sysProjectTemplateManagementBatchStopAction",
            "lines": 25,
            "event_type": "(event: EventInterface)",
            "note": "批量停用项目模板"
          },
          {
            "id": "ppm_c6_32",
            "name": "sysProjectTemplateManagementBatchDeleteAction",
            "lines": 24,
            "event_type": "(event: EventInterface)",
            "note": "批量删除项目模板"
          },
          {
            "id": "ppm_c6_33",
            "name": "openInstanceAction1",
            "lines": 14,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c6_34",
            "name": "sysProjectManagementTableNameClickAction",
            "lines": 19,
            "event_type": "(event: EventInterface)",
            "note": "预览项目模板"
          },
          {
            "id": "ppm_c6_35",
            "name": "sysMilestoneTypeEditAction",
            "lines": 30,
            "event_type": "(event: EventInterface)",
            "note": "里程碑类型编辑"
          },
          {
            "id": "ppm_c6_36",
            "name": "sysProjectManagementWorkingStatusAciton",
            "lines": 1,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c6_37",
            "name": "sysProjectManagementStartStatusAciton",
            "lines": 1,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c6_38",
            "name": "sysProjectTemplateRoleBatchDeleteAction",
            "lines": 45,
            "event_type": "(event: EventInterface)",
            "note": "项目模板-批量删除角色"
          },
          {
            "id": "ppm_c6_39",
            "name": "editTeamResourceTableAction",
            "lines": 53,
            "event_type": "(event: CellSaveEvent)",
            "note": "项目模板-更新角色"
          },
          {
            "id": "ppm_c6_40",
            "name": "sysTeamResourceAddAction",
            "lines": 26,
            "event_type": "(event: CellSaveEvent)",
            "note": "项目模板-添加角色"
          },
          {
            "id": "ppm_c6_41",
            "name": "sysProjectTemplateTeamDeleteAction",
            "lines": 25,
            "event_type": "(event: EventInterface)",
            "note": "项目模板-删除角色"
          },
          {
            "id": "ppm_c6_42",
            "name": "sysProjectNewRoleAction",
            "lines": 101,
            "event_type": "(event: EventInterface)",
            "note": "项目-新增角色"
          },
          {
            "id": "ppm_c6_43",
            "name": "batchError",
            "lines": 64,
            "event_type": "(originData: any)"
          },
          {
            "id": "ppm_c6_44",
            "name": "sysProjectRoleBatchDeleteAction",
            "lines": 47,
            "event_type": "(event: EventInterface)",
            "note": "项目-批量删除角色"
          },
          {
            "id": "ppm_c6_45",
            "name": "sysProjectTeamResourceRemoveAction",
            "lines": 33,
            "event_type": "(event: EventInterface)",
            "note": "项目-移除成员"
          },
          {
            "id": "ppm_c6_46",
            "name": "sysRemoveMembersBatchAction",
            "lines": 67,
            "event_type": "(event: EventInterface)",
            "note": "项目-批量移除成员"
          },
          {
            "id": "ppm_c6_47",
            "name": "editProjectTeamSourceTableAction",
            "lines": 31,
            "event_type": "(event: EventInterface)",
            "note": "项目-团队资源表格编辑"
          },
          {
            "id": "ppm_c6_48",
            "name": "sysTeamResourceAddMembersAction",
            "lines": 99,
            "event_type": "(event: EventInterface)",
            "note": "项目-团队资源添加成员"
          },
          {
            "id": "ppm_c6_49",
            "name": "sysProjectTeamResourceDeleteRoleAction",
            "lines": 21,
            "event_type": "(event: EventInterface)",
            "note": "项目-团队资源删除角色"
          },
          {
            "id": "ppm_c6_50",
            "name": "sysProjectCopyTeamAction",
            "lines": 9,
            "event_type": "(event: EventInterface)",
            "note": "项目-复制团队"
          },
          {
            "id": "ppm_c6_51",
            "name": "sysProjectPasteTeamAction",
            "lines": 38,
            "event_type": "(event: EventInterface)",
            "note": "项目-粘贴团队"
          },
          {
            "id": "ppm_c6_52",
            "name": "sysTeamResourceWorkloadAction",
            "lines": 41,
            "event_type": "(event: EventInterface)",
            "note": "项目-团队资源工作量"
          },
          {
            "id": "ppm_c6_53",
            "name": "sysTeamResourceWorkloadBatchAction",
            "lines": 46,
            "event_type": "(event: EventInterface)",
            "note": "项目-团队资源工作量(批量)"
          },
          {
            "id": "ppm_c6_54",
            "name": "sysProductWarningAddAction",
            "lines": 105,
            "event_type": "(event: EventInterface)",
            "note": "新建预警"
          },
          {
            "id": "ppm_c6_55",
            "name": "sysProductWarningtoggleAction",
            "lines": 13,
            "event_type": "(event: EventInterface)",
            "note": "预警启用/停用（单个）"
          },
          {
            "id": "ppm_c6_56",
            "name": "sysProductWarningBatchStartAction",
            "lines": 23,
            "event_type": "(event: EventInterface)",
            "note": "预警启用(批量)"
          },
          {
            "id": "ppm_c6_57",
            "name": "sysProductWarningBatchStopAction",
            "lines": 21,
            "event_type": "(event: EventInterface)",
            "note": "预警停用(批量)"
          },
          {
            "id": "ppm_c6_58",
            "name": "sysProductWarningDeleteAction",
            "lines": 13,
            "event_type": "(event: EventInterface)",
            "note": "预警删除（单个）"
          },
          {
            "id": "ppm_c6_59",
            "name": "sysProductWarningBatchDeleteAction",
            "lines": 24,
            "event_type": "(event: EventInterface)",
            "note": "预警删除（批量）"
          },
          {
            "id": "ppm_c6_60",
            "name": "sysProductWarningEditAction",
            "lines": 111,
            "event_type": "(event: EventInterface)",
            "note": "预警编辑"
          },
          {
            "id": "ppm_c6_61",
            "name": "sysWarningAssignedTaskAddAction",
            "lines": 91,
            "event_type": "(event: EventInterface)",
            "note": "指定任务新增"
          },
          {
            "id": "ppm_c6_62",
            "name": "sysWarningAssignedTaskDeleteAction",
            "lines": 6,
            "event_type": "(event: EventInterface)",
            "note": "指定任务删除"
          },
          {
            "id": "ppm_c6_63",
            "name": "sysProjectStructurelatestRevisionAction",
            "lines": 17,
            "event_type": "(event: EventInterface)",
            "note": "项目结构-最新交付物版本"
          },
          {
            "id": "ppm_c6_64",
            "name": "sysDeliverylatestRevisionAction",
            "lines": 13,
            "event_type": "(event: EventInterface)",
            "note": "交付物-最新交付物版本"
          },
          {
            "id": "ppm_c6_65",
            "name": "sysProjectStructureBatchDownloadAction",
            "lines": 54,
            "event_type": "(event: EventInterface)",
            "note": "项目结构-批量下载"
          },
          {
            "id": "ppm_c6_66",
            "name": "sysDeliveryItemBatchDownloadAction",
            "lines": 33,
            "event_type": "(event: EventInterface)",
            "note": "交付项-批量下载"
          },
          {
            "id": "ppm_c6_67",
            "name": "sysDeliveryBatchDownloadAction",
            "lines": 39,
            "event_type": "(event: EventInterface)",
            "note": "交付料-批量下载"
          },
          {
            "id": "ppm_c6_68",
            "name": "downloadBlob",
            "lines": 8,
            "event_type": "(data: Blob, fileName: string)"
          },
          {
            "id": "ppm_c6_69",
            "name": "sysProjectTaskResourceAddAction",
            "lines": 156,
            "event_type": "(event: EventInterface)",
            "note": "任务资源-添加任务资源"
          },
          {
            "id": "ppm_c6_70",
            "name": "sysTaskResourceAdjustProportionAction",
            "lines": 81,
            "event_type": "(event: EventInterface)",
            "note": "任务资源-调整任务资源占比"
          },
          {
            "id": "ppm_c6_71",
            "name": "editExecutorAction",
            "lines": 97,
            "event_type": "(event: SwitchChangeEvent)",
            "note": "任务资源-编辑任务资源执行人状态"
          },
          {
            "id": "ppm_c6_72",
            "name": "sysTaskResourceRemoveaction",
            "lines": 107,
            "event_type": "(event: EventInterface)",
            "note": "任务资源-移除"
          },
          {
            "id": "ppm_c6_73",
            "name": "sysProjectTaskResourceBatchRemoveAction",
            "lines": 120,
            "event_type": "(event: EventInterface)",
            "note": "任务资源-批量移除"
          },
          {
            "id": "ppm_c6_74",
            "name": "sysTaskResourceWorkloadAction",
            "lines": 66,
            "event_type": "(event: EventInterface)",
            "note": "任务资源-资源工作量"
          },
          {
            "id": "ppm_c6_75",
            "name": "sysProjectTRSourceWorkloadBatchAction",
            "lines": 65,
            "event_type": "(event: EventInterface)",
            "note": "任务资源-资源工作量(批量)"
          },
          {
            "id": "ppm_c6_76",
            "name": "sysPreTaskFilterAction",
            "lines": 23,
            "event_type": "(event: EventInterface)",
            "note": "任务关系-前后置选择"
          },
          {
            "id": "ppm_c6_77",
            "name": "sysProjectPreTaskAddAction",
            "lines": 132,
            "event_type": "(event: EventInterface)",
            "note": "任务关系-新增任务关系"
          },
          {
            "id": "ppm_c6_78",
            "name": "sysPreTaskDeleteAction",
            "lines": 40,
            "event_type": "(event: EventInterface)",
            "note": "任务关系-删除"
          },
          {
            "id": "ppm_c6_79",
            "name": "sysPreTaskEditAction",
            "lines": 96,
            "event_type": "(event: EventInterface)",
            "note": "任务关系-编辑"
          },
          {
            "id": "ppm_c6_80",
            "name": "sysProjectPreTaskBatchDeleteAction",
            "lines": 63,
            "event_type": "(event: EventInterface)",
            "note": "任务关系-批量删除"
          },
          {
            "id": "ppm_c6_81",
            "name": "sysProjectTemplateStopAction",
            "lines": 17,
            "event_type": "(event: EventInterface)",
            "note": "项目模板-instance页面停用"
          },
          {
            "id": "ppm_c6_82",
            "name": "sysProjectTemplateStartAction",
            "lines": 12,
            "event_type": "(event: EventInterface)",
            "note": "项目模板-instance页面启用"
          },
          {
            "id": "ppm_c6_83",
            "name": "sysProjectTemplateDelAction",
            "lines": 10,
            "event_type": "(event: EventInterface)",
            "note": "项目模板-instance页面删除"
          },
          {
            "id": "ppm_c6_84",
            "name": "sysProductTemplateSaveAsAction",
            "lines": 12,
            "event_type": "(event: EventInterface)",
            "note": "项目模板-instance页面另存为"
          }
        ]
      }
    ]
  },
  {
    "id": "ppm_f7",
    "project": "PPM",
    "filename": "public.event.ts",
    "groups": [
      {
        "id": "ppm_g7",
        "name": "全部函数",
        "cards": [
          {
            "id": "ppm_c7_0",
            "name": "_comboRepeatCadParams",
            "lines": 37,
            "event_type": "(cardFormData: IFoundaton, cardFormOriginData: IFoundaton)",
            "note": "组合cad重复参数"
          },
          {
            "id": "ppm_c7_1",
            "name": "sysOpenBlankHasPMChangeAction",
            "lines": 29,
            "event_type": "(event: HasModelEventInterface, config?: BlankInterface)",
            "note": "处理包含有项目变更单的跳转函数"
          },
          {
            "id": "ppm_c7_2",
            "name": "sysOpenDrawerHasPMChangeAction",
            "lines": 28,
            "event_type": "(event: HasModelEventInterface, config?: BlankInterface)",
            "note": "处理包含有项目变更单的打开抽屉函数"
          },
          {
            "id": "ppm_c7_3",
            "name": "sysOpenGeneralDrawerAction",
            "lines": 3,
            "event_type": "(event: HasModelEventInterface, config?: BlankInterface)",
            "note": "通用打开实例抽屉方法（包含打开其他项目）"
          },
          {
            "id": "ppm_c7_4",
            "name": "sysOpenGeneralBlankAction",
            "lines": 3,
            "event_type": "(event: HasModelEventInterface, config?: BlankInterface)",
            "note": "通用打开实例页签方法（包含打开其他项目）"
          },
          {
            "id": "ppm_c7_5",
            "name": "sysOpenGeneralDrawerFn",
            "lines": 17,
            "event_type": "(handleConfig: CellClickGeneralCall)",
            "note": "打开系统通用抽屉函数 该函数用于处理点击事件后打开抽屉的操作，根据不同的配置展示不同的内容"
          },
          {
            "id": "ppm_c7_6",
            "name": "sysOpenGeneralBlankFn",
            "lines": 18,
            "event_type": "(handleConfig: CellClickGeneralCall)",
            "note": "打开新窗口的通用函数 该函数用于在点击表格单元格后，根据配置信息打开一个新的窗口或标签页"
          },
          {
            "id": "ppm_c7_7",
            "name": "cellClickGeneralAction",
            "lines": 104,
            "event_type": "(event: HasModelEventInterface, config?: BlankInterface)",
            "note": "单元格点击通用处理"
          },
          {
            "id": "ppm_c7_8",
            "name": "positionLinkAction",
            "lines": 17,
            "event_type": "(event: HasModelEventInterface, data?: Record<string, DppSafeAny>)",
            "note": "公用内置位置跳转"
          },
          {
            "id": "ppm_c7_9",
            "name": "openRepeatModel",
            "lines": 47,
            "event_type": "(dataList: Array<Record<string, any>>, data: Record<string, any>)"
          },
          {
            "id": "ppm_c7_10",
            "name": "sysNewItemCADTDCheckedAction",
            "lines": 16,
            "event_type": "(event: EventInterface)",
            "note": "CAD图档勾选事件"
          },
          {
            "id": "ppm_c7_11",
            "name": "sysNewItemCADTDAddAction",
            "lines": 43,
            "event_type": "(event: EventInterface)",
            "note": "添加特定页签事件"
          },
          {
            "id": "ppm_c7_12",
            "name": "sysNewItemCADTDDeleteAciton",
            "lines": 7,
            "event_type": "(event: EventInterface)",
            "note": "移除特定页签事件"
          },
          {
            "id": "ppm_c7_13",
            "name": "sysNewItemPreviousPageAction",
            "lines": 16,
            "event_type": "(event: EventInterface)",
            "note": "新建物料上一步"
          },
          {
            "id": "ppm_c7_14",
            "name": "sysNewItemNextPageAction",
            "lines": 37,
            "event_type": "(event: EventInterface)",
            "note": "新建物料下一步"
          },
          {
            "id": "ppm_c7_15",
            "name": "cadConfigHandle",
            "lines": 27,
            "event_type": "(config: CadConfigHandleParams)"
          },
          {
            "id": "ppm_c7_16",
            "name": "sysSelectLocationFilterAction",
            "lines": 8,
            "event_type": "(event: EventInterface)",
            "note": "全局搜索/添加位置 -> 表格过滤"
          },
          {
            "id": "ppm_c7_17",
            "name": "sysCopyObjectAction",
            "lines": 34,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c7_18",
            "name": "sysStartDonwloadAction",
            "lines": 25,
            "event_type": "(event: EventInterface)",
            "note": "下载附件"
          }
        ]
      }
    ]
  },
  {
    "id": "ppm_f8",
    "project": "PPM",
    "filename": "task-object.event.ts",
    "groups": [
      {
        "id": "ppm_g8",
        "name": "全部函数",
        "cards": [
          {
            "id": "ppm_c8_0",
            "name": "sysNewTaskAddDeliverablesAction",
            "lines": 116,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c8_1",
            "name": "updateDeliverablesTempAction",
            "lines": 49,
            "event_type": "(event: SwitchChangeEvent)",
            "note": "表格编辑交付项:必须、发布"
          },
          {
            "id": "ppm_c8_2",
            "name": "sysBOMAddDeliverablesAction",
            "lines": 106,
            "event_type": "(event: EventInterface)",
            "note": "* @use 任务对象实例界面-交付物tab-操作栏添加交付物"
          },
          {
            "id": "ppm_c8_3",
            "name": "sysBOMDeliverablesNewAction",
            "lines": 99,
            "event_type": "(event: EventInterface)",
            "note": "* @use 任务对象实例界面-交付物tab-新建交付物"
          },
          {
            "id": "ppm_c8_4",
            "name": "sysDeliverablesCompleteAction",
            "lines": 53,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c8_5",
            "name": "sysTaskDeliverablesBatchDeleteAction",
            "lines": 101,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c8_6",
            "name": "sysTaskBatchRemoveAction",
            "lines": 37,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c8_7",
            "name": "findRootNode",
            "lines": 7,
            "event_type": "(node: RowNode)"
          },
          {
            "id": "ppm_c8_8",
            "name": "buildDeliveryItemParams",
            "lines": 9,
            "event_type": "(deliveryItemNodes: RowNode[], baseParams: any)"
          },
          {
            "id": "ppm_c8_9",
            "name": "buildDeliveryParams",
            "lines": 11,
            "event_type": "(deliveryNodes: RowNode[], baseParams: any)"
          },
          {
            "id": "ppm_c8_10",
            "name": "sysProcessTaskDeliverablesDeleteAction",
            "lines": 66,
            "event_type": "(event: EventInterface)",
            "note": "任务对象实例界面-交付物-删除"
          },
          {
            "id": "ppm_c8_11",
            "name": "sysProjectWbsNameClickAction",
            "lines": 59,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c8_12",
            "name": "filePreviewAction",
            "lines": 36,
            "event_type": "(event: EventInterface)",
            "note": "预览"
          },
          {
            "id": "ppm_c8_13",
            "name": "openInstanceAction",
            "lines": 8,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c8_14",
            "name": "sysDeliverablesSearchAction",
            "lines": 16,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c8_15",
            "name": "sysDeliverablesEditAction",
            "lines": 116,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c8_16",
            "name": "sysTaskApprovalAction",
            "lines": 85,
            "event_type": "(event: EventInterface)"
          }
        ]
      }
    ]
  },
  {
    "id": "ppm_f9",
    "project": "PPM",
    "filename": "tbm-project.event.ts",
    "groups": [
      {
        "id": "ppm_g9",
        "name": "全部函数",
        "cards": [
          {
            "id": "ppm_c9_0",
            "name": "sysCloseTBDeliverablesAction",
            "lines": 6,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c9_1",
            "name": "sysTBNewTaskAddDeliverablesAction",
            "lines": 76,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c9_2",
            "name": "sysTBupdateDeliverablesTempAction",
            "lines": 39,
            "event_type": "(event: SwitchChangeEvent)",
            "note": "表格编辑交付项:必须、发布"
          },
          {
            "id": "ppm_c9_3",
            "name": "sysTbBOMAddDeliverablesAction",
            "lines": 72,
            "event_type": "(event: EventInterface)",
            "note": "* @use 任务对象实例界面-交付物tab-操作栏添加交付物"
          },
          {
            "id": "ppm_c9_4",
            "name": "sysTbBOMDeliverablesNewAction",
            "lines": 83,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c9_5",
            "name": "sysTBTaskDeliverablesDeleteAction",
            "lines": 24,
            "event_type": "(event: EventInterface)",
            "note": "交付物-删除"
          },
          {
            "id": "ppm_c9_6",
            "name": "sysTBTaskDeliverablesBatchDeleteAction",
            "lines": 78,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c9_7",
            "name": "sysTBProjectStructuretAction",
            "lines": 9,
            "event_type": "(event: EventInterface)"
          },
          {
            "id": "ppm_c9_8",
            "name": "openTbModal",
            "lines": 29,
            "event_type": "(event: EventInterface, route: string)"
          },
          {
            "id": "ppm_c9_9",
            "name": "HandleOcclusionIssues",
            "lines": 8,
            "event_type": "()"
          },
          {
            "id": "ppm_c9_10",
            "name": "sysTBProjectStructureBatchDownloadAction",
            "lines": 42,
            "event_type": "(event: EventInterface)",
            "note": "项目结构-批量下载"
          },
          {
            "id": "ppm_c9_11",
            "name": "sysTBDeliveryBatchDownloadAction",
            "lines": 44,
            "event_type": "(event: EventInterface)",
            "note": "交付料-批量下载"
          },
          {
            "id": "ppm_c9_12",
            "name": "downloadBlob",
            "lines": 8,
            "event_type": "(data: Blob, fileName: string)"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f0",
    "project": "PDM",
    "filename": "bom-compare.event.ts",
    "groups": [
      {
        "id": "pdm_g0",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c0_0",
            "name": "sysGlobalSearchBatchBomCompareAction",
            "lines": 90,
            "event_type": "event: EventInterface",
            "note": "全局搜索BOM比较"
          },
          {
            "id": "pdm_c0_1",
            "name": "getNextValue",
            "lines": 21,
            "event_type": "map: any, key: string, direction = 'next'"
          },
          {
            "id": "pdm_c0_2",
            "name": "getDiffKeys",
            "lines": 9,
            "event_type": "table: DppTableComponent"
          },
          {
            "id": "pdm_c0_3",
            "name": "isRowDifferent",
            "lines": 5,
            "event_type": "origin: any, sort: string | undefined, table: DppTableComponent"
          },
          {
            "id": "pdm_c0_4",
            "name": "sysNextDifferAciton",
            "lines": 35,
            "event_type": "event: EventInterface",
            "note": "下一个差异"
          },
          {
            "id": "pdm_c0_5",
            "name": "sysPreDifferAciton",
            "lines": 24,
            "event_type": "event: EventInterface",
            "note": "上一个差异"
          },
          {
            "id": "pdm_c0_6",
            "name": "sysBomCompareFilterPresentAction",
            "lines": 5,
            "event_type": "event: EventInterface",
            "note": "仅显示差异项和显示全部（三个方法）"
          },
          {
            "id": "pdm_c0_7",
            "name": "sysBomCompareFilterPassesAction",
            "lines": 11,
            "event_type": "event: ExtendFilterEvent"
          },
          {
            "id": "pdm_c0_8",
            "name": "sysOnlyDifferAciton",
            "lines": 21,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c0_9",
            "name": "sysExportDifferAciton",
            "lines": 35,
            "event_type": "event: EventInterface",
            "note": "导出差异"
          },
          {
            "id": "pdm_c0_10",
            "name": "sysRevisionBatchBomCompareAction",
            "lines": 57,
            "event_type": "event: EventInterface",
            "note": "版本/bom比较"
          },
          {
            "id": "pdm_c0_11",
            "name": "handleBlankParams",
            "lines": 13,
            "event_type": "selectedData: RowNode[]",
            "note": "处理打开新页签的params"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f1",
    "project": "PDM",
    "filename": "bom-derivation-event.ts",
    "groups": [
      {
        "id": "pdm_g1",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c1_0",
            "name": "sysBomForkDerAction",
            "lines": 91,
            "event_type": "event: EventInterface",
            "note": "bom页签 操作列 BOM派生按钮"
          },
          {
            "id": "pdm_c1_1",
            "name": "sysBomForkCheckboxAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "bom派生表格 点击复选框后的动作"
          },
          {
            "id": "pdm_c1_2",
            "name": "sysBomForkCellAction",
            "lines": 33,
            "event_type": "event: TableCellEvent",
            "note": "单元格保存"
          },
          {
            "id": "pdm_c1_3",
            "name": "sysBomForkOperaForkAction_old",
            "lines": 27,
            "event_type": "event: EventInterface",
            "note": "bom派生表格 操作列 派生按钮"
          },
          {
            "id": "pdm_c1_4",
            "name": "sysBomForkOperaForkAction",
            "lines": 47,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c1_5",
            "name": "bomForkTabFormAction",
            "lines": 50,
            "event_type": "event: EventInterface",
            "note": "tabForm 保存按钮"
          },
          {
            "id": "pdm_c1_6",
            "name": "sysForkTableIDAction",
            "lines": 22,
            "event_type": "event: EventInterface",
            "note": "bom派生表格 编号点击事件"
          },
          {
            "id": "pdm_c1_7",
            "name": "sysBomForkOperaDelAction",
            "lines": 40,
            "event_type": "event: EventInterface",
            "note": "bom派生表格 操作列 移除按钮"
          },
          {
            "id": "pdm_c1_8",
            "name": "sysBomForkOperaCancelDelAction",
            "lines": 54,
            "event_type": "event: EventInterface",
            "note": "bom派生表格 操作列 重置按钮"
          },
          {
            "id": "pdm_c1_9",
            "name": "sysBomForkBatchSetFieldAction",
            "lines": 153,
            "event_type": "event: EventInterface",
            "note": "bom派生表格 浮动toolbar 设置字段值"
          },
          {
            "id": "pdm_c1_10",
            "name": "sysBomForkBatchDelAction",
            "lines": 48,
            "event_type": "event: EventInterface",
            "note": "bom派生表格 浮动toolbar 移除"
          },
          {
            "id": "pdm_c1_11",
            "name": "sysBomForkBatchForkAction",
            "lines": 43,
            "event_type": "event: EventInterface",
            "note": "bom派生表格 浮动toolbar 派生"
          },
          {
            "id": "pdm_c1_12",
            "name": "sysBomForkBatchSaveAction",
            "lines": 50,
            "event_type": "event: EventInterface",
            "note": "bom派生表格 浮动toolbar 保存"
          },
          {
            "id": "pdm_c1_13",
            "name": "sysBomForkTopForkAction",
            "lines": 54,
            "event_type": "event: EventInterface",
            "note": "顶层右上角 派生按钮"
          },
          {
            "id": "pdm_c1_14",
            "name": "sysBomForkSwapNodeAction",
            "lines": 103,
            "event_type": "event: EventInterface",
            "note": "bom派生表格 替换"
          },
          {
            "id": "pdm_c1_15",
            "name": "sysBomForkAddChildNodeAction",
            "lines": 106,
            "event_type": "event: EventInterface",
            "note": "bom派生表格 新增"
          },
          {
            "id": "pdm_c1_16",
            "name": "sysBomForkTopForkHisAction",
            "lines": 35,
            "event_type": "event: EventInterface",
            "note": "派生历史记录"
          },
          {
            "id": "pdm_c1_17",
            "name": "sysBomForkHisDelAction",
            "lines": 21,
            "event_type": "event: EventInterface",
            "note": "派生历史记录 删除派生信息"
          },
          {
            "id": "pdm_c1_18",
            "name": "sysBomForkBomComparisonAction",
            "lines": 38,
            "event_type": "event: EventInterface",
            "note": "派生历史记录 BOM比较"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f2",
    "project": "PDM",
    "filename": "cad-web.event.ts",
    "groups": [
      {
        "id": "pdm_g2",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c2_0",
            "name": "sysCADCheckOut",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "检出"
          },
          {
            "id": "pdm_c2_1",
            "name": "sysCADOpenAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "打开"
          },
          {
            "id": "pdm_c2_2",
            "name": "sysCADDownloadAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "下载"
          },
          {
            "id": "pdm_c2_3",
            "name": "sysCADInsertAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "插入"
          },
          {
            "id": "pdm_c2_4",
            "name": "sysDesginCardDragOver",
            "lines": 3,
            "event_type": "event: CardEventInterface",
            "note": "拖拽"
          },
          {
            "id": "pdm_c2_5",
            "name": "sysCADAssociatedObjectAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "关联图纸"
          },
          {
            "id": "pdm_c2_6",
            "name": "sysCADCancelCheckOutAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "取消检出"
          },
          {
            "id": "pdm_c2_7",
            "name": "handleParams",
            "lines": 4,
            "event_type": "event: EventInterface, type: string"
          },
          {
            "id": "pdm_c2_8",
            "name": "sysCADBatchCheckOut",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "批量检出"
          },
          {
            "id": "pdm_c2_9",
            "name": "sysCADBatchOpenAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "批量打开"
          },
          {
            "id": "pdm_c2_10",
            "name": "sysCADBatchInsertAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "批量插入"
          },
          {
            "id": "pdm_c2_11",
            "name": "sysCADBatchCancelCheckOutAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "批量取消检出"
          },
          {
            "id": "pdm_c2_12",
            "name": "handleBatchParams",
            "lines": 4,
            "event_type": "event: EventInterface, type: string"
          },
          {
            "id": "pdm_c2_13",
            "name": "sysProductFilterPicAction",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "处理SLDASM/SLDPRT/SLDDRW过滤"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f3",
    "project": "PDM",
    "filename": "demand.event.ts",
    "groups": [
      {
        "id": "pdm_g3",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c3_0",
            "name": "sysNewDemandAction",
            "lines": 1,
            "event_type": "event: EventInterface",
            "note": "新建需求包"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f4",
    "project": "PDM",
    "filename": "ecm.event.ts",
    "groups": [
      {
        "id": "pdm_g4",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c4_0",
            "name": "sysECMNewDetailAction",
            "lines": 28,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c4_1",
            "name": "sysECMSavePerformerAction",
            "lines": 72,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c4_2",
            "name": "sysECMDeleteDetailAction",
            "lines": 28,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c4_3",
            "name": "sysDeleteRootMasterAction",
            "lines": 54,
            "event_type": "event: EventInterface",
            "note": "变更请求表格 删除变更请求"
          },
          {
            "id": "pdm_c4_4",
            "name": "sysECMStartEcoAction",
            "lines": 15,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c4_5",
            "name": "sysECMCompleteEcoAction",
            "lines": 15,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c4_6",
            "name": "sysECMCancelEcoAction",
            "lines": 15,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c4_7",
            "name": "sysECMCancelSubEcoAction",
            "lines": 15,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c4_8",
            "name": "sysECMLinkECRAction",
            "lines": 81,
            "event_type": "event: EventInterface",
            "note": "ECN-> 右侧变更请求表更 添加按钮"
          },
          {
            "id": "pdm_c4_9",
            "name": "sysBuildECOAction",
            "lines": 84,
            "event_type": "event: EventInterface",
            "note": "悬浮toolbar 生成ECO"
          },
          {
            "id": "pdm_c4_10",
            "name": "sysSingleBuildECOAction",
            "lines": 54,
            "event_type": "event: EventInterface",
            "note": "操作列 生成ECO"
          },
          {
            "id": "pdm_c4_11",
            "name": "sysECMAddECIAction",
            "lines": 85,
            "event_type": "async event: EventInterface",
            "note": "变更范围添加"
          },
          {
            "id": "pdm_c4_12",
            "name": "createECIComon",
            "lines": 140,
            "event_type": "event: EventInterface, formCom: DppFormComponent, type: EciModifyType, preDefineVal?: object, dppRender?: IRenderParameter | object, action?: IUIAction"
          },
          {
            "id": "pdm_c4_13",
            "name": "async",
            "lines": 122,
            "event_type": "okButtonThis, com"
          },
          {
            "id": "pdm_c4_14",
            "name": "sysChangeScopeRemoveAction",
            "lines": 32,
            "event_type": "event: EventInterface",
            "note": "变更范围删除"
          },
          {
            "id": "pdm_c4_15",
            "name": "sysECMBatchAssignAction",
            "lines": 88,
            "event_type": "event: EventInterface",
            "note": "浮动toolbar批量指派 @use 变更通知界面 | 场景入口设计变更中的实施计划"
          },
          {
            "id": "pdm_c4_16",
            "name": "sysECMSelectFromStructureAction",
            "lines": 87,
            "event_type": "event: EventInterface",
            "note": "从结构中选择"
          },
          {
            "id": "pdm_c4_17",
            "name": "sysWizardECMBatchStartAction",
            "lines": 23,
            "event_type": "event: EventInterface",
            "note": "工作台-场景入口：实施计划批量启动变更指令"
          },
          {
            "id": "pdm_c4_18",
            "name": "sysECMBatchStartAction",
            "lines": 31,
            "event_type": "event: EventInterface",
            "note": "实施计划批量启动变更指令"
          },
          {
            "id": "pdm_c4_19",
            "name": "sysECMBatchCompleteAction",
            "lines": 42,
            "event_type": "event: EventInterface",
            "note": "实施计划批量完成变更指令 @use 变更通知界面 | 场景入口设计变更中的实施计划"
          },
          {
            "id": "pdm_c4_20",
            "name": "sysECMBatchCancelSubAction",
            "lines": 41,
            "event_type": "event: EventInterface",
            "note": "实施计划批量取消提交变更指令 @use 变更通知界面 | 场景入口设计变更中的实施计划"
          },
          {
            "id": "pdm_c4_21",
            "name": "sysECMBatchCancelAction",
            "lines": 40,
            "event_type": "event: EventInterface",
            "note": "实施计划批量取消变更指令 @use 变更通知界面 | 场景入口设计变更中的实施计划"
          },
          {
            "id": "pdm_c4_22",
            "name": "sysECMBatchRemoveAction",
            "lines": 28,
            "event_type": "async event: EventInterface",
            "note": "实施计划批量移除变更指令 / 批量删除变更建议"
          },
          {
            "id": "pdm_c4_23",
            "name": "singleSaveECIAction",
            "lines": 35,
            "event_type": "event: RowSaveEvent",
            "note": "变更范围 单元格保存"
          },
          {
            "id": "pdm_c4_24",
            "name": "sysBatchSettingAction",
            "lines": 125,
            "event_type": "event: EventInterface",
            "note": "变更范围批量设置"
          },
          {
            "id": "pdm_c4_25",
            "name": "onClick",
            "lines": 57,
            "event_type": "formCpn: DppFormComponent"
          },
          {
            "id": "pdm_c4_26",
            "name": "sysChangeScopeBatchRemoveAction",
            "lines": 32,
            "event_type": "event: EventInterface",
            "note": "变更范围批量移除"
          },
          {
            "id": "pdm_c4_27",
            "name": "sysECODeleteAction",
            "lines": 22,
            "event_type": "event: EventInterface",
            "note": "ECO 基础信息上的删除"
          },
          {
            "id": "pdm_c4_28",
            "name": "sysECOStartEcoAction",
            "lines": 31,
            "event_type": "event: EventInterface",
            "note": "ECO 基础信息上的启动"
          },
          {
            "id": "pdm_c4_29",
            "name": "sysECOCompleteEcoAction",
            "lines": 23,
            "event_type": "event: EventInterface",
            "note": "ECO 基础信息上的完成"
          },
          {
            "id": "pdm_c4_30",
            "name": "sysECOCancelSubEcoAction",
            "lines": 30,
            "event_type": "event: EventInterface",
            "note": "ECO 基础信息上的取消提交"
          },
          {
            "id": "pdm_c4_31",
            "name": "sysECMHasCheckout",
            "lines": 21,
            "event_type": "event: EventInterface",
            "note": "判断是否可以点击影响分析"
          },
          {
            "id": "pdm_c4_32",
            "name": "sysECMImpactAnalysisAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "影响分析 操作列"
          },
          {
            "id": "pdm_c4_33",
            "name": "sysECMBatchImpactAnalysisAction",
            "lines": 53,
            "event_type": "event: EventInterface",
            "note": "影响分析 批量"
          },
          {
            "id": "pdm_c4_34",
            "name": "eCMImpactAnalysisAction",
            "lines": 40,
            "event_type": "event: EventInterface, list: DppSafeAny[]",
            "note": "影响分析实现"
          },
          {
            "id": "pdm_c4_35",
            "name": "sysEcImpactAnalysisSelectAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "影响分析 分段器"
          },
          {
            "id": "pdm_c4_36",
            "name": "sysEcImpactAnalysisAddAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "影响分析 添加（操作列）"
          },
          {
            "id": "pdm_c4_37",
            "name": "sysEcImpactAnalysisBatchAddAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "影响分析 批量添加"
          },
          {
            "id": "pdm_c4_38",
            "name": "ecImpactAnalysisAddAction",
            "lines": 76,
            "event_type": "event: EventInterface, addArr: DppSafeAny[]",
            "note": "影响分析添加实现"
          },
          {
            "id": "pdm_c4_39",
            "name": "sendToMenu",
            "lines": 7,
            "event_type": "res.data['ECO'] || res.data['ECP']",
            "note": "debugger"
          },
          {
            "id": "pdm_c4_40",
            "name": "sysECOSaveAction",
            "lines": 87,
            "event_type": "event: EventInterface",
            "note": "ECO 基础信息上的保存"
          },
          {
            "id": "pdm_c4_41",
            "name": "sysCellSavePerformerAction",
            "lines": 28,
            "event_type": "event: CellSaveEvent",
            "note": "单元格更新指派人"
          },
          {
            "id": "pdm_c4_42",
            "name": "sysECOAddECIAction",
            "lines": 59,
            "event_type": "event: EventInterface",
            "note": "普通变更指令 其他表格添加ECI"
          },
          {
            "id": "pdm_c4_43",
            "name": "sysECOEditECIAction",
            "lines": 64,
            "event_type": "event: EventInterface",
            "note": "普通变更指令 其他表格 编辑"
          },
          {
            "id": "pdm_c4_44",
            "name": "sysECODeleteECIAction",
            "lines": 42,
            "event_type": "event: EventInterface",
            "note": "普通变更指令 其他表格 删除"
          },
          {
            "id": "pdm_c4_45",
            "name": "sysECNCancelCheckOutAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "ECN 取消检出"
          },
          {
            "id": "pdm_c4_46",
            "name": "sysECRCancelCheckOutAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "ECR 取消检出"
          },
          {
            "id": "pdm_c4_47",
            "name": "ecmCancekCheckOutHandle",
            "lines": 43,
            "event_type": "event: EventInterface, formCpm: DppFormComponent, type: CheckActiveEnum"
          },
          {
            "id": "pdm_c4_48",
            "name": "sysECRCancelAction",
            "lines": 25,
            "event_type": "event: EventInterface",
            "note": "ECR 取消"
          },
          {
            "id": "pdm_c4_49",
            "name": "sysECNCancelAction",
            "lines": 25,
            "event_type": "event: EventInterface",
            "note": "ECN 取消"
          },
          {
            "id": "pdm_c4_50",
            "name": "sysGenerateChangeOrderAction",
            "lines": 25,
            "event_type": "event: EventInterface",
            "note": "ECN 生成更改单"
          },
          {
            "id": "pdm_c4_51",
            "name": "sysECRCreateECNAction",
            "lines": 77,
            "event_type": "event: EventInterface",
            "note": "ECR 创建ECN"
          },
          {
            "id": "pdm_c4_52",
            "name": "generateFieldMapping",
            "lines": 8,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: ecr, onValueUpdate: (key, value) => { newECN![key] = value; } }"
          },
          {
            "id": "pdm_c4_53",
            "name": "sysECNPlanChangeContentAction",
            "lines": 154,
            "event_type": "event: EventInterface",
            "note": "ECO 编辑变更内容"
          },
          {
            "id": "pdm_c4_54",
            "name": "openDrawerFn",
            "lines": 5
          },
          {
            "id": "pdm_c4_55",
            "name": "onClick",
            "lines": 4,
            "event_type": "instance: string"
          },
          {
            "id": "pdm_c4_56",
            "name": "openDrawerFn",
            "lines": 9
          },
          {
            "id": "pdm_c4_57",
            "name": "onClick",
            "lines": 3,
            "event_type": "instance: string"
          },
          {
            "id": "pdm_c4_58",
            "name": "buildConfirmConfig",
            "lines": 26,
            "event_type": "modal: DppNzDrawerRef"
          },
          {
            "id": "pdm_c4_59",
            "name": "sysChangeContentRowAction",
            "lines": 78,
            "event_type": "event: TableCellEvent",
            "note": "ECO 编辑变更内容 单元格保存"
          },
          {
            "id": "pdm_c4_60",
            "name": "sysChangeContentDeleteAciton",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "ECO 编辑变更内容 操作列删除"
          },
          {
            "id": "pdm_c4_61",
            "name": "sysChangeContentBatchDeleteAciton",
            "lines": 9,
            "event_type": "event: EventInterface",
            "note": "ECO 编辑变更内容 批量删除"
          },
          {
            "id": "pdm_c4_62",
            "name": "sysChangeContentCheckAciton",
            "lines": 63,
            "event_type": "event: EventInterface",
            "note": "ECO 编辑变更内容 检查"
          },
          {
            "id": "pdm_c4_63",
            "name": "sysChangeContentImportAciton",
            "lines": 58,
            "event_type": "event: EventInterface",
            "note": "ECO 编辑变更内容 导入并检查"
          },
          {
            "id": "pdm_c4_64",
            "name": "sysChangeContentExportAciton",
            "lines": 40,
            "event_type": "event: EventInterface",
            "note": "ECO 编辑变更内容 导出编辑表"
          },
          {
            "id": "pdm_c4_65",
            "name": "sysChangeContentExportTemplateAciton",
            "lines": 17,
            "event_type": "event: EventInterface",
            "note": "ECO 编辑变更内容 导出模板"
          },
          {
            "id": "pdm_c4_66",
            "name": "downloadBlob",
            "lines": 8,
            "event_type": "data: Blob, fileName: string"
          },
          {
            "id": "pdm_c4_67",
            "name": "sysEffectDateCellSaveEvent",
            "lines": 83,
            "event_type": "event: CellSaveEvent",
            "note": "编辑变更内容 - 生效日期单元格保存事件处理器 业务规则： 1. 生效日期不能晚于失效日期 2. 当生效日期变更后，如果已有失效日期，需要验证日期逻辑 3. 如果生效日期晚于失效日期，则自动清空失效日期 @param event - 单元格保存事件对象 @param event.newValue - 新的生效日期值 @param event.data - 当前行的完整数据 @returns Observable<Record<string, any>> - 返回更新后的日期数据 @example // 正常情况：生效日期早于失效日期 event.newValue = '2024-01-01' event.data[INVALID_DATE] = '2024-12-31' // 结果：两个日期都保留 @example // 异常情况：生效日期晚于失效日期 event.newValue = '2024-12-31' event.data[INVALID_DATE] = '2024-01-01' // 结果：失效日期被清空"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f5",
    "project": "PDM",
    "filename": "erp.event.ts",
    "groups": [
      {
        "id": "pdm_g5",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c5_0",
            "name": "InsERPAction",
            "lines": 177,
            "event_type": "event: EventInterface",
            "note": "抛转ERP"
          },
          {
            "id": "pdm_c5_1",
            "name": "openERPIntegrationModal",
            "lines": 2,
            "event_type": "rowData"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f6",
    "project": "PDM",
    "filename": "form-event.ts",
    "groups": [
      {
        "id": "pdm_g6",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c6_0",
            "name": "generateFieldMapping",
            "lines": 8,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: formData, onValueUpdate: (key, value) => { params.data![key] = value; } }"
          },
          {
            "id": "pdm_c6_1",
            "name": "updateTableAndForm",
            "lines": 8
          },
          {
            "id": "pdm_c6_2",
            "name": "updateTableAndForm",
            "lines": 139
          },
          {
            "id": "pdm_c6_3",
            "name": "updateTableAndForm",
            "lines": 48
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f7",
    "project": "PDM",
    "filename": "global-search.event.ts",
    "groups": [
      {
        "id": "pdm_g7",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c7_0",
            "name": "sysGlobalSearchObjectClickAction",
            "lines": 8,
            "event_type": "event: HasModelEventInterface",
            "note": "@description 高级搜索Object类型点击事件"
          },
          {
            "id": "pdm_c7_1",
            "name": "sysGlobalSearchIDClickAction",
            "lines": 3,
            "event_type": "event: HasModelEventInterface",
            "note": "@description 高级搜索点击ID事件"
          },
          {
            "id": "pdm_c7_2",
            "name": "sysGlobalSearchNameClickAction",
            "lines": 3,
            "event_type": "event: HasModelEventInterface",
            "note": "@description 高级搜索点name事件"
          },
          {
            "id": "pdm_c7_3",
            "name": "sysGlobalSearchExportAllAction",
            "lines": 22,
            "event_type": "event: EventInterface",
            "note": "高级搜索导出全部事件 @param event @returns"
          },
          {
            "id": "pdm_c7_4",
            "name": "sysGlobalSearchExportAction",
            "lines": 65,
            "event_type": "event: EventInterface",
            "note": "高级搜索批量导出 @param event @returns"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f8",
    "project": "PDM",
    "filename": "instance-state.event.ts",
    "groups": [
      {
        "id": "pdm_g8",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c8_0",
            "name": "stateOpenInstanceAction",
            "lines": 18,
            "event_type": "event: InstanceStateEventInterface<DppSafeAny>",
            "note": "state-打开跳转路由 @param event @returns"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f9",
    "project": "PDM",
    "filename": "modify-instance.event.ts",
    "groups": [
      {
        "id": "pdm_g9",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c9_0",
            "name": "InstanceSaveAsAction",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "另存"
          },
          {
            "id": "pdm_c9_1",
            "name": "sysCopyNewAction",
            "lines": 19,
            "event_type": "event: EventInterface",
            "note": "另存为(table/card)"
          },
          {
            "id": "pdm_c9_2",
            "name": "InstanceSaveAction",
            "lines": 49,
            "event_type": "event: EventInterface",
            "note": "保存"
          },
          {
            "id": "pdm_c9_3",
            "name": "formSaveAsAction",
            "lines": 48,
            "event_type": "event: EventInterface",
            "note": "form另存"
          },
          {
            "id": "pdm_c9_4",
            "name": "onClick",
            "lines": 3
          },
          {
            "id": "pdm_c9_5",
            "name": "formSaveObjBefore",
            "lines": 31,
            "event_type": "event: EventInterface, object: NzSafeAny, isCheckIn: boolean",
            "note": "form保存前处理动作"
          },
          {
            "id": "pdm_c9_6",
            "name": "saveAsObjectHandle",
            "lines": 35,
            "event_type": "event: EventInterface, object: NzSafeAny, isCheckIn: boolean",
            "note": "form另存对象处理"
          },
          {
            "id": "pdm_c9_7",
            "name": "formSaveObj",
            "lines": 89,
            "event_type": "event: EventInterface, object: NzSafeAny, isCheckIn: boolean = false, isSaveAs: boolean = false, fn?: (data?: IBaseData, isErr?: boolean) => void",
            "note": "form保存对象 @param {EventInterface} event @param {*} object @param {boolean} [isCheckIn=false] @param {boolean} [isSaveAs=false] @param {(data: IBaseData) => void} [fn] 保存的回调 仅当isCheckIn为false时起作用,(不管成功与否都会回调，返回为空时，可能请求异常、也可能请求回来的数据就是空的) @memberof ModifyInstanceEventService"
          },
          {
            "id": "pdm_c9_8",
            "name": "fn",
            "lines": 4,
            "event_type": "res.data"
          },
          {
            "id": "pdm_c9_9",
            "name": "fn",
            "lines": 16,
            "event_type": "undefined, true"
          },
          {
            "id": "pdm_c9_10",
            "name": "openObjectFn",
            "lines": 89,
            "event_type": "event: EventInterface, data: NzSafeAny, afterOpen?: (modal: DppNzModalRef) => void, config?: object",
            "note": "打开对象(文档/图纸)"
          },
          {
            "id": "pdm_c9_11",
            "name": "formCheckIn",
            "lines": 32,
            "event_type": "event: EventInterface",
            "note": "form检入"
          },
          {
            "id": "pdm_c9_12",
            "name": "formCheckInHandle",
            "lines": 62,
            "event_type": "event: EventInterface, object: NzSafeAny",
            "note": "form检入处理"
          },
          {
            "id": "pdm_c9_13",
            "name": "CheckIn",
            "lines": 47,
            "event_type": "event: EventInterface",
            "note": "@description 项目所有的检入 @param event"
          },
          {
            "id": "pdm_c9_14",
            "name": "sysNewRevisionCommand",
            "lines": 48,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_15",
            "name": "CheckOut",
            "lines": 90,
            "event_type": "event: EventInterface",
            "note": "@param event @use 项目全部检出 @constructor"
          },
          {
            "id": "pdm_c9_16",
            "name": "formCheckOutHandle",
            "lines": 4,
            "event_type": "data"
          },
          {
            "id": "pdm_c9_17",
            "name": "tableFn",
            "lines": 2,
            "event_type": "data"
          },
          {
            "id": "pdm_c9_18",
            "name": "cardFn",
            "lines": 79,
            "event_type": "data"
          },
          {
            "id": "pdm_c9_19",
            "name": "CancekCheckOut",
            "lines": 62,
            "event_type": "event: EventInterface",
            "note": "取消檢出"
          },
          {
            "id": "pdm_c9_20",
            "name": "CancelChecked",
            "lines": 1,
            "event_type": "event: EventInterface",
            "note": "取消選擇"
          },
          {
            "id": "pdm_c9_21",
            "name": "insStartWFAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "启动流程"
          },
          {
            "id": "pdm_c9_22",
            "name": "sysStartWorkflowAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "提交发布流程(猜你想)"
          },
          {
            "id": "pdm_c9_23",
            "name": "workflowReleasedFn",
            "lines": 181,
            "event_type": "getDataValue: workflowReleasedData, event: EventInterface"
          },
          {
            "id": "pdm_c9_24",
            "name": "batchCheckActiveObject",
            "lines": 52,
            "event_type": "event: EventInterface",
            "note": "批量检入 - 批量检出"
          },
          {
            "id": "pdm_c9_25",
            "name": "sysBatchDeleteAction",
            "lines": 65,
            "event_type": "async event: EventInterface",
            "note": "@description 批量删除 @use 产品设计一级页面｜产品设计二级页面｜公共空间一级页面｜公共空间二级页面 @param event"
          },
          {
            "id": "pdm_c9_26",
            "name": "deleteObject",
            "lines": 39,
            "event_type": "event: EventInterface",
            "note": "@use 产品设计二级页面操作栏 @param event"
          },
          {
            "id": "pdm_c9_27",
            "name": "batchMaterialCancelCheckOut",
            "lines": 37,
            "event_type": "event: EventInterface",
            "note": "批量取消检出"
          },
          {
            "id": "pdm_c9_28",
            "name": "batchMaterialTransferCheckOut",
            "lines": 90,
            "event_type": "event: EventInterface",
            "note": "@description 批量移交检出 @use 产品设计二级页面操悬浮|公共空间二级页面悬浮 @param event"
          },
          {
            "id": "pdm_c9_29",
            "name": "onClick",
            "lines": 4,
            "event_type": "userListComponent: UserListComponent"
          },
          {
            "id": "pdm_c9_30",
            "name": "onClick",
            "lines": 35,
            "event_type": "userListComponent: UserListComponent"
          },
          {
            "id": "pdm_c9_31",
            "name": "batchMaterialCopy",
            "lines": 26,
            "event_type": "event: EventInterface",
            "note": "物料表格批量复制"
          },
          {
            "id": "pdm_c9_32",
            "name": "useKey",
            "lines": 15
          },
          {
            "id": "pdm_c9_33",
            "name": "batchCopyFolderAction",
            "lines": 19,
            "event_type": "event: EventInterface",
            "note": "批量复制文件夹"
          },
          {
            "id": "pdm_c9_34",
            "name": "sysDeleteObjectAction",
            "lines": 82,
            "event_type": "event: EventInterface",
            "note": "表格or表单删除"
          },
          {
            "id": "pdm_c9_35",
            "name": "sysCheckOutTransferAction",
            "lines": 69,
            "event_type": "event: EventInterface",
            "note": "移交检出"
          },
          {
            "id": "pdm_c9_36",
            "name": "sysModOwnerAction",
            "lines": 91,
            "event_type": "event: EventInterface",
            "note": "修改所有者"
          },
          {
            "id": "pdm_c9_37",
            "name": "onClick",
            "lines": 61,
            "event_type": "userListComponent: UserListComponent"
          },
          {
            "id": "pdm_c9_38",
            "name": "sysBatchRemoveEnd2Action",
            "lines": 54,
            "event_type": "event: EventInterface",
            "note": "批量删除END2 维护产品结构"
          },
          {
            "id": "pdm_c9_39",
            "name": "sysInstanceRelatedBatchDeleteAction",
            "lines": 61,
            "event_type": "event: EventInterface",
            "note": "批量删除END2 相关对象"
          },
          {
            "id": "pdm_c9_40",
            "name": "sysRemoveEnd2Action",
            "lines": 82,
            "event_type": "event: EventInterface",
            "note": "@description 树形结构表格删除关联关系 @use 工艺管理 @param event"
          },
          {
            "id": "pdm_c9_41",
            "name": "sysProductStructureRemoveEnd2Action",
            "lines": 81,
            "event_type": "event: EventInterface",
            "note": "@description 产品设计/维护产品结构 移除 @param event"
          },
          {
            "id": "pdm_c9_42",
            "name": "sysRelatedRemoveEnd2Action",
            "lines": 86,
            "event_type": "event: EventInterface",
            "note": "@description 删除关联关系 @use 相关对象 @param event"
          },
          {
            "id": "pdm_c9_43",
            "name": "sysBOMEditAction",
            "lines": 47,
            "event_type": "event: EventInterface",
            "note": "BOM编辑"
          },
          {
            "id": "pdm_c9_44",
            "name": "sysEditBOMAction",
            "lines": 37,
            "event_type": "event: EventInterface",
            "note": "BOM编辑 =》 切换到instance BOM编辑tab页"
          },
          {
            "id": "pdm_c9_45",
            "name": "sysBOMEditCompletedAction",
            "lines": 50,
            "event_type": "event: EventInterface",
            "note": "BOM完成编辑"
          },
          {
            "id": "pdm_c9_46",
            "name": "sysBOMEditCancelAction",
            "lines": 54,
            "event_type": "event: EventInterface",
            "note": "BOM取消编辑"
          },
          {
            "id": "pdm_c9_47",
            "name": "sysCADToBOMAction",
            "lines": 23,
            "event_type": "event: EventInterface",
            "note": "CADTOBOM"
          },
          {
            "id": "pdm_c9_48",
            "name": "sysCopyObjectAction",
            "lines": 34,
            "event_type": "event: EventInterface",
            "note": "@description 复制 @use 产品设计二级页面 @param event"
          },
          {
            "id": "pdm_c9_49",
            "name": "sysCopyNewFolderAction",
            "lines": 79,
            "event_type": "event: EventInterface",
            "note": "@description 复制新建 @use 产品设计二级页面 @param event"
          },
          {
            "id": "pdm_c9_50",
            "name": "sysPasteFolderAction",
            "lines": 62,
            "event_type": "event: EventInterface",
            "note": "@description 黏贴 @use 产品设计二级页面 @param event"
          },
          {
            "id": "pdm_c9_51",
            "name": "sysNewRelatedAction",
            "lines": 80,
            "event_type": "async event: EventInterface",
            "note": "新建关联关系"
          },
          {
            "id": "pdm_c9_52",
            "name": "generateFieldMapping",
            "lines": 8,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: end1, onValueUpdate: (key, value) => { readyData[key] = value; } }"
          },
          {
            "id": "pdm_c9_53",
            "name": "sysNewRelatedCompleteAction",
            "lines": 62,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_54",
            "name": "newObjectActionHandle",
            "lines": 133,
            "event_type": "event: EventInterface, render: IFormRender, callBack?: (data?: IBaseData) => void, isOpenAfterbuilt?: boolean",
            "note": "新建对象后的操作 @param {EventInterface} event @param {IFormRender} render form入参 @param {(data?: IBaseData) => void} [callBack] 保存的回调 (不管成功与否都会回调，返回为空时，可能请求异常、也可能请求回来的数据就是空的) @param {boolean} [isOpenAfterbuild] 新建后是否打开 @memberof ModifyInstanceEventService"
          },
          {
            "id": "pdm_c9_55",
            "name": "onClick",
            "lines": 63,
            "event_type": "async formComponent: DppFormComponent"
          },
          {
            "id": "pdm_c9_56",
            "name": "callBack",
            "lines": 2,
            "event_type": "data"
          },
          {
            "id": "pdm_c9_57",
            "name": "AddRelatedAction",
            "lines": 163,
            "event_type": "event: EventInterface",
            "note": "相关附件添加"
          },
          {
            "id": "pdm_c9_58",
            "name": "onClick",
            "lines": 24,
            "event_type": "ContentCom: DppGlobalSearchComponent"
          },
          {
            "id": "pdm_c9_59",
            "name": "addRelation",
            "lines": 5,
            "event_type": "params, () => { this.loading = false; }, () => { modal.close(); }"
          },
          {
            "id": "pdm_c9_60",
            "name": "closeModal",
            "lines": 2
          },
          {
            "id": "pdm_c9_61",
            "name": "closeBtnLoading",
            "lines": 24
          },
          {
            "id": "pdm_c9_62",
            "name": "ProcessAddRelatedAction",
            "lines": 130,
            "event_type": "event: EventInterface",
            "note": "工序添加"
          },
          {
            "id": "pdm_c9_63",
            "name": "onClick",
            "lines": 15,
            "event_type": "globalSearch: DppGlobalSearchComponent"
          },
          {
            "id": "pdm_c9_64",
            "name": "addRelation",
            "lines": 9,
            "event_type": "data"
          },
          {
            "id": "pdm_c9_65",
            "name": "ProcessAddRelatedAction1",
            "lines": 139,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_66",
            "name": "onClick",
            "lines": 15,
            "event_type": "tableCpm: DppTableComponent"
          },
          {
            "id": "pdm_c9_67",
            "name": "addRelation",
            "lines": 9,
            "event_type": "data"
          },
          {
            "id": "pdm_c9_68",
            "name": "AddBOMRelatedAction",
            "lines": 183,
            "event_type": "event: EventInterface",
            "note": "从bom添加"
          },
          {
            "id": "pdm_c9_69",
            "name": "openSelectTable",
            "lines": 8,
            "event_type": "selectData"
          },
          {
            "id": "pdm_c9_70",
            "name": "setLoading",
            "lines": 5,
            "event_type": "false"
          },
          {
            "id": "pdm_c9_71",
            "name": "setLoading",
            "lines": 3,
            "event_type": "false"
          },
          {
            "id": "pdm_c9_72",
            "name": "setLoading",
            "lines": 3,
            "event_type": "false"
          },
          {
            "id": "pdm_c9_73",
            "name": "setLoading",
            "lines": 14,
            "event_type": "false"
          },
          {
            "id": "pdm_c9_74",
            "name": "onClick",
            "lines": 3
          },
          {
            "id": "pdm_c9_75",
            "name": "onClick",
            "lines": 7,
            "event_type": "selectTable: DppTableComponent"
          },
          {
            "id": "pdm_c9_76",
            "name": "setLoading",
            "lines": 10,
            "event_type": "true"
          },
          {
            "id": "pdm_c9_77",
            "name": "onSelectOk",
            "lines": 9,
            "event_type": "selectTable, selectModal, setLoading"
          },
          {
            "id": "pdm_c9_78",
            "name": "onClick",
            "lines": 3
          },
          {
            "id": "pdm_c9_79",
            "name": "onClick",
            "lines": 3,
            "event_type": "globalSearch: DppGlobalSearchComponent"
          },
          {
            "id": "pdm_c9_80",
            "name": "onGlobalSearchOk",
            "lines": 9,
            "event_type": "globalSearch, globalSearchModal"
          },
          {
            "id": "pdm_c9_81",
            "name": "openGlobalSearch",
            "lines": 3
          },
          {
            "id": "pdm_c9_82",
            "name": "AddBOMRelatedAction1",
            "lines": 117,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_83",
            "name": "sysRelationPasteChildNodeAction",
            "lines": 67,
            "event_type": "event: EventInterface",
            "note": "相关附件 粘贴"
          },
          {
            "id": "pdm_c9_84",
            "name": "handelRelated",
            "lines": 87,
            "event_type": "event: EventInterface, title: string, templateName: string, interfaceNames: string",
            "note": "关联图纸和 文档公共逻辑 @param {EventInterface} event @param {string} title @param {string} templateName @memberof ModifyInstanceEventService"
          },
          {
            "id": "pdm_c9_85",
            "name": "sysAddRelatedCadAction",
            "lines": 37,
            "event_type": "event: EventInterface",
            "note": "关联图纸"
          },
          {
            "id": "pdm_c9_86",
            "name": "sysAddRelatedDocAction",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "关联文档"
          },
          {
            "id": "pdm_c9_87",
            "name": "handelRelatedToItem",
            "lines": 140,
            "event_type": "event: EventInterface, templateName: string"
          },
          {
            "id": "pdm_c9_88",
            "name": "onClick",
            "lines": 17,
            "event_type": "ContentCom: DppGlobalSearchComponent"
          },
          {
            "id": "pdm_c9_89",
            "name": "guessAddRelation",
            "lines": 10,
            "event_type": "data"
          },
          {
            "id": "pdm_c9_90",
            "name": "sysAddRelatedItemAction",
            "lines": 9,
            "event_type": "event: EventInterface",
            "note": "(文档)关联到物料"
          },
          {
            "id": "pdm_c9_91",
            "name": "sysCadAddRelatedItemAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "(图纸)关联到物料"
          },
          {
            "id": "pdm_c9_92",
            "name": "sysAddRelatedBOMAction",
            "lines": 76,
            "event_type": "event: EventInterface",
            "note": "关联到BOM"
          },
          {
            "id": "pdm_c9_93",
            "name": "sysCreateBOMAction",
            "lines": 103,
            "event_type": "event: EventInterface",
            "note": "生成BOM/CADToBOM[猜你想]"
          },
          {
            "id": "pdm_c9_94",
            "name": "createBom",
            "lines": 3
          },
          {
            "id": "pdm_c9_95",
            "name": "createBom",
            "lines": 62
          },
          {
            "id": "pdm_c9_96",
            "name": "OutSysCreateBOMAction",
            "lines": 3,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_97",
            "name": "sysCommonNewAction",
            "lines": 1,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_98",
            "name": "initFilePreview",
            "lines": 17,
            "event_type": "event: EventInterface, tableData: IFoundaton | string",
            "note": "初始化预览主文件 @memberof ModifyInstanceEventService"
          },
          {
            "id": "pdm_c9_99",
            "name": "sysMainFileAction",
            "lines": 39,
            "event_type": "event: EventInterface",
            "note": "设置主文件"
          },
          {
            "id": "pdm_c9_100",
            "name": "sysTaskMainFileAction",
            "lines": 23,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_101",
            "name": "refreshInstanceForm",
            "lines": 17,
            "event_type": "rootPageService: IPageService",
            "note": "循环查找form组件刷新更新UPDATETIME"
          },
          {
            "id": "pdm_c9_102",
            "name": "sysUploadFileAction",
            "lines": 186,
            "event_type": "event: EventInterface",
            "note": "上传文件（基于表格 @param {EventInterface} event @memberof QueryInstanceEventService"
          },
          {
            "id": "pdm_c9_103",
            "name": "onClick",
            "lines": 81,
            "event_type": "data: DppFormComponent"
          },
          {
            "id": "pdm_c9_104",
            "name": "sysTaskUploadFileAction",
            "lines": 137,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_105",
            "name": "sysDeleteFileAction",
            "lines": 42,
            "event_type": "event: EventInterface",
            "note": "删除文件 @param {EventInterface} event @memberof ModifyInstanceEventService"
          },
          {
            "id": "pdm_c9_106",
            "name": "sysTaskDeleteFileAction",
            "lines": 26,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_107",
            "name": "sysBatchDeleteFileAction",
            "lines": 27,
            "event_type": "event: EventInterface",
            "note": "批量删除文件-任务对象界面 @param {EventInterface} event @memberof ModifyInstanceEventService"
          },
          {
            "id": "pdm_c9_108",
            "name": "sysFileBatchDeleteCommonAciton",
            "lines": 30,
            "event_type": "event: EventInterface",
            "note": "批量删除文件-通用 @param {EventInterface} event @memberof ModifyInstanceEventService"
          },
          {
            "id": "pdm_c9_109",
            "name": "sysSwapAction",
            "lines": 3,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_110",
            "name": "sysNewRevisionAction",
            "lines": 73,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_111",
            "name": "sysRollBackIterationAction",
            "lines": 34,
            "event_type": "event: EventInterface",
            "note": "版本回滚 @param event"
          },
          {
            "id": "pdm_c9_112",
            "name": "sysSelectLocationFilterAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "全局搜索/添加位置 -> 表格过滤"
          },
          {
            "id": "pdm_c9_113",
            "name": "sysSelectLocationSearchAction",
            "lines": 9,
            "event_type": "event: EventInterface",
            "note": "全局搜索/添加位置 -> 表格搜索"
          },
          {
            "id": "pdm_c9_114",
            "name": "sysRestartQueueAction",
            "lines": 24,
            "event_type": "event: EventInterface",
            "note": "重启队列 @param event"
          },
          {
            "id": "pdm_c9_115",
            "name": "sysDeleteQueueAction",
            "lines": 20,
            "event_type": "event: EventInterface",
            "note": "删除队列 @param event"
          },
          {
            "id": "pdm_c9_116",
            "name": "sysCancelJobsAction",
            "lines": 20,
            "event_type": "event: EventInterface",
            "note": "取消队列 @param event"
          },
          {
            "id": "pdm_c9_117",
            "name": "sysQueueRefreshCommand",
            "lines": 4,
            "event_type": "event: EventInterface",
            "note": "刷新 @param event"
          },
          {
            "id": "pdm_c9_118",
            "name": "sysRestartFileTransAction",
            "lines": 21,
            "event_type": "event: EventInterface",
            "note": "文件转换重启队列 @param event"
          },
          {
            "id": "pdm_c9_119",
            "name": "sysDeleteFileTransAction",
            "lines": 25,
            "event_type": "event: EventInterface",
            "note": "文件转换删除队列 @param event"
          },
          {
            "id": "pdm_c9_120",
            "name": "sysCancelFileTransAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "文件转换取消队列 @param event"
          },
          {
            "id": "pdm_c9_121",
            "name": "batchRestartQueueAction",
            "lines": 35,
            "event_type": "event: EventInterface",
            "note": "批量重启队列 @param event"
          },
          {
            "id": "pdm_c9_122",
            "name": "batchDeleteQueueAction",
            "lines": 35,
            "event_type": "event: EventInterface",
            "note": "批量删除队列 @param event"
          },
          {
            "id": "pdm_c9_123",
            "name": "batchCancelQueueAction",
            "lines": 59,
            "event_type": "event: EventInterface",
            "note": "批量取消队列 @param event"
          },
          {
            "id": "pdm_c9_124",
            "name": "batchRestartFileTransAction",
            "lines": 35,
            "event_type": "event: EventInterface",
            "note": "批量重启文件转换队列 @param event"
          },
          {
            "id": "pdm_c9_125",
            "name": "batchDeleteFileTransAction",
            "lines": 35,
            "event_type": "event: EventInterface",
            "note": "批量删除文件转换队列 @param event"
          },
          {
            "id": "pdm_c9_126",
            "name": "batchCancelFileTransAction",
            "lines": 29,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_127",
            "name": "fileTransfer",
            "lines": 18,
            "event_type": "event: EventInterface, title: string",
            "note": "文件转换 @param event"
          },
          {
            "id": "pdm_c9_128",
            "name": "sysTransferFileAction",
            "lines": 51,
            "event_type": "event: EventInterface",
            "note": "文件转换"
          },
          {
            "id": "pdm_c9_129",
            "name": "sysFileTransOnlyAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "转换"
          },
          {
            "id": "pdm_c9_130",
            "name": "sysEleSignOnlyAction",
            "lines": 5,
            "event_type": "event: EventInterface",
            "note": "签章"
          },
          {
            "id": "pdm_c9_131",
            "name": "sysFileTransAndSignAction",
            "lines": 5,
            "event_type": "event: EventInterface",
            "note": "转换+签章"
          },
          {
            "id": "pdm_c9_132",
            "name": "addTransfIntoQueue",
            "lines": 12,
            "event_type": "params: { GUID$: string; CLASSGUID$: string; transConfigGuid?: string; transConfigGuids?: string[]; }"
          },
          {
            "id": "pdm_c9_133",
            "name": "sysOpenECRAction",
            "lines": 123,
            "event_type": "event: EventInterface",
            "note": "对象详情打开ECR/ECN @param event"
          },
          {
            "id": "pdm_c9_134",
            "name": "generateFieldMapping",
            "lines": 8,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: changeItem, onValueUpdate: (key, value) => { action['model'][key] = value; } }"
          },
          {
            "id": "pdm_c9_135",
            "name": "async",
            "lines": 99,
            "event_type": "okButton, formCom"
          },
          {
            "id": "pdm_c9_136",
            "name": "saveObjectOfObs",
            "lines": 47,
            "event_type": "event: EventInterface",
            "note": "保存对象 @param event @returns Observable"
          },
          {
            "id": "pdm_c9_137",
            "name": "checkInObjectOfObs",
            "lines": 47,
            "event_type": "async event: EventInterface"
          },
          {
            "id": "pdm_c9_138",
            "name": "saveObjectOfModal",
            "lines": 13,
            "event_type": "event: EventInterface, modal: DppNzModalRef, confirmModal: DppNzModalRef",
            "note": "保存对象 (模态框提示专用) @param event @returns Observable"
          },
          {
            "id": "pdm_c9_139",
            "name": "checkInOfModal",
            "lines": 13,
            "event_type": "async event: EventInterface, modal: DppNzModalRef, confirmModal: DppNzModalRef",
            "note": "检入对象 (模态框提示专用) @param event @returns"
          },
          {
            "id": "pdm_c9_140",
            "name": "OpenLightWeightChartAction",
            "lines": 66,
            "event_type": "event: EventInterface",
            "note": "点击缩略图打开轻量化文件"
          },
          {
            "id": "pdm_c9_141",
            "name": "commonPreview",
            "lines": 1,
            "event_type": "event: EventInterface, data: IBaseData"
          },
          {
            "id": "pdm_c9_142",
            "name": "InsERPOptionAction",
            "lines": 173,
            "event_type": "event: EventInterface",
            "note": "抛转ERP"
          },
          {
            "id": "pdm_c9_143",
            "name": "openERPIntegrationModal",
            "lines": 2,
            "event_type": "rowData"
          },
          {
            "id": "pdm_c9_144",
            "name": "InsERPBatchGlobalSearchOptionAction",
            "lines": 231,
            "event_type": "event: EventInterface",
            "note": "高级搜索批量erp操作 @param event"
          },
          {
            "id": "pdm_c9_145",
            "name": "openERPIntegrationModal",
            "lines": 2,
            "event_type": "rowCheckedDatas, classList, condition, event"
          },
          {
            "id": "pdm_c9_146",
            "name": "onClick",
            "lines": 79,
            "event_type": "data: DppFormComponent"
          },
          {
            "id": "pdm_c9_147",
            "name": "sysGlobalSearchBatchDeleteAction",
            "lines": 35,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_148",
            "name": "InsERPBatchOptionAction",
            "lines": 206,
            "event_type": "event: EventInterface",
            "note": "批量erp操作 @param event"
          },
          {
            "id": "pdm_c9_149",
            "name": "openERPIntegrationModal",
            "lines": 2,
            "event_type": "rowCheckedDatas, classList"
          },
          {
            "id": "pdm_c9_150",
            "name": "onClick",
            "lines": 62,
            "event_type": "data: DppFormComponent"
          },
          {
            "id": "pdm_c9_151",
            "name": "sysProcessCellSaveAction",
            "lines": 51,
            "event_type": "event: CellSaveEvent",
            "note": "主料辅料单元格保存事件"
          },
          {
            "id": "pdm_c9_152",
            "name": "recentOpenAction",
            "lines": 9,
            "event_type": "event: HasModelEventInterface",
            "note": "最近打开点击编号事件---废弃  使用它 还不如直接用sysOpenGeneralBlankAction呢"
          },
          {
            "id": "pdm_c9_153",
            "name": "sysOpenIterationAction",
            "lines": 8,
            "event_type": "event: HasModelEventInterface",
            "note": "版序打开编号事件"
          },
          {
            "id": "pdm_c9_154",
            "name": "sysBOMDragAction",
            "lines": 5,
            "event_type": "event: RowDragEvent",
            "note": "bom拖拽事件"
          },
          {
            "id": "pdm_c9_155",
            "name": "sysMaintainBomDragAction",
            "lines": 5,
            "event_type": "event: RowDragEvent",
            "note": "维护产品结构的拖拽事件"
          },
          {
            "id": "pdm_c9_156",
            "name": "sysBOMImportAction",
            "lines": 84,
            "event_type": "event: EventInterface",
            "note": "bom导入 @param event"
          },
          {
            "id": "pdm_c9_157",
            "name": "sysIgnoreBomObjectAction",
            "lines": 10,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_158",
            "name": "sysCoverBomObjectAction",
            "lines": 10,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c9_159",
            "name": "downloadFile",
            "lines": 25,
            "event_type": "file: any, fileName: string, isAll: boolean"
          },
          {
            "id": "pdm_c9_160",
            "name": "downloadMainFileAction",
            "lines": 13,
            "event_type": "event: any",
            "note": "主文件下载"
          },
          {
            "id": "pdm_c9_161",
            "name": "sysBomCutAction",
            "lines": 59,
            "event_type": "event: EventInterface",
            "note": "剪切"
          },
          {
            "id": "pdm_c9_162",
            "name": "sysBomBatchCutAction",
            "lines": 98,
            "event_type": "event: EventInterface",
            "note": "批量剪切"
          },
          {
            "id": "pdm_c9_163",
            "name": "sysBOMRefreshSeqAction",
            "lines": 19,
            "event_type": "event: EventInterface",
            "note": "刷新顺序号"
          },
          {
            "id": "pdm_c9_164",
            "name": "sysBOMRefreshAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "刷新"
          },
          {
            "id": "pdm_c9_165",
            "name": "sysBomCellSaveAction",
            "lines": 50,
            "event_type": "event: CellSaveEvent"
          },
          {
            "id": "pdm_c9_166",
            "name": "sysHeterogERPRestartQueueAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "重启队列单个操作"
          },
          {
            "id": "pdm_c9_167",
            "name": "sysHeterogERPDeleteQueueAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "删除队列单个操作"
          },
          {
            "id": "pdm_c9_168",
            "name": "sysHeterogERPCancelJobsAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "取消队列单个操作"
          },
          {
            "id": "pdm_c9_169",
            "name": "sysHeterogERPBatchRestartQueueAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "重启队列批量操作"
          },
          {
            "id": "pdm_c9_170",
            "name": "sysHeterogERPBatchDeleteQueueAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "删除队列批量操作"
          },
          {
            "id": "pdm_c9_171",
            "name": "sysHeterogERPBatchCancelQueueAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "取消队列批量操作"
          },
          {
            "id": "pdm_c9_172",
            "name": "refreshChildTable",
            "lines": 17,
            "event_type": "table: DppTableComponent, event: EventInterface"
          },
          {
            "id": "pdm_c9_173",
            "name": "handleSingleOperationAction",
            "lines": 3,
            "event_type": "actionFn: ( object: { [key: string]: string[] }, type?: QueueTypeEnum | undefined ) => Observable<DppResponse<IBatchData>>, event: EventInterface, successMessage: string, queueType: QueueTypeEnum"
          },
          {
            "id": "pdm_c9_174",
            "name": "actionFn",
            "lines": 12,
            "event_type": "object, queueType"
          },
          {
            "id": "pdm_c9_175",
            "name": "handleBatchOperationAction",
            "lines": 3,
            "event_type": "actionFn: ( object: { [key: string]: string[] }, type?: QueueTypeEnum | undefined ) => Observable<DppResponse<IBatchData>>, event: EventInterface, successMessage: string, queueType: QueueTypeEnum"
          },
          {
            "id": "pdm_c9_176",
            "name": "actionFn",
            "lines": 19,
            "event_type": "object, queueType"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f10",
    "project": "PDM",
    "filename": "organization.event.ts",
    "groups": [
      {
        "id": "pdm_g10",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c10_0",
            "name": "sysOrgantUserSaveAction",
            "lines": 31,
            "event_type": "event: EventInterface",
            "note": "---------------------------------------------------------------------------组织管理-------------------------------------------------------------- 用户页面下的保存按钮"
          },
          {
            "id": "pdm_c10_1",
            "name": "sysOrgantUserResetAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "用户页面下的重置按钮"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f11",
    "project": "PDM",
    "filename": "outside.event.ts",
    "groups": [
      {
        "id": "pdm_g11",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c11_0",
            "name": "OutCheckIn",
            "lines": 57,
            "event_type": "async event: EventInterface, config?: OutFormConfig",
            "note": "检入（外侧）"
          },
          {
            "id": "pdm_c11_1",
            "name": "CheckOutFormIn",
            "lines": 3,
            "event_type": "async event: EventInterface",
            "note": "检入form（外侧）"
          },
          {
            "id": "pdm_c11_2",
            "name": "OutCheckOut",
            "lines": 47,
            "event_type": "event: EventInterface, config?: OutFormConfig",
            "note": "检出（外侧）"
          },
          {
            "id": "pdm_c11_3",
            "name": "CheckOutForm",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "检出form（外侧）"
          },
          {
            "id": "pdm_c11_4",
            "name": "OutInstanceSaveAction",
            "lines": 264,
            "event_type": "async event: EventInterface, config?: OutFormConfig",
            "note": "保存（外侧）"
          },
          {
            "id": "pdm_c11_5",
            "name": "obsFn",
            "lines": 127,
            "event_type": "saveAsAfterHandle"
          },
          {
            "id": "pdm_c11_6",
            "name": "obsFn",
            "lines": 5,
            "event_type": "saveAsAfterHandle"
          },
          {
            "id": "pdm_c11_7",
            "name": "obsFn",
            "lines": 19,
            "event_type": "saveAfterHandle"
          },
          {
            "id": "pdm_c11_8",
            "name": "InstanceSaveFormAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "保存form（外侧）"
          },
          {
            "id": "pdm_c11_9",
            "name": "OutInsStartWFAction",
            "lines": 5,
            "event_type": "event: EventInterface",
            "note": "启动流程（外侧）"
          },
          {
            "id": "pdm_c11_10",
            "name": "OutInstanceSaveAsAction",
            "lines": 8,
            "event_type": "event: EventInterface, config?: OutFormConfig",
            "note": "另存为（外侧）"
          },
          {
            "id": "pdm_c11_11",
            "name": "OutSysDeleteObjectAction",
            "lines": 48,
            "event_type": "event: EventInterface",
            "note": "删除（外侧）"
          },
          {
            "id": "pdm_c11_12",
            "name": "deleteFn",
            "lines": 3
          },
          {
            "id": "pdm_c11_13",
            "name": "OutCancekCheckOut",
            "lines": 68,
            "event_type": "event: EventInterface, config?: OutFormConfig",
            "note": "取消检出（外侧）"
          },
          {
            "id": "pdm_c11_14",
            "name": "checkoutFn",
            "lines": 17
          },
          {
            "id": "pdm_c11_15",
            "name": "CancekCheckOutForm",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "取消检出form（外侧）"
          },
          {
            "id": "pdm_c11_16",
            "name": "OutSysNewRevisionAction",
            "lines": 45,
            "event_type": "event: EventInterface",
            "note": "修订（外侧）"
          },
          {
            "id": "pdm_c11_17",
            "name": "OutSysCheckOutTransferAction",
            "lines": 49,
            "event_type": "event: EventInterface, config?: OutFormConfig",
            "note": "移交检出（外侧）"
          },
          {
            "id": "pdm_c11_18",
            "name": "OutSysModOwnerAction",
            "lines": 48,
            "event_type": "event: EventInterface, config?: OutFormConfig",
            "note": "修改所有者（外侧）"
          },
          {
            "id": "pdm_c11_19",
            "name": "OutSysCopyObjectAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "复制（外侧）"
          },
          {
            "id": "pdm_c11_20",
            "name": "OutSysOpenECRAction",
            "lines": 133,
            "event_type": "event: EventInterface",
            "note": "变更请求/变更通知（外侧）"
          },
          {
            "id": "pdm_c11_21",
            "name": "generateFieldMapping",
            "lines": 8,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: changeItem, onValueUpdate: (key, value) => { render.data![key] = value; } }"
          },
          {
            "id": "pdm_c11_22",
            "name": "async",
            "lines": 102,
            "event_type": "okButton, formCom"
          },
          {
            "id": "pdm_c11_23",
            "name": "OutOpenDesignAction",
            "lines": 26,
            "event_type": "event: EventInterface",
            "note": "设计（外侧）"
          },
          {
            "id": "pdm_c11_24",
            "name": "sysOutFileTransOnlyAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "转换（外侧）"
          },
          {
            "id": "pdm_c11_25",
            "name": "sysOutEleSignOnlyAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "签章（外侧）"
          },
          {
            "id": "pdm_c11_26",
            "name": "sysOutFileTransAndSignAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "转换+签章（外侧）"
          },
          {
            "id": "pdm_c11_27",
            "name": "_fileTransfer",
            "lines": 21,
            "event_type": "event: EventInterface",
            "note": "文件转换 @param event"
          },
          {
            "id": "pdm_c11_28",
            "name": "_addTransfIntoQueue",
            "lines": 7,
            "event_type": "params: { GUID$: string; CLASSGUID$: string; transConfigGuid: string }"
          },
          {
            "id": "pdm_c11_29",
            "name": "replaceSchemeCheckOutFormIn",
            "lines": 5,
            "event_type": "event: EventInterface",
            "note": "取替代相关 检入"
          },
          {
            "id": "pdm_c11_30",
            "name": "replaceSchemeCheckOutForm",
            "lines": 5,
            "event_type": "event: EventInterface",
            "note": "取替代相关 检出"
          },
          {
            "id": "pdm_c11_31",
            "name": "replaceSchemeCancekCheckOutForm",
            "lines": 5,
            "event_type": "event: EventInterface",
            "note": "取替代相关 取消检出"
          },
          {
            "id": "pdm_c11_32",
            "name": "replaceSchemeSaveFormAction",
            "lines": 5,
            "event_type": "event: EventInterface",
            "note": "取替代相关 保存"
          },
          {
            "id": "pdm_c11_33",
            "name": "replaceSaveAsAction",
            "lines": 22,
            "event_type": "event: EventInterface",
            "note": "取替代相关 form另存为"
          },
          {
            "id": "pdm_c11_34",
            "name": "replaceSchemeCheckOutTransferAction",
            "lines": 5,
            "event_type": "event: EventInterface",
            "note": "取替代相关 移交检出"
          },
          {
            "id": "pdm_c11_35",
            "name": "replaceChangeOwnerAction",
            "lines": 5,
            "event_type": "event: EventInterface",
            "note": "取替代相关 所有者修改"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f12",
    "project": "PDM",
    "filename": "page-mess.event.ts",
    "groups": [
      {
        "id": "pdm_g12",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c12_0",
            "name": "sysMenuClick",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "菜单点击事件 @param event 事件对象 @use 产品设计二级页面menu行点击 @deprecated v31.1 使用 `sysRouteMenuClick` 代替"
          },
          {
            "id": "pdm_c12_1",
            "name": "sysTableClick",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "table文件夹点击事件 @param event 事件对象 @use 产品设计二级页面table文件夹点击"
          },
          {
            "id": "pdm_c12_2",
            "name": "sysIMPactAnalysisMenuClick",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "影响分析菜单点击事件 @param event 事件对象 @use 变更对象影响分析菜单点击"
          },
          {
            "id": "pdm_c12_3",
            "name": "sysFileClickRow",
            "lines": 31,
            "event_type": "event: EventInterface",
            "note": "文件行点击事件-预览 @param event"
          },
          {
            "id": "pdm_c12_4",
            "name": "sysSelectList",
            "lines": 36,
            "event_type": "event: EventInterface",
            "note": "从iframe操作触发，操作table的选中"
          },
          {
            "id": "pdm_c12_5",
            "name": "cleanString",
            "lines": 18,
            "event_type": "str: string, type?: string"
          },
          {
            "id": "pdm_c12_6",
            "name": "sysSelectChart",
            "lines": 97,
            "event_type": "event: EventInterface",
            "note": "从table操作触发，操作iframe的选中"
          },
          {
            "id": "pdm_c12_7",
            "name": "findNodesByOriginInTreeArray",
            "lines": 11,
            "event_type": "treeArray: RowNode[], valuesToCheck: string[]",
            "note": "找到匹配的选中"
          },
          {
            "id": "pdm_c12_8",
            "name": "findNodesByOrigin",
            "lines": 26,
            "event_type": "tree: RowNode, valuesToCheck: string[]"
          },
          {
            "id": "pdm_c12_9",
            "name": "findIdsByNames",
            "lines": 17,
            "event_type": "ids: string[], node: LightWrightChartTreeNode, result: string[] = [], type?: string"
          },
          {
            "id": "pdm_c12_10",
            "name": "removeHyphenAndAfterFromAll",
            "lines": 10,
            "event_type": "arr: string[]",
            "note": "删掉最后一个-及之后的字符"
          },
          {
            "id": "pdm_c12_11",
            "name": "findSelectFullNames",
            "lines": 14,
            "event_type": "node: RowNode",
            "note": "-----------子虔获取选中数据的完整路径----------"
          },
          {
            "id": "pdm_c12_12",
            "name": "findFullName",
            "lines": 12,
            "event_type": "name: string, tree: any"
          },
          {
            "id": "pdm_c12_13",
            "name": "replacePath",
            "lines": 16,
            "event_type": "path: string, tree: any"
          },
          {
            "id": "pdm_c12_14",
            "name": "menuClick",
            "lines": 14,
            "event_type": "event: EventInterface, paramsKey: string",
            "note": "菜单点击事件（公用） @param event @param paramsKey"
          },
          {
            "id": "pdm_c12_15",
            "name": "menuBatchClick",
            "lines": 17,
            "event_type": "event: EventInterface, paramsKeysArr: string[]",
            "note": "菜单点击事件（公用） @param event @param paramsKey"
          },
          {
            "id": "pdm_c12_16",
            "name": "sysCheckboxChangeAction",
            "lines": 25,
            "event_type": "event: EventInterface",
            "note": "bom页签批量剪切状态切换 @param event @description 取消选中时，剪切状态也需要还原"
          },
          {
            "id": "pdm_c12_17",
            "name": "sysIntegrateParentRowClick",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "集成-父表格点击事件"
          },
          {
            "id": "pdm_c12_18",
            "name": "sysAssociatedMaterialChecked",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "综合视图 ->批量下载左侧表格默认获取部分选中"
          },
          {
            "id": "pdm_c12_19",
            "name": "sysFileAttachmentTypeClassificationChecked",
            "lines": 7,
            "event_type": "event: EventInterface",
            "note": "综合视图 ->批量下载右侧表格默认全部选中"
          },
          {
            "id": "pdm_c12_20",
            "name": "sysFileAttachmentTypeClassificationSelect",
            "lines": 11,
            "event_type": "event: EventInterface",
            "note": "综合视图 ->批量下载左侧表格选中 触发 右侧表格更新"
          },
          {
            "id": "pdm_c12_21",
            "name": "sysProductAssociatedMaterialChecked",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "产品设计——>批量下载左侧表格默认获取部分选中"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f13",
    "project": "PDM",
    "filename": "process.event.ts",
    "groups": [
      {
        "id": "pdm_g13",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c13_0",
            "name": "sysNewProcessManageAction",
            "lines": 66,
            "event_type": "event: EventInterface",
            "note": "#region 工艺管理模块 新建工艺库"
          },
          {
            "id": "pdm_c13_1",
            "name": "onClick",
            "lines": 26,
            "event_type": "formCpn: DppFormComponent"
          },
          {
            "id": "pdm_c13_2",
            "name": "sysProcessManageSearchAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "工艺库搜索 @param event"
          },
          {
            "id": "pdm_c13_3",
            "name": "sysEditProcessLibraryAction",
            "lines": 63,
            "event_type": "event: EventInterface",
            "note": "编辑工艺模块库"
          },
          {
            "id": "pdm_c13_4",
            "name": "openTeam",
            "lines": 44,
            "event_type": "data: Record<string, string>, table: DppTableComponent",
            "note": "新建库成功 --> 打开团队"
          },
          {
            "id": "pdm_c13_5",
            "name": "sysProcessManageNewObjectAction",
            "lines": 103,
            "event_type": "event: EventInterface",
            "note": "@description 新建 @use 工艺管理二级页面 @param event"
          },
          {
            "id": "pdm_c13_6",
            "name": "generateFieldMapping",
            "lines": 9,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: choiceMenuObj['origin'], onValueUpdate: (key, value) => { params.data![key] = value; }, isMapToObject: false }"
          },
          {
            "id": "pdm_c13_7",
            "name": "sysAssemblyOutlineProcessFlowConstituteAddAction",
            "lines": 78,
            "event_type": "event: EventInterface",
            "note": "装配大纲工艺流程作业站添加 @param event"
          },
          {
            "id": "pdm_c13_8",
            "name": "onClick",
            "lines": 36,
            "event_type": "data"
          },
          {
            "id": "pdm_c13_9",
            "name": "sysOperatingStationAddSearchAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "作业站搜索事件 @param event"
          },
          {
            "id": "pdm_c13_10",
            "name": "sysAssemblyOutlineProcessFlowConstituteDeleteAction",
            "lines": 34,
            "event_type": "event: EventInterface",
            "note": "装配大纲工艺流程作业站删除事件 @param event"
          },
          {
            "id": "pdm_c13_11",
            "name": "sysAssemblyOutlineProcessFlowConstituteGeneratePBOMAction",
            "lines": 21,
            "event_type": "event: EventInterface",
            "note": "装配大纲工艺流程PBOM事件 @param event"
          },
          {
            "id": "pdm_c13_12",
            "name": "sysAssemblyOutlineProcessFlowConstitutedeleteEgdeAction",
            "lines": 25,
            "event_type": "event: EventInterface",
            "note": "作业站删除连线事件 @param event"
          },
          {
            "id": "pdm_c13_13",
            "name": "sysAssemblyOutlineProcessFlowConstitutedeleteConnectedAction",
            "lines": 45,
            "event_type": "event: ConnectedEventInterface",
            "note": "作业站连线事件 @param event"
          },
          {
            "id": "pdm_c13_14",
            "name": "sysAssemblyOutlineProcessFlowConstituteSerialNumberRefreshAction",
            "lines": 19,
            "event_type": "event: EventInterface",
            "note": "装配大纲工艺流程组成顺序号刷新事件 @param event"
          },
          {
            "id": "pdm_c13_15",
            "name": "sysAssemblyOutlineDragAction",
            "lines": 80,
            "event_type": "event: RowDragEvent",
            "note": "装配大纲工艺流程组成移动事件 根据被拖拽节点拖拽后的位置对比，来决定传的参数，上移传目标位置的下一位   下移传目标位置的上一位 @param event"
          },
          {
            "id": "pdm_c13_16",
            "name": "sysAssemblyOutlineProcessFlowConstituteTableNewAction",
            "lines": 129,
            "event_type": "event: EventInterface",
            "note": "装配大纲工艺流程组成table新建 @param event"
          },
          {
            "id": "pdm_c13_17",
            "name": "generateFieldMapping",
            "lines": 9,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: end1Iinstance, onValueUpdate: (key, value) => { params.data![key] = value; }, isMapToObject: false }"
          },
          {
            "id": "pdm_c13_18",
            "name": "sysAssemblyOutlineProcessFlowConstituteTableAddAction",
            "lines": 91,
            "event_type": "event: EventInterface",
            "note": "装配大纲工艺流程组成table添加 @param event"
          },
          {
            "id": "pdm_c13_19",
            "name": "onClick",
            "lines": 47,
            "event_type": "data"
          },
          {
            "id": "pdm_c13_20",
            "name": "sysAssemblyOutlineProcessFlowConstituteProcessAddSearchAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "装配工序添加弹窗搜索 @param event"
          },
          {
            "id": "pdm_c13_21",
            "name": "sysAssemblyOutlineProcessFlowConstituteExportSOPAction",
            "lines": 76,
            "event_type": "event: EventInterface",
            "note": "装配大纲工艺流程组成table导出SOP @param event"
          },
          {
            "id": "pdm_c13_22",
            "name": "sysAssemblyOutlineProcessFlowConstituteOptionDeleteAction",
            "lines": 2144,
            "event_type": "event: EventInterface",
            "note": "装配大纲工艺流程组成table删除 @param event"
          },
          {
            "id": "pdm_c13_23",
            "name": "sysAssemblyOutlineProcessFlowConstituteBatchExportSOPAction",
            "lines": 83,
            "event_type": "event: EventInterface",
            "note": "装配大纲工艺流程组成table批量导出SOP @param event"
          },
          {
            "id": "pdm_c13_24",
            "name": "sysAssemblyOutlineProcessFlowConstituteOptionBatchDeleteAction",
            "lines": 51,
            "event_type": "event: EventInterface",
            "note": "装配大纲工艺流程组成table批量删除 @param event"
          },
          {
            "id": "pdm_c13_25",
            "name": "sysAssemblyOutlineProcessFlowFlowChartNodeClick",
            "lines": 53,
            "event_type": "event: EventInterface",
            "note": "作业站流程图节点点击事件 @param event"
          },
          {
            "id": "pdm_c13_26",
            "name": "sysAssemblyOutlineProcessFlowConstituteSerialNumberAction",
            "lines": 53,
            "event_type": "event: CellSaveEvent",
            "note": "装配大纲工序顺序号事件 @param event"
          },
          {
            "id": "pdm_c13_27",
            "name": "sysAssemblyOutlineProcessFlowConstituteProcessEditAction",
            "lines": 45,
            "event_type": "event: CellSaveEvent",
            "note": "装配大纲工序-上道工序编辑事件 @param event"
          },
          {
            "id": "pdm_c13_28",
            "name": "sysAssemblyOutlineProcessFlowConstituteAddBrotherNodeAction",
            "lines": 84,
            "event_type": "event: EventInterface",
            "note": "装配工序相邻位置添加 @param event"
          },
          {
            "id": "pdm_c13_29",
            "name": "sysAssemblyOutlineProcessFlowConstituteNewBrotherNodeAction",
            "lines": 129,
            "event_type": "event: EventInterface",
            "note": "装配工序相邻位置新建 @param event"
          },
          {
            "id": "pdm_c13_30",
            "name": "generateFieldMapping",
            "lines": 8,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: instanceData, onValueUpdate: (key, value) => { params.data![key] = value || ''; } }"
          },
          {
            "id": "pdm_c13_31",
            "name": "sysFabricationOutlineProcessFlowConstituteNewAction",
            "lines": 122,
            "event_type": "event: EventInterface",
            "note": "制造大纲工艺流程组成新建事件 @param event"
          },
          {
            "id": "pdm_c13_32",
            "name": "generateFieldMapping",
            "lines": 9,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: end1Iinstance, onValueUpdate: (key, value) => { params.data![key] = value; }, isMapToObject: false }"
          },
          {
            "id": "pdm_c13_33",
            "name": "sysFabricationOutlineProcessFlowConstituteGeneratePBOMAction",
            "lines": 21,
            "event_type": "event: EventInterface",
            "note": "制造大纲工艺流程组成PBOM新事件 @param event"
          },
          {
            "id": "pdm_c13_34",
            "name": "sysFabricationOutlineProcessFlowConstituteSerialNumberRefreshAction",
            "lines": 16,
            "event_type": "event: EventInterface",
            "note": "制造大纲工艺流程组成顺序号刷新事件 @param event"
          },
          {
            "id": "pdm_c13_35",
            "name": "sysFabricationOutlineProcessFlowConstituteAddAction",
            "lines": 86,
            "event_type": "event: EventInterface",
            "note": "制造大纲工艺流程组成添加工序事件 @param event"
          },
          {
            "id": "pdm_c13_36",
            "name": "onClick",
            "lines": 49,
            "event_type": "data"
          },
          {
            "id": "pdm_c13_37",
            "name": "sysFabricationOutlineProcessFlowConstituteProcessAddSearchAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "制造大纲工艺流程添加事件搜索 @param event"
          },
          {
            "id": "pdm_c13_38",
            "name": "sysFabricationOutlineProcessFlowConstituteExportSOPAction",
            "lines": 76,
            "event_type": "event: EventInterface",
            "note": "制造大纲工艺流程导出SOP @param event"
          },
          {
            "id": "pdm_c13_39",
            "name": "sysFabricationOutlineProcessFlowConstituteDeleteAction",
            "lines": 74,
            "event_type": "event: EventInterface",
            "note": "制造大纲工艺流程删除 @param event"
          },
          {
            "id": "pdm_c13_40",
            "name": "sysFabricationOutlineProcessFlowConstituteBatchExportSOPAction",
            "lines": 78,
            "event_type": "event: EventInterface",
            "note": "制造大纲工艺流程批量导出SOP @param event"
          },
          {
            "id": "pdm_c13_41",
            "name": "sysFabricationOutlineProcessFlowConstituteBatchDeleteAction",
            "lines": 46,
            "event_type": "event: EventInterface",
            "note": "制造大纲工艺流程批量删除 @param event"
          },
          {
            "id": "pdm_c13_42",
            "name": "sysFabricationOutlineProcessFlowConstituteSerialNumberAction",
            "lines": 44,
            "event_type": "event: CellSaveEvent",
            "note": "制造大纲工序顺序号事件 @param event"
          },
          {
            "id": "pdm_c13_43",
            "name": "sysFabricationOutlineProcessFlowConstituteProcessEditAction",
            "lines": 46,
            "event_type": "event: CellSaveEvent",
            "note": "制造大纲工序-上道工序编辑事件 @param event"
          },
          {
            "id": "pdm_c13_44",
            "name": "sysFabricationOutlineDragAction",
            "lines": 84,
            "event_type": "event: RowDragEvent",
            "note": "制造大纲工艺流程组成移动事件"
          },
          {
            "id": "pdm_c13_45",
            "name": "sysFabricationOutlineProcessFlowConstituteAddBrotherNodeAction",
            "lines": 79,
            "event_type": "event: EventInterface",
            "note": "制造工序相邻位置添加 @param event"
          },
          {
            "id": "pdm_c13_46",
            "name": "sysFabricationOutlineProcessFlowConstituteNewBrotherNodeAction",
            "lines": 127,
            "event_type": "event: EventInterface",
            "note": "制造工序相邻位置新建 @param event"
          },
          {
            "id": "pdm_c13_47",
            "name": "generateFieldMapping",
            "lines": 8,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: end1Instance, onValueUpdate: (key, value) => { params.data![key] = value; } }"
          },
          {
            "id": "pdm_c13_48",
            "name": "sysProcessUploadFileAction",
            "lines": 108,
            "event_type": "event: EventInterface",
            "note": "上传文件（基于表格 @param {EventInterface} event @memberof QueryInstanceEventService"
          },
          {
            "id": "pdm_c13_49",
            "name": "onClick",
            "lines": 56,
            "event_type": "data: DppFormComponent"
          },
          {
            "id": "pdm_c13_50",
            "name": "initFilePreview",
            "lines": 17,
            "event_type": "event: EventInterface, tableData: IFoundaton | string",
            "note": "初始化预览主文件 @memberof ModifyInstanceEventService"
          },
          {
            "id": "pdm_c13_51",
            "name": "sysProcessFileDownloadAction",
            "lines": 21,
            "event_type": "event: EventInterface",
            "note": "表格操作列下载事件 @param {EventInterface} event @memberof QueryInstanceEventService"
          },
          {
            "id": "pdm_c13_52",
            "name": "sysProcessMainFileAction",
            "lines": 16,
            "event_type": "event: EventInterface",
            "note": "设置主文件"
          },
          {
            "id": "pdm_c13_53",
            "name": "sysProcessDeleteFileAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "删除文件 @param {EventInterface} event @memberof ModifyInstanceEventService"
          },
          {
            "id": "pdm_c13_54",
            "name": "sysProcessBatchRemoveEnd2Action",
            "lines": 50,
            "event_type": "event: EventInterface",
            "note": "工序批量删除事件 @param event @returns"
          },
          {
            "id": "pdm_c13_55",
            "name": "getRoute",
            "lines": 9,
            "event_type": "node: RowNode"
          },
          {
            "id": "pdm_c13_56",
            "name": "sysProcessObjectCompleteAction",
            "lines": 44,
            "event_type": "event: EventInterface",
            "note": "@description 工艺任务完成事件 @use 工艺任务详情界面；工作台工艺任务操作栏"
          },
          {
            "id": "pdm_c13_57",
            "name": "sysProcessTaskAddDeliverablesAction",
            "lines": 76,
            "event_type": "event: EventInterface",
            "note": "添加交付物事件 @param event"
          },
          {
            "id": "pdm_c13_58",
            "name": "onClick",
            "lines": 33,
            "event_type": "selectTable: DppTableComponent"
          },
          {
            "id": "pdm_c13_59",
            "name": "sysProcessTaskNewDeliverablesAction",
            "lines": 110,
            "event_type": "event: EventInterface",
            "note": "新建交付物事件 @param event"
          },
          {
            "id": "pdm_c13_60",
            "name": "sysProcessTaskDeliverablesDeleteAction",
            "lines": 25,
            "event_type": "event: EventInterface",
            "note": "工艺任务-交付物删除事件 @param event"
          },
          {
            "id": "pdm_c13_61",
            "name": "sysOutlineSearchAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "大纲搜索事件 @param event"
          },
          {
            "id": "pdm_c13_62",
            "name": "padSequenceNumber",
            "lines": 3,
            "event_type": "value: number | string, length: number = 4",
            "note": "将数值转换为固定长度（4位）的字符串，不足位数前面补零 @param value 需要处理的数值 @param length 目标长度，默认为4 @returns 补零后的字符串"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f14",
    "project": "PDM",
    "filename": "product-design.event.ts",
    "groups": [
      {
        "id": "pdm_g14",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c14_0",
            "name": "getRoute",
            "lines": 9,
            "event_type": "node: RowNode"
          },
          {
            "id": "pdm_c14_1",
            "name": "sysNewTaskAction",
            "lines": 46,
            "event_type": "event: EventInterface, data?: IFoundaton",
            "note": "@description 产品设计 打开新建设计任务 界面 @use 产品设计/产品管理/任务管理-新建任务/工作台 任务派发"
          },
          {
            "id": "pdm_c14_2",
            "name": "sysCreateTaskForProductAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "@description 产品管理/维护产品结构/单个新建任务 @param event"
          },
          {
            "id": "pdm_c14_3",
            "name": "sysBatchCreateForProductTaskAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "@description 产品管理/维护产品结构/批量新建任务 @param event"
          },
          {
            "id": "pdm_c14_4",
            "name": "sysTaskWizardTitleClickAction",
            "lines": 10,
            "event_type": "event: WizardTitleEventInterface"
          },
          {
            "id": "pdm_c14_5",
            "name": "sysTaskWizardConfirmAction",
            "lines": 130,
            "event_type": "event: EventInterface",
            "note": "@description 新建设计任务向导确认操作，创建任务并处理交付物和文件上传。 @param event 事件对象 @modifier chenlong @modifyDate 2025-04-27 @modifyContent 添加独立任务没有保存交付物的备注，处理新建成功/失败的多语言提示。"
          },
          {
            "id": "pdm_c14_6",
            "name": "fn",
            "lines": 833,
            "event_type": "res1.data as IBaseData"
          },
          {
            "id": "pdm_c14_7",
            "name": "fn",
            "lines": 63,
            "event_type": "res.data as IBaseData"
          },
          {
            "id": "pdm_c14_8",
            "name": "sysNewTaskAddDeliverablesAction",
            "lines": 105,
            "event_type": "event: EventInterface",
            "note": "@description 产品设计 新增交付项 @use 产品设计/产品管理/任务管理-新建任务-交付物-新增交付物(前端)｜工作台任务派发（前端）｜工作台直接打开新页签（接口） @modify chenglong 2025-01-07 修改新增成功后的刷新"
          },
          {
            "id": "pdm_c14_9",
            "name": "setBtnLoading",
            "lines": 6,
            "event_type": "true"
          },
          {
            "id": "pdm_c14_10",
            "name": "setBtnLoading",
            "lines": 7,
            "event_type": "false"
          },
          {
            "id": "pdm_c14_11",
            "name": "setBtnLoading",
            "lines": 3,
            "event_type": "false"
          },
          {
            "id": "pdm_c14_12",
            "name": "setBtnLoading",
            "lines": 133,
            "event_type": "false"
          },
          {
            "id": "pdm_c14_13",
            "name": "setBtnLoading",
            "lines": 25,
            "event_type": "false"
          },
          {
            "id": "pdm_c14_14",
            "name": "onClick",
            "lines": 6,
            "event_type": "forCom: DppFormComponent"
          },
          {
            "id": "pdm_c14_15",
            "name": "onConfirm",
            "lines": 89,
            "event_type": "forCom, modal, setBtnLoading"
          },
          {
            "id": "pdm_c14_16",
            "name": "buildAddData",
            "lines": 13,
            "event_type": "arrayOfData: DppSafeAny"
          },
          {
            "id": "pdm_c14_17",
            "name": "buildAddParams",
            "lines": 14,
            "event_type": "rowData: any, formData: any, arrayOfData: any"
          },
          {
            "id": "pdm_c14_18",
            "name": "sysAddDeliverablesDeleteSessionAction",
            "lines": 7,
            "event_type": "event: EventInterface",
            "note": "@description 删除交付物 @use 产品设计/产品管理/任务管理-新建任务-交付物-删除交付物"
          },
          {
            "id": "pdm_c14_19",
            "name": "sysTaskBatchDeleteDeliverablesFrontAction",
            "lines": 7,
            "event_type": "event: EventInterface",
            "note": "@description 批量删除交付物前端操作 @use 产品设计/产品管理/任务管理-新建任务-交付物-批量删除"
          },
          {
            "id": "pdm_c14_20",
            "name": "sysBOMAddDeliverablesAction",
            "lines": 99,
            "event_type": "event: EventInterface",
            "note": "@description 添加交付物 @use 任务对象实例界面-操作栏添加交付物 @author yangff @modifier chenlong 2025-01-07 如果全部失败， 不关闭弹框，修改表格刷新方式"
          },
          {
            "id": "pdm_c14_21",
            "name": "setBtnLoading",
            "lines": 7,
            "event_type": "true"
          },
          {
            "id": "pdm_c14_22",
            "name": "setBtnLoading",
            "lines": 5,
            "event_type": "false"
          },
          {
            "id": "pdm_c14_23",
            "name": "setBtnLoading",
            "lines": 31,
            "event_type": "false"
          },
          {
            "id": "pdm_c14_24",
            "name": "onClick",
            "lines": 6,
            "event_type": "forCom: DppGlobalSearchComponent"
          },
          {
            "id": "pdm_c14_25",
            "name": "onConfirm",
            "lines": 332,
            "event_type": "forCom, modal, setBtnLoading"
          },
          {
            "id": "pdm_c14_26",
            "name": "sysBOMDeliverablesNewAction",
            "lines": 47,
            "event_type": "event: EventInterface",
            "note": "@description 新建交付物 @modify cl 2025-01-08 修改成功后的表格刷新"
          },
          {
            "id": "pdm_c14_27",
            "name": "sysDeliverablesCompleteAction",
            "lines": 54,
            "event_type": "event: EventInterface",
            "note": "@description 新建交付物  确认事件"
          },
          {
            "id": "pdm_c14_28",
            "name": "sysTaskDeliverablesBatchDeleteAction",
            "lines": 73,
            "event_type": "event: EventInterface",
            "note": "批量删除交付物和交付物类型 业务规则: 1. 交付物类型只能在未指派(NTA)状态下删除 2. 交付物对象只能在进行中(RUN)状态下删除 任务状态说明: - INI: 未启动 - NTA: 未指派 - RUN: 进行中 - APP: 审批中 - PUS: 已暂停 - COP: 已完成 - SSP: 已取消 @param event 事件对象 @author cl @modifyDate 2025-01-08 @modifyContent 1. 增加任务状态校验 2. 优化删除后的表格更新逻辑 3. 完善错误处理"
          },
          {
            "id": "pdm_c14_29",
            "name": "sysNewTaskInstanceAdmeaBatchDeleteAction",
            "lines": 27,
            "event_type": "event: EventInterface",
            "note": "@description 批量删除子任务 @use 任务对象实例界面 -分配- 新建子任务-批量删除"
          },
          {
            "id": "pdm_c14_30",
            "name": "sysInstanceDetailOthersJournalaction",
            "lines": 19,
            "event_type": "event: EventInterface",
            "note": "@description 日志"
          },
          {
            "id": "pdm_c14_31",
            "name": "sysAddDeliverablesAddAction",
            "lines": 3,
            "event_type": "_event: EventInterface",
            "note": "@description 产品设计 添加子任务 @use 产品设计/产品管理/任务管理-任务实例界面-子任务-添加 @param _event"
          },
          {
            "id": "pdm_c14_32",
            "name": "objectInstanceSaveAction",
            "lines": 57,
            "event_type": "event: EventInterface",
            "note": "实例界面保存"
          },
          {
            "id": "pdm_c14_33",
            "name": "assignAction",
            "lines": 118,
            "event_type": "event: EventInterface",
            "note": "指派任务给其他人"
          },
          {
            "id": "pdm_c14_34",
            "name": "onClick",
            "lines": 52,
            "event_type": "data"
          },
          {
            "id": "pdm_c14_35",
            "name": "sysObjectAssignAction",
            "lines": 198,
            "event_type": "event: EventInterface",
            "note": "任务对象界面  指派任务"
          },
          {
            "id": "pdm_c14_36",
            "name": "onClick",
            "lines": 142,
            "event_type": "data: DppFormComponent"
          },
          {
            "id": "pdm_c14_37",
            "name": "sysObjectUpdateAction",
            "lines": 83,
            "event_type": "event: EventInterface",
            "note": "@description 更新 @use 任务对象实例界面"
          },
          {
            "id": "pdm_c14_38",
            "name": "onClick",
            "lines": 42,
            "event_type": "data: DppFormComponent"
          },
          {
            "id": "pdm_c14_39",
            "name": "refreshInstanceForm",
            "lines": 17,
            "event_type": "rootPageService: IPageService",
            "note": "循环查找form组件刷新更新UPDATETIME"
          },
          {
            "id": "pdm_c14_40",
            "name": "sysObjectTaskAction",
            "lines": 191,
            "event_type": "event: EventInterface",
            "note": "@description 启动  取消 提交 删除 暂停(仅工作台待办/分配任务) @use 任务对象实例界面 工艺任务实例界面（启动  取消 删除）"
          },
          {
            "id": "pdm_c14_41",
            "name": "fn",
            "lines": 3
          },
          {
            "id": "pdm_c14_42",
            "name": "onClick",
            "lines": 7,
            "event_type": "data: DppFormComponent"
          },
          {
            "id": "pdm_c14_43",
            "name": "fn",
            "lines": 9,
            "event_type": "data, modal, setBtnLoading"
          },
          {
            "id": "pdm_c14_44",
            "name": "fn",
            "lines": 7
          },
          {
            "id": "pdm_c14_45",
            "name": "sysObjectPauseAction",
            "lines": 90,
            "event_type": "event: EventInterface",
            "note": "@description 暂停 @use 任务对象实例界面"
          },
          {
            "id": "pdm_c14_46",
            "name": "onClick",
            "lines": 56,
            "event_type": "data: DppFormComponent"
          },
          {
            "id": "pdm_c14_47",
            "name": "sysObjectWithDrawAction",
            "lines": 92,
            "event_type": "event: EventInterface",
            "note": "撤回事件"
          },
          {
            "id": "pdm_c14_48",
            "name": "onClick",
            "lines": 57,
            "event_type": "data: DppFormComponent"
          },
          {
            "id": "pdm_c14_49",
            "name": "sysObjectAuditAction",
            "lines": 90,
            "event_type": "event: EventInterface",
            "note": "@description 审核 @use 任务对象实例界面"
          },
          {
            "id": "pdm_c14_50",
            "name": "onClick",
            "lines": 9,
            "event_type": "data: DppFormComponent"
          },
          {
            "id": "pdm_c14_51",
            "name": "auditFn",
            "lines": 10,
            "event_type": "data, 'reject', setBtnLoading"
          },
          {
            "id": "pdm_c14_52",
            "name": "onClick",
            "lines": 9,
            "event_type": "data: DppFormComponent"
          },
          {
            "id": "pdm_c14_53",
            "name": "auditFn",
            "lines": 56,
            "event_type": "data, 'complete', setBtnLoading"
          },
          {
            "id": "pdm_c14_54",
            "name": "sysBatchAddAdmeaConfirmAction",
            "lines": 63,
            "event_type": "event: EventInterface",
            "note": "@description 新增子任务=》分配任务确认按钮 和 指派按钮 @use 任务对象实例界面"
          },
          {
            "id": "pdm_c14_55",
            "name": "sysBatchAddAdmeaCancelAction",
            "lines": 5,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c14_56",
            "name": "sysNewTaskAddJournalAction",
            "lines": 37,
            "event_type": "event: EventInterface",
            "note": "@description 新增子任务 @use 任务对象实例界面"
          },
          {
            "id": "pdm_c14_57",
            "name": "batchAssignmentAction",
            "lines": 89,
            "event_type": "event: EventInterface",
            "note": "@description 产品设计批量指派任务 @use 产品设计/产品管理/任务管理-批量指派任务"
          },
          {
            "id": "pdm_c14_58",
            "name": "sysMaintenanceProductDeleteAction",
            "lines": 73,
            "event_type": "event: EventInterface",
            "note": "删除产品(操作栏删除和 批量删除)"
          },
          {
            "id": "pdm_c14_59",
            "name": "sysGuessTaskManageAction",
            "lines": 38,
            "event_type": "event: EventInterface",
            "note": "维护产品结构=》任务管理"
          },
          {
            "id": "pdm_c14_60",
            "name": "ProductSearchAction",
            "lines": 1,
            "event_type": "_event: EventInterface",
            "note": "sysNewProductAction(event: EventInterface): void {   const bs = this.getExeCom(event) as DppButtonComponent;   const model = bs.getUiModel() as ButtonIUiModel;   const table = this.getContentCom(event) as unknown as DppTableComponent;   const menuPath = this.menuService.getBread();   const params: IFormRender = {     name: model.action!.name,     mParams: {       mode: model.action!.mode     },     data: {       COMMITFOLDER$: table.modelManager.initParams['libraryGuid'],       COMMITFOLDER$NAME: menuPath     }   };   const modal = this.as.openModal(     {       title: model.label,       width: '600px',       bodyStyle: { minHeight: '619px', height: 'auto' },       content: DppFormComponent,       footer: [         {           label: 'basic.common.command.previousStep',           size: 'default',           show: (formComponent: DppFormComponent) => {             return formComponent.plugins.get(FormPluginEnum.STEP)!.stepTitles.length > 1;           },           disabled: (formComponent: DppFormComponent) => {             return formComponent.plugins.get(FormPluginEnum.STEP)!.currentStepIndex === 0;           },           onClick: (formComponent: DppFormComponent) => {             formComponent.plugins               .get(FormPluginEnum.STEP)!               .changeContent(formComponent.plugins.get(FormPluginEnum.STEP)!.currentStepIndex - 1);           }         },         {           label: 'basic.common.command.nextStep',           size: 'default',           show: (formComponent: DppFormComponent) => {             return formComponent.plugins.get(FormPluginEnum.STEP)!.stepTitles.length > 1;           },           disabled: (formComponent: DppFormComponent) => {             return (               formComponent.plugins.get(FormPluginEnum.STEP)!.currentStepIndex + 1 >               formComponent.plugins.get(FormPluginEnum.STEP)!.stepTitles.length - 1             );           },           onClick: (formComponent: DppFormComponent) => {             const index = formComponent.plugins.get(FormPluginEnum.STEP)!.currentStepIndex;             formComponent.plugins               .get(FormPluginEnum.STEP)!               .changeContent(formComponent.plugins.get(FormPluginEnum.STEP)!.currentStepIndex + 1);           }         },         {           label: 'common.button.confirm',           type: 'primary',           onClick: data => {             const isValid = data.onSubmit();             const formDta = data.getFormData();             const object = {               CLASSNAME$: formDta?.['CLASSNAME$'],               CLASSGUID$: formDta?.['CLASSGUID$'],               MASTERFK$: '',               CLASSIFICATIONGUID$: formDta?.['CLASSIFICATION$'],               ISAUTOCHECKOUT$: formDta?.['ISAUTOCHECKOUT$'] || 'N',               NAME$: formDta?.['NAME$'],               productModel: formDta?.['PRODUCTMODEL'] || '',               productLib: table?.dppRender?.dParams?.['GUID$'],               COMMITFOLDER$: formDta['COMMITFOLDER$'],               ID$: formDta?.['BOGUID$']             };             // return;             if (isValid) {               data.setLoading(true);               this.productDesignService.createProduct(formDta).subscribe({                 next: res => {                   modal?.close();                   if (res.success && res.data) {                     this.dppMessageService.success('common.operation.newSuccess');                     // this.contentComCallback(event, {                     //   operate: EventCallbacksActionName.REFRESH                     // });                     table.refreshData();                     // 打开新建成功页面                     const modalRef = this.as.openModal(                       {                         title: 'productdesign.command.sysNewProductCommand',                         width: '480px',                         bodyStyle: { height: '100%', paddingRight: '40px' },                         footer: 'noFooter',                         content: ProductNewSuccessComponent,                         reFreshCallBack: () => {                           modalRef?.close();                         }                       },                       { dppRender: res.data }                     );                   }                   data.setLoading(false);                 },                 error: _err => {                   modal?.close();                   data.setLoading(false);                 }               });             }           }         }       ]     },     { dppRender: params }   ); }"
          },
          {
            "id": "pdm_c14_61",
            "name": "ProductDetailSearchAction",
            "lines": 1,
            "event_type": "_event: EventInterface",
            "note": "产品设计/公共空间 二/三级 页面搜索"
          },
          {
            "id": "pdm_c14_62",
            "name": "SysViewAction",
            "lines": 1,
            "event_type": "_event: EventInterface",
            "note": "综合视图(暂时注释)"
          },
          {
            "id": "pdm_c14_63",
            "name": "transferAction",
            "lines": 145,
            "event_type": "event: EventInterface",
            "note": "@description 转派任务 @use 设计任务 工艺任务 详情界面"
          },
          {
            "id": "pdm_c14_64",
            "name": "onClick",
            "lines": 89,
            "event_type": "data"
          },
          {
            "id": "pdm_c14_65",
            "name": "refreshFn",
            "lines": 399
          },
          {
            "id": "pdm_c14_66",
            "name": "sysChangeAttentionAction",
            "lines": 34,
            "event_type": "event: EventInterface",
            "note": "@description 关注/取消关注 @use 产品设计/产品管理｜工作台 @param event"
          },
          {
            "id": "pdm_c14_67",
            "name": "sysChangeDefaultAction",
            "lines": 22,
            "event_type": "event: EventInterface",
            "note": "@description  产品设计设为默认/取消默认 @use 产品设计1级页面 @param event"
          },
          {
            "id": "pdm_c14_68",
            "name": "sysFolderAction",
            "lines": 18,
            "event_type": "event: EventInterface",
            "note": "产品设计库文件夹 @use 产品设计一级页面-操作列-产品管理 （旧） @param {EventInterface} event"
          },
          {
            "id": "pdm_c14_69",
            "name": "sysRouteDesignMangeAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "产品设计库文件夹 @use 产品设计一级页面-操作列-产品管理 （新） @param {EventInterface} event"
          },
          {
            "id": "pdm_c14_70",
            "name": "sysDesignDetailBreadcrumbManageAction",
            "lines": 6,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c14_71",
            "name": "sysGetProductDesignDefaultRoute",
            "lines": 11,
            "event_type": "event: RouteDynaGetDeaultEvent"
          },
          {
            "id": "pdm_c14_72",
            "name": "sysProductSearchAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "产品设计搜索 @use 产品设计一级页面搜索 @param event"
          },
          {
            "id": "pdm_c14_73",
            "name": "sysRoleSearchAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "产品设计/公共空间->团队->角色搜索"
          },
          {
            "id": "pdm_c14_74",
            "name": "sysProductDetailSearchAction",
            "lines": 17,
            "event_type": "event: EventInterface",
            "note": "@description 搜索 @use 产品设计二级页面｜产品管理 @param event"
          },
          {
            "id": "pdm_c14_75",
            "name": "sysNewProductLibraryAction",
            "lines": 96,
            "event_type": "event: EventInterface",
            "note": "新建产品库"
          },
          {
            "id": "pdm_c14_76",
            "name": "setBtnLoading",
            "lines": 16,
            "event_type": "true"
          },
          {
            "id": "pdm_c14_77",
            "name": "setBtnLoading",
            "lines": 3,
            "event_type": "false"
          },
          {
            "id": "pdm_c14_78",
            "name": "setBtnLoading",
            "lines": 27,
            "event_type": "false"
          },
          {
            "id": "pdm_c14_79",
            "name": "onClick",
            "lines": 6,
            "event_type": "formCpn: DppFormComponent"
          },
          {
            "id": "pdm_c14_80",
            "name": "onConfirm",
            "lines": 1,
            "event_type": "{ formCpn, modal, table, setBtnLoading }"
          },
          {
            "id": "pdm_c14_81",
            "name": "openTeam",
            "lines": 45,
            "event_type": "data: Record<string, string>, table: DppTableComponent",
            "note": "新建库成功 --> 打开团队"
          },
          {
            "id": "pdm_c14_82",
            "name": "sysEditProductLibraryAction",
            "lines": 89,
            "event_type": "event: EventInterface",
            "note": "编辑产品库"
          },
          {
            "id": "pdm_c14_83",
            "name": "generateKeyValuePairs",
            "lines": 7,
            "event_type": "data: | Array<{ label: string; value: string; checked: boolean; }> | string",
            "note": "另存为模板"
          },
          {
            "id": "pdm_c14_84",
            "name": "sysSaveAsTemplateAction",
            "lines": 71,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c14_85",
            "name": "sysTemplateManageAction",
            "lines": 4,
            "event_type": "_event: EventInterface",
            "note": "库模板管理"
          },
          {
            "id": "pdm_c14_86",
            "name": "sysTemplateManageTableSearchAction",
            "lines": 12,
            "event_type": "event: EventInterface",
            "note": "模板搜索"
          },
          {
            "id": "pdm_c14_87",
            "name": "sysTemplateManageEditAction",
            "lines": 75,
            "event_type": "event: EventInterface",
            "note": "编辑模板"
          },
          {
            "id": "pdm_c14_88",
            "name": "onClick",
            "lines": 33,
            "event_type": "formCpn: DppFormComponent"
          },
          {
            "id": "pdm_c14_89",
            "name": "sysTemplateManageTeamAction",
            "lines": 33,
            "event_type": "event: EventInterface",
            "note": "打开团队"
          },
          {
            "id": "pdm_c14_90",
            "name": "sysTMBatchEnableDisableAction",
            "lines": 41,
            "event_type": "event: EventInterface",
            "note": "产品库模板/批量启用、禁用"
          },
          {
            "id": "pdm_c14_91",
            "name": "sysTypeSpectrumAction",
            "lines": 12,
            "event_type": "_event: EventInterface",
            "note": "产品型谱 @use 产品设计一级页面 顶部toolbar @param {EventInterface} _event @memberof ProductDesignEventService"
          },
          {
            "id": "pdm_c14_92",
            "name": "sysProductModOwnerAction",
            "lines": 50,
            "event_type": "event: EventInterface",
            "note": "产品管理 --> 更改所有者"
          },
          {
            "id": "pdm_c14_93",
            "name": "sysOpenMaanageProductAction",
            "lines": 146,
            "event_type": "event: EventInterface",
            "note": "产品管理打开维护产品结构的弹窗"
          },
          {
            "id": "pdm_c14_94",
            "name": "handelGuessSendNotify",
            "lines": 1,
            "event_type": "obj, this.commonService"
          },
          {
            "id": "pdm_c14_95",
            "name": "getObjectData",
            "lines": 12,
            "event_type": "rowData",
            "note": "主要流程：先获取对象数据，然后进行后续操作"
          },
          {
            "id": "pdm_c14_96",
            "name": "mergeObjectDataToParams",
            "lines": 7,
            "event_type": "objectData as Record<string, unknown>",
            "note": "将获取到的对象数据合并到参数中"
          },
          {
            "id": "pdm_c14_97",
            "name": "openMaintainProductModal",
            "lines": 3,
            "event_type": "title, tableDppRender"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f15",
    "project": "PDM",
    "filename": "project.event.ts",
    "groups": [
      {
        "id": "pdm_g15",
        "name": "全部函数",
        "cards": []
      }
    ]
  },
  {
    "id": "pdm_f16",
    "project": "PDM",
    "filename": "public-space.event.ts",
    "groups": [
      {
        "id": "pdm_g16",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c16_0",
            "name": "sysEditFolderAction",
            "lines": 64,
            "event_type": "event: EventInterface",
            "note": "编辑节点"
          },
          {
            "id": "pdm_c16_1",
            "name": "sysNewFolderAction",
            "lines": 67,
            "event_type": "event: EventInterface",
            "note": "添加节点"
          },
          {
            "id": "pdm_c16_2",
            "name": "sysDeleteFolderAction",
            "lines": 16,
            "event_type": "event: EventInterface",
            "note": "删除节点"
          },
          {
            "id": "pdm_c16_3",
            "name": "sysPublicSpaceMoveAction",
            "lines": 95,
            "event_type": "event: EventInterface",
            "note": "@description 移动文件夹 单个 @use 产品设计二级页面｜公共空间| 工艺管理二级页面 @param event"
          },
          {
            "id": "pdm_c16_4",
            "name": "simpleMove",
            "lines": 16
          },
          {
            "id": "pdm_c16_5",
            "name": "openMoveDialog",
            "lines": 3,
            "event_type": "okFn, originFolderID"
          },
          {
            "id": "pdm_c16_6",
            "name": "onClick",
            "lines": 42,
            "event_type": "menu: MenuBaseTreeComponent"
          },
          {
            "id": "pdm_c16_7",
            "name": "sysPublicSpaceBatchMoveAction",
            "lines": 94,
            "event_type": "event: EventInterface",
            "note": "@description 移动文件夹 批量 @use 产品设计二级页面｜公共空间| 工艺管理二级页面 @param event"
          },
          {
            "id": "pdm_c16_8",
            "name": "batchMove",
            "lines": 19
          },
          {
            "id": "pdm_c16_9",
            "name": "openMoveDialog",
            "lines": 3,
            "event_type": "okFn, originFolderID"
          },
          {
            "id": "pdm_c16_10",
            "name": "onClick",
            "lines": 40,
            "event_type": "menu: MenuBaseTreeComponent"
          },
          {
            "id": "pdm_c16_11",
            "name": "cadValueBeforeAction",
            "lines": 3,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c16_12",
            "name": "sysPublicSpaceNewObjectAction",
            "lines": 123,
            "event_type": "event: EventInterface",
            "note": "@description 新建 @use 产品设计二级页面｜公共空间二级页面 @param event"
          },
          {
            "id": "pdm_c16_13",
            "name": "generateFieldMapping",
            "lines": 9,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: choiceMenuObj['origin'], onValueUpdate: (key, value) => { params.data![key] = value; }, isMapToObject: false }"
          },
          {
            "id": "pdm_c16_14",
            "name": "ModifyFolderAction",
            "lines": 94,
            "event_type": "event: EventInterface",
            "note": "********************************sysPublicSpaceNewFolderAction ModifyFolderAction sysPublicSpaceDeleteFolderAction是否可整合为一个？ 公共空间修改文件夹 表格操作栏（文件夹类型）｜产品设计｜产品设计头部产品模版管理页面"
          },
          {
            "id": "pdm_c16_15",
            "name": "sysPublicSpaceDeleteFolderAction",
            "lines": 1,
            "event_type": "event: EventInterface",
            "note": "批量删除文件夹(合并批量删除)"
          },
          {
            "id": "pdm_c16_16",
            "name": "sysNewRoleAction",
            "lines": 92,
            "event_type": "event: EventInterface",
            "note": "********************************团队相关操作（是否可整合为一个？） 新增角色（可批量）"
          },
          {
            "id": "pdm_c16_17",
            "name": "onClick",
            "lines": 46,
            "event_type": "formCpn: DppFormComponent"
          },
          {
            "id": "pdm_c16_18",
            "name": "sysEditRoleAction",
            "lines": 59,
            "event_type": "event: EventInterface",
            "note": "编辑角色"
          },
          {
            "id": "pdm_c16_19",
            "name": "sysAuthorityAction",
            "lines": 33,
            "event_type": "event: EventInterface",
            "note": "角色权限（可批量）"
          },
          {
            "id": "pdm_c16_20",
            "name": "openPermissionDialog",
            "lines": 18,
            "event_type": "roleParams: any, libGuid: { LIBRARYGUID: string; ROLEGUID?: string }, rowData: any",
            "note": "eslint-disable-next-line @typescript-eslint/no-explicit-any"
          },
          {
            "id": "pdm_c16_21",
            "name": "openDialog",
            "lines": 79,
            "event_type": "params: DppSafeAny, listGuid: DppSafeAny, rowData: DppSafeAny"
          },
          {
            "id": "pdm_c16_22",
            "name": "sysCopyTeamAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "复制团队 公共空间-团队-右上角"
          },
          {
            "id": "pdm_c16_23",
            "name": "sysPasteTeamAction",
            "lines": 33,
            "event_type": "event: EventInterface",
            "note": "粘贴团队 公共空间-团队-右上角"
          },
          {
            "id": "pdm_c16_24",
            "name": "sysNewRepositoryAction",
            "lines": 67,
            "event_type": "event: EventInterface",
            "note": "新建存储库"
          },
          {
            "id": "pdm_c16_25",
            "name": "onClick",
            "lines": 27,
            "event_type": "formCpn: DppFormComponent"
          },
          {
            "id": "pdm_c16_26",
            "name": "openTeam",
            "lines": 46,
            "event_type": "data: Record<string, string>, table: DppTableComponent",
            "note": "新建库成功 --> 打开团队"
          },
          {
            "id": "pdm_c16_27",
            "name": "sysEditRepositoryAction",
            "lines": 65,
            "event_type": "event: EventInterface",
            "note": "编辑存储库"
          },
          {
            "id": "pdm_c16_28",
            "name": "sysBatchNewFolderAction",
            "lines": 27,
            "event_type": "event: EventInterface",
            "note": "批量新建文件夹 @usage 1. 产品设计二级页面上方toolbar - 批量新建文件夹 2. 公共空间二级页面上方toolbar - 批量新建文件夹"
          },
          {
            "id": "pdm_c16_29",
            "name": "sysAddFolderAction",
            "lines": 46,
            "event_type": "event: TagOpenEvent",
            "note": "@description 单个新建文件夹操作 @usage 1. 在以下界面中用于“移动”或“新建文件夹”：    - 产品设计二级页面：表格浮动 toolbar、表格操作栏    - 公共空间二级页面：表格浮动 toolbar、表格操作栏    - 实例界面：上方 toolbar 2. 在工作台中用于位置选择后的新建文件夹操作：    - 创建产品 / 设计变更 / 变更请求    - 产品设计/公共空间二级页面新建料"
          },
          {
            "id": "pdm_c16_30",
            "name": "openNewFolderModal",
            "lines": 62,
            "event_type": "event: EventInterface, mode: ModeTypeEnum, saveFn: (formData: any) => Observable<any>, refreshFn: (res: DppResponse<IBatchData>) => void",
            "note": "@description 打开新建文件夹模态框（支持单个/批量） @param event - 触发事件 @param mode - 模式：single | batch @param saveFn - 保存方法（根据模式不同传入不同的服务调用） @param refreshFn - 刷新回调"
          },
          {
            "id": "pdm_c16_31",
            "name": "saveFn",
            "lines": 12,
            "event_type": "formData"
          },
          {
            "id": "pdm_c16_32",
            "name": "refreshFn",
            "lines": 1,
            "event_type": "res"
          },
          {
            "id": "pdm_c16_33",
            "name": "addMembersAction",
            "lines": 53,
            "event_type": "event: TagOpenEvent",
            "note": "添加成员 @use 团队 @param event"
          },
          {
            "id": "pdm_c16_34",
            "name": "delMembersAction",
            "lines": 15,
            "event_type": "event: TagDeleteEvent"
          },
          {
            "id": "pdm_c16_35",
            "name": "sysPasteAction",
            "lines": 1,
            "event_type": "event: EventInterface",
            "note": "粘贴到文件夹/粘贴到对象上"
          },
          {
            "id": "pdm_c16_36",
            "name": "filePreviewAction",
            "lines": 37,
            "event_type": "event: EventInterface",
            "note": "预览 @use 表格主文件列预览 @param event"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f17",
    "project": "PDM",
    "filename": "public.event.ts",
    "groups": [
      {
        "id": "pdm_g17",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c17_0",
            "name": "sysTaskStartAciton",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "@description 启动项目任务 @use 工作台-项目任务"
          },
          {
            "id": "pdm_c17_1",
            "name": "sysTaskPusAciton",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "@description 暂停项目任务 @use 工作台-项目任务"
          },
          {
            "id": "pdm_c17_2",
            "name": "sysTaskCompleteAciton",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "@description 完成项目任务 @use 工作台-项目任务"
          },
          {
            "id": "pdm_c17_3",
            "name": "operateTaskHandle",
            "lines": 19,
            "event_type": "event: EventInterface, type: OperateTaskType"
          },
          {
            "id": "pdm_c17_4",
            "name": "sysOpenBlankHasPMChangeAction",
            "lines": 29,
            "event_type": "event: HasModelEventInterface, config?: BlankInterface",
            "note": "处理包含有项目变更单的跳转函数 @param event"
          },
          {
            "id": "pdm_c17_5",
            "name": "sysOpenDrawerHasPMChangeAction",
            "lines": 32,
            "event_type": "event: HasModelEventInterface, config?: BlankInterface",
            "note": "处理包含有项目变更单的打开抽屉函数 @param event"
          },
          {
            "id": "pdm_c17_6",
            "name": "sysOpenGeneralDrawerAction",
            "lines": 3,
            "event_type": "event: HasModelEventInterface, config?: BlankInterface",
            "note": "通用打开实例抽屉方法（包含打开其他项目） @action 注意！与后端约定，数据中带BASEURI字段，这个字段代表打开的对象属于哪个项目 @param event"
          },
          {
            "id": "pdm_c17_7",
            "name": "sysOpenGeneralBlankAction",
            "lines": 3,
            "event_type": "event: HasModelEventInterface, config?: BlankInterface",
            "note": "通用打开实例页签方法（包含打开其他项目） @action 注意！与后端约定，数据中带BASEURI字段，这个字段代表打开的对象属于哪个项目 @add 添加特殊情况处理specialCaseFn @param event"
          },
          {
            "id": "pdm_c17_8",
            "name": "executeGeneralAction",
            "lines": 18,
            "event_type": "event: HasModelEventInterface, actionFn: (handleConfig: CellClickGeneralCall) => void, config?: BlankInterface",
            "note": "执行一般动作函数 该函数用于处理一个通用动作事件，根据是否提供了特定配置来决定执行的动作 它允许在不修改原有动作函数的情况下，引入特定场景下的特殊处理逻辑 @param event - 事件对象，包含模型事件的相关信息 @param actionFn - 动作函数，当事件触发时会被调用 @param config - 可选的空白配置对象，用于传递额外的配置信息"
          },
          {
            "id": "pdm_c17_9",
            "name": "sysOpenGeneralDrawerFn",
            "lines": 17,
            "event_type": "handleConfig: CellClickGeneralCall",
            "note": "打开系统通用抽屉函数 该函数用于处理点击事件后打开抽屉的操作，根据不同的配置展示不同的内容 @param handleConfig - 包含抽屉配置的对象，包括属性、模型、参数等信息"
          },
          {
            "id": "pdm_c17_10",
            "name": "sysOpenGeneralBlankFn",
            "lines": 23,
            "event_type": "handleConfig: CellClickGeneralCall",
            "note": "打开新窗口的通用函数 该函数用于在点击表格单元格后，根据配置信息打开一个新的窗口或标签页 @param handleConfig 包含打开新窗口所需配置信息的对象"
          },
          {
            "id": "pdm_c17_11",
            "name": "cellClickGeneralAction",
            "lines": 110,
            "event_type": "event: HasModelEventInterface, config?: BlankInterface",
            "note": "单元格点击通用处理 @param event @returns"
          },
          {
            "id": "pdm_c17_12",
            "name": "positionLinkAction",
            "lines": 17,
            "event_type": "event: HasModelEventInterface, data?: Record<string, DppSafeAny>",
            "note": "公用内置位置跳转 @param event @param data"
          },
          {
            "id": "pdm_c17_13",
            "name": "repeatCheck",
            "lines": 58,
            "event_type": "async data: Record<string, DppSafeAny>",
            "note": "字段重复校验"
          },
          {
            "id": "pdm_c17_14",
            "name": "resolve",
            "lines": 7,
            "event_type": "false"
          },
          {
            "id": "pdm_c17_15",
            "name": "resolve",
            "lines": 12,
            "event_type": "true"
          },
          {
            "id": "pdm_c17_16",
            "name": "openRepeatModel",
            "lines": 2,
            "event_type": "res.data, resolve",
            "note": "打开重复提示框"
          },
          {
            "id": "pdm_c17_17",
            "name": "resolve",
            "lines": 193,
            "event_type": "true"
          },
          {
            "id": "pdm_c17_18",
            "name": "resolve",
            "lines": 150,
            "event_type": "false"
          },
          {
            "id": "pdm_c17_19",
            "name": "resolve",
            "lines": 11,
            "event_type": "false"
          },
          {
            "id": "pdm_c17_20",
            "name": "repeatCheck$",
            "lines": 24,
            "event_type": "data: Record<string, any>"
          },
          {
            "id": "pdm_c17_21",
            "name": "openRepeatModel",
            "lines": 47,
            "event_type": "dataList: Array<Record<string, any>>, data: Record<string, any>"
          },
          {
            "id": "pdm_c17_22",
            "name": "hasClassRepeatCheck",
            "lines": 10,
            "event_type": "async data: IFoundaton, specialCallback?: (data: IFoundaton) => void",
            "note": "处理repeat字段校验（公用提取） @param data @param specialCallback @returns"
          },
          {
            "id": "pdm_c17_23",
            "name": "specialCallback",
            "lines": 8,
            "event_type": "data"
          },
          {
            "id": "pdm_c17_24",
            "name": "hasClassRepeatCheck$",
            "lines": 10,
            "event_type": "data: IFoundaton, specialCallback?: (data: IFoundaton) => void"
          },
          {
            "id": "pdm_c17_25",
            "name": "specialCallback",
            "lines": 17,
            "event_type": "data"
          },
          {
            "id": "pdm_c17_26",
            "name": "cadConfigHandle",
            "lines": 27,
            "event_type": "config: CadConfigHandleParams"
          },
          {
            "id": "pdm_c17_27",
            "name": "getAsyncCadConfig",
            "lines": 16
          },
          {
            "id": "pdm_c17_28",
            "name": "resolve",
            "lines": 2,
            "event_type": "res.data as CadConfig"
          },
          {
            "id": "pdm_c17_29",
            "name": "resolve",
            "lines": 1,
            "event_type": "{} as CadConfig"
          },
          {
            "id": "pdm_c17_30",
            "name": "reject",
            "lines": 28,
            "event_type": "err"
          },
          {
            "id": "pdm_c17_31",
            "name": "sysNewObjectAndCADAction",
            "lines": 66,
            "event_type": "event: EventInterface",
            "note": "（料+CAD）创建事件 @param event"
          },
          {
            "id": "pdm_c17_32",
            "name": "generateFieldMapping",
            "lines": 9,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: choiceMenuObj['origin'], onValueUpdate: (key, value) => { render.data![key] = value; }, isMapToObject: false }"
          },
          {
            "id": "pdm_c17_33",
            "name": "sysNewItemCADTDCheckedAction",
            "lines": 16,
            "event_type": "event: EventInterface",
            "note": "CAD图档勾选事件 @param event"
          },
          {
            "id": "pdm_c17_34",
            "name": "sysNewItemCADTDAddAction",
            "lines": 42,
            "event_type": "event: EventInterface",
            "note": "添加特定页签事件 @param event"
          },
          {
            "id": "pdm_c17_35",
            "name": "generateFieldMapping",
            "lines": 8,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: formComData, onValueUpdate: (key, value) => { readyData[key] = value; } }"
          },
          {
            "id": "pdm_c17_36",
            "name": "sysNewItemCADTDDeleteAciton",
            "lines": 7,
            "event_type": "event: EventInterface",
            "note": "移除特定页签事件 @param event"
          },
          {
            "id": "pdm_c17_37",
            "name": "sysNewItemPreviousPageAction",
            "lines": 16,
            "event_type": "event: EventInterface",
            "note": "新建物料上一步 @param event"
          },
          {
            "id": "pdm_c17_38",
            "name": "sysNewItemNextPageAction",
            "lines": 37,
            "event_type": "event: EventInterface",
            "note": "新建物料下一步 @param event @returns"
          },
          {
            "id": "pdm_c17_39",
            "name": "sysNewItemCompleteEcoAction",
            "lines": 3,
            "event_type": "event: EventInterface, options?: { openObject?: boolean; refreshTable?: boolean; isRepeat?: boolean }",
            "note": "新建物料完成事件 @param event @param options 里面的内容不能乱加！！！！！！！！！！！！！！！！！！！！！！"
          },
          {
            "id": "pdm_c17_40",
            "name": "handleValidationError",
            "lines": 10,
            "event_type": "wizardCom.getWizardData().currentIndex"
          },
          {
            "id": "pdm_c17_41",
            "name": "handleError",
            "lines": 19,
            "event_type": "error, button"
          },
          {
            "id": "pdm_c17_42",
            "name": "sysNewProductCommonAction",
            "lines": 48,
            "event_type": "event: EventInterface",
            "note": "创建产品 @use 产品设计 | 场景入口 @param event @returns"
          },
          {
            "id": "pdm_c17_43",
            "name": "sysNewProductCompleteAction",
            "lines": 121,
            "event_type": "event: EventInterface",
            "note": "创建产品 确认事件 @use 产品设计 | 场景入口| @param event @returns"
          },
          {
            "id": "pdm_c17_44",
            "name": "sysJumpToLatestInstance",
            "lines": 12,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c17_45",
            "name": "_comboRepeatCadParams",
            "lines": 41,
            "event_type": "cardFormData: IFoundaton, cardFormOriginData: IFoundaton",
            "note": "组合cad重复参数 @param cardFormData @param cardFormOriginData @returns"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f18",
    "project": "PDM",
    "filename": "query-instance.event.ts",
    "groups": [
      {
        "id": "pdm_g18",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c18_0",
            "name": "SearchAction",
            "lines": 17,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c18_1",
            "name": "BatchDownLoad",
            "lines": 1,
            "event_type": "event: EventInterface",
            "note": "批量下载"
          },
          {
            "id": "pdm_c18_2",
            "name": "BatchExport",
            "lines": 1,
            "event_type": "event: EventInterface",
            "note": "批量导出"
          },
          {
            "id": "pdm_c18_3",
            "name": "BomCompare",
            "lines": 29,
            "event_type": "event: EventInterface",
            "note": "BOM比较"
          },
          {
            "id": "pdm_c18_4",
            "name": "CadCompare",
            "lines": 29,
            "event_type": "event: EventInterface",
            "note": "图纸比较"
          },
          {
            "id": "pdm_c18_5",
            "name": "sysBatchErrorShowAction",
            "lines": 1,
            "event_type": "event: EventInterface",
            "note": "批量错误展示"
          },
          {
            "id": "pdm_c18_6",
            "name": "AdvanceSearchAction",
            "lines": 77,
            "event_type": "event: EventInterface",
            "note": "高级搜索"
          },
          {
            "id": "pdm_c18_7",
            "name": "ChatfileAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "chatfile"
          },
          {
            "id": "pdm_c18_8",
            "name": "sysExportERPAction",
            "lines": 43,
            "event_type": "event: EventInterface",
            "note": "// 打开新增零部件 （待完善） sysNewObjectAction(event: EventInterface): void {} 导出至ERP"
          },
          {
            "id": "pdm_c18_9",
            "name": "sysOpenImgAction",
            "lines": 1,
            "event_type": "event: EventInterface",
            "note": "打开图片事件"
          },
          {
            "id": "pdm_c18_10",
            "name": "mainObjectAction",
            "lines": 1,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c18_11",
            "name": "sysModelPreviewAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "模型预览事件 @param {EventInterface} event @memberof QueryInstanceEventService"
          },
          {
            "id": "pdm_c18_12",
            "name": "sysRowClickPreciewAction",
            "lines": 15,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c18_13",
            "name": "sysFilePreviewAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "表格操作列预览事件 @param {EventInterface} event @memberof QueryInstanceEventService"
          },
          {
            "id": "pdm_c18_14",
            "name": "sysDownloadPicAction",
            "lines": 26,
            "event_type": "event: any",
            "note": "表格操作列下载图 @param {EventInterface} event @memberof QueryInstanceEventService"
          },
          {
            "id": "pdm_c18_15",
            "name": "sysFileDownloadAction",
            "lines": 46,
            "event_type": "event: EventInterface",
            "note": "表格操作列下载事件 @param {EventInterface} event @memberof QueryInstanceEventService"
          },
          {
            "id": "pdm_c18_16",
            "name": "sysFileBatchUploadAciton",
            "lines": 32,
            "event_type": "event: EventInterface",
            "note": "批量下载 @param {EventInterface} event @memberof QueryInstanceEventService"
          },
          {
            "id": "pdm_c18_17",
            "name": "sysApproveAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "审批  =》 提交发布流程"
          },
          {
            "id": "pdm_c18_18",
            "name": "openListFileFn",
            "lines": 27,
            "event_type": "event: EventInterface",
            "note": "打开文件列表  @deprecated 无人调用"
          },
          {
            "id": "pdm_c18_19",
            "name": "sysUploadCADAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "上传图纸 =》上传文件"
          },
          {
            "id": "pdm_c18_20",
            "name": "autoModalOk",
            "lines": 8,
            "event_type": "event: AutoModalFooterInterface",
            "note": "自动打开模态框的确定事件"
          },
          {
            "id": "pdm_c18_21",
            "name": "handelGuessWork",
            "lines": 8,
            "event_type": "data: IFoundaton, bs: () => IBaseContentComponent"
          },
          {
            "id": "pdm_c18_22",
            "name": "handelGuessSendNotify",
            "lines": 5,
            "event_type": "obj, this.commonService"
          },
          {
            "id": "pdm_c18_23",
            "name": "autoModalCancel",
            "lines": 3,
            "event_type": "event: AutoModalFooterInterface",
            "note": "自动打开模态框的取消事件"
          },
          {
            "id": "pdm_c18_24",
            "name": "autoModalReset",
            "lines": 3,
            "event_type": "event: AutoModalFooterInterface",
            "note": "自动打开模态框的重置事件"
          },
          {
            "id": "pdm_c18_25",
            "name": "sysBOMExportAction",
            "lines": 139,
            "event_type": "event: EventInterface",
            "note": "导出bom-bom页签更多操作里 @param event"
          },
          {
            "id": "pdm_c18_26",
            "name": "onClick",
            "lines": 57,
            "event_type": "form: DppFormComponent"
          },
          {
            "id": "pdm_c18_27",
            "name": "sysOpenReplaceDrawer",
            "lines": 8,
            "event_type": "event: EventInterface, config?: OpenReplaceConfig",
            "note": "替代查看抽屉"
          },
          {
            "id": "pdm_c18_28",
            "name": "sysOpenTDDrawer",
            "lines": 65,
            "event_type": "event: EventInterface, config?: OpenReplaceConfig",
            "note": "@description 替代查看抽屉-替代料 @use bom  | 维护产品结构"
          },
          {
            "id": "pdm_c18_29",
            "name": "sysOpenQDDrawer",
            "lines": 24,
            "event_type": "event: EventInterface, config?: OpenReplaceConfig"
          },
          {
            "id": "pdm_c18_30",
            "name": "sysOpenReplaceDrawer_",
            "lines": 27,
            "event_type": "event: EventInterface",
            "note": "替代查看抽屉 @param event"
          },
          {
            "id": "pdm_c18_31",
            "name": "sysOpenTDDrawer_",
            "lines": 11,
            "event_type": "property: Property, dParams: Record<string, DppSafeAny>"
          },
          {
            "id": "pdm_c18_32",
            "name": "sysOpenQDDrawer_",
            "lines": 11,
            "event_type": "property: Property, dParams: Record<string, DppSafeAny>"
          },
          {
            "id": "pdm_c18_33",
            "name": "sysOpenViewComprehensiveOverviewDownloadAction",
            "lines": 86,
            "event_type": "event: EventInterface",
            "note": "打开综合视图批量下载弹窗"
          },
          {
            "id": "pdm_c18_34",
            "name": "onClick",
            "lines": 36,
            "event_type": "pageCpm: DppPageComponent"
          },
          {
            "id": "pdm_c18_35",
            "name": "sysViewComprehensiveSaveConfigAction",
            "lines": 24,
            "event_type": "event: EventInterface",
            "note": "综合视图 -->被物料关联对象保存设置"
          },
          {
            "id": "pdm_c18_36",
            "name": "sysStartDonwloadAction",
            "lines": 25,
            "event_type": "event: EventInterface",
            "note": "产品设计——>下载单个对象的附件"
          },
          {
            "id": "pdm_c18_37",
            "name": "sysOpenBatchDonwloadAction",
            "lines": 89,
            "event_type": "event: EventInterface",
            "note": "产品设计——>批量下载"
          },
          {
            "id": "pdm_c18_38",
            "name": "onClick",
            "lines": 27,
            "event_type": "pageCpm: DppPageComponent"
          },
          {
            "id": "pdm_c18_39",
            "name": "sysProductSaveConfigAction",
            "lines": 26,
            "event_type": "event: EventInterface",
            "note": "产品设计——>被物料关联对象保存设置"
          },
          {
            "id": "pdm_c18_40",
            "name": "sysBOMBatchDownloadAction",
            "lines": 90,
            "event_type": "event: EventInterface",
            "note": "BOM对象批量下载"
          },
          {
            "id": "pdm_c18_41",
            "name": "onClick",
            "lines": 34,
            "event_type": "pageCpm: DppPageComponent"
          },
          {
            "id": "pdm_c18_42",
            "name": "sysNewOutFileBatchDownloadAction",
            "lines": 30,
            "event_type": "event: EventInterface"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f19",
    "project": "PDM",
    "filename": "substitute-new.event.ts",
    "groups": [
      {
        "id": "pdm_g19",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c19_0",
            "name": "sysBRSPartNewlyBuiltAction",
            "lines": 77,
            "event_type": "event: EventInterface, params?: Record<string, DppSafeAny>",
            "note": "替代查看-局部替代-新增按钮 @param event"
          },
          {
            "id": "pdm_c19_1",
            "name": "setLoading",
            "lines": 40,
            "event_type": "true"
          },
          {
            "id": "pdm_c19_2",
            "name": "setLoading",
            "lines": 3,
            "event_type": "false"
          },
          {
            "id": "pdm_c19_3",
            "name": "setLoading",
            "lines": 36,
            "event_type": "false"
          },
          {
            "id": "pdm_c19_4",
            "name": "sysBRSPartTakeEffectAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "替代查看-局部替代-生效筛选 @param event"
          },
          {
            "id": "pdm_c19_5",
            "name": "sysBRSPartDelAction",
            "lines": 29,
            "event_type": "event: EventInterface",
            "note": "替代查看-局部替代-删除按钮 @param event @param data"
          },
          {
            "id": "pdm_c19_6",
            "name": "sysBRSPartPatchDelAction",
            "lines": 35,
            "event_type": "event: EventInterface, data?: Record<string, DppSafeAny>",
            "note": "替代查看-局部替代-批量删除按钮 @param event @param data"
          },
          {
            "id": "pdm_c19_7",
            "name": "sysBRSPartRowAction",
            "lines": 20,
            "event_type": "event: CellSaveEvent",
            "note": "替代查看-局部替代-日期编辑 @param event @returns"
          },
          {
            "id": "pdm_c19_8",
            "name": "sysSubItemBatchEditEffectiveDateAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "替代查看-局部替代-生效日期批量编辑 @param event @returns"
          },
          {
            "id": "pdm_c19_9",
            "name": "sysSubItemBatchEditExpirationDateAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "失效日期批量编辑"
          },
          {
            "id": "pdm_c19_10",
            "name": "_sysSubItemBatchEditDateAction",
            "lines": 82,
            "event_type": "event: EventInterface, dateType: 'effective' | 'expiration'",
            "note": "替代查看-局部替代-日期批量编辑 @param event @param dateType 'effective' 或 'expiration' @returns"
          },
          {
            "id": "pdm_c19_11",
            "name": "confirmBtn",
            "lines": 29,
            "event_type": "formCpn"
          },
          {
            "id": "pdm_c19_12",
            "name": "sysBRSWholeNewlyBuiltAction",
            "lines": 41,
            "event_type": "event: EventInterface",
            "note": "替代查看-全局替代-新增按钮 @param event"
          },
          {
            "id": "pdm_c19_13",
            "name": "generateFieldMapping",
            "lines": 9,
            "event_type": "{ mappingType: 'folder', fieldKey: 'END2#COMMITFOLDER$', sourceData: data, onValueUpdate: (key, value) => { sendData[key] = value; sendData[key?.split('#')[1]] = value; } }"
          },
          {
            "id": "pdm_c19_14",
            "name": "sysWholeModifyAction",
            "lines": 44,
            "event_type": "event: EventInterface, config?: WholeModifyConfig",
            "note": "替代查看-全局替代-修改"
          },
          {
            "id": "pdm_c19_15",
            "name": "generateFieldMapping",
            "lines": 8,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: { ...dParams, ...data, ...(config || {}) }, onValueUpdate: (key, value) => { sendData[key] = value; } }"
          },
          {
            "id": "pdm_c19_16",
            "name": "sysWholeBatchModifyAction",
            "lines": 51,
            "event_type": "event: EventInterface, config?: WholeModifyConfig",
            "note": "替代查看-全局替代-批量修改"
          },
          {
            "id": "pdm_c19_17",
            "name": "generateFieldMapping",
            "lines": 8,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: { ...dParams, ...(config || {}) }, onValueUpdate: (key, value) => { paramsData[key] = value; } }"
          },
          {
            "id": "pdm_c19_18",
            "name": "generateFieldMapping",
            "lines": 9,
            "event_type": "{ mappingType: 'folder', fieldKey: 'END2#COMMITFOLDER$', sourceData: { ...dParams }, onValueUpdate: (key, value) => { paramsData[key] = value; paramsData[key?.split('#')[1]] = value; } }"
          },
          {
            "id": "pdm_c19_19",
            "name": "sysBRSWholeTakeEffectAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "替代查看-全局替代-生效筛选 @param event"
          },
          {
            "id": "pdm_c19_20",
            "name": "sysSubOpenDrawerAction",
            "lines": 9,
            "event_type": "event: HasModelEventInterface",
            "note": "替代查看-主物料-名称列 @param event"
          },
          {
            "id": "pdm_c19_21",
            "name": "sysBRSReplaceApplyForAction",
            "lines": 39,
            "event_type": "event: EventInterface",
            "note": "替代申请打开弹窗按钮 @param event @use bom表格操作列-替代申请按钮"
          },
          {
            "id": "pdm_c19_22",
            "name": "generateFieldMapping",
            "lines": 11,
            "event_type": "{ mappingType: 'folder', fieldKey: 'END2#COMMITFOLDER$', sourceData: data, onValueUpdate: (key, value) => { sendData[key] = value; if (key.includes('END2')) { sendData[key.replace('END2#', ''"
          },
          {
            "id": "pdm_c19_23",
            "name": "sysBRSCompleteAction",
            "lines": 9,
            "event_type": "event: EventInterface, options?: { openObject?: boolean; refreshTable?: boolean; isRepeat?: boolean; fromType: string; dppRenderData: Record<string, DppSafeAny>; }",
            "note": "替代申请单新建物料完成事件（复制自sysNewItemCompleteEcoAction） @param event @param options Copy in sysNewItemCompleteEcoAction"
          },
          {
            "id": "pdm_c19_24",
            "name": "handleValidationError",
            "lines": 5,
            "event_type": "wizardCom.getWizardData().currentIndex"
          },
          {
            "id": "pdm_c19_25",
            "name": "handleSingleFormFlow",
            "lines": 2
          },
          {
            "id": "pdm_c19_26",
            "name": "handleError",
            "lines": 18,
            "event_type": "error, button"
          },
          {
            "id": "pdm_c19_27",
            "name": "sysBRSApplyForPreviousAction",
            "lines": 3,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c19_28",
            "name": "sysBRSApplyForNextAction",
            "lines": 9,
            "event_type": "event: EventInterface",
            "note": "创建申请单-下一步 @param event"
          },
          {
            "id": "pdm_c19_29",
            "name": "sysBRSApplyForCompleteAction",
            "lines": 27,
            "event_type": "event: EventInterface",
            "note": "替代申请弹窗-完成按钮 @param event"
          },
          {
            "id": "pdm_c19_30",
            "name": "handlePartType",
            "lines": 17,
            "event_type": "event: EventInterface, saveObject$: Observable<IFoundaton>, wizardCom: DppWizardComponent",
            "note": "处理 part 类型的逻辑 @param saveObject$ @param event @param wizardCom"
          },
          {
            "id": "pdm_c19_31",
            "name": "jumpFn",
            "lines": 17,
            "event_type": "data"
          },
          {
            "id": "pdm_c19_32",
            "name": "handleGlobalModifyType",
            "lines": 14,
            "event_type": "event: EventInterface, saveObject$: Observable<IBatchData>, wizardCom: DppWizardComponent",
            "note": "处理 globalModify 类型的逻辑 @param saveObject$ @param chocieArr"
          },
          {
            "id": "pdm_c19_33",
            "name": "handleDefaultType",
            "lines": 12,
            "event_type": "saveObject$: Observable<any>",
            "note": "处理默认类型的逻辑 @param saveObject$"
          },
          {
            "id": "pdm_c19_34",
            "name": "sysBRSDRMQueryAfterAction",
            "lines": 32,
            "event_type": "event: EventInterface",
            "note": "主件加载完后联动替代件 @param event"
          },
          {
            "id": "pdm_c19_35",
            "name": "sysBRSDRMRowAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "主件点击行事件联动替代件 @param event"
          },
          {
            "id": "pdm_c19_36",
            "name": "sysBRSAFDMAddAction",
            "lines": 53,
            "event_type": "event: EventInterface",
            "note": "主件新增按钮 @param event"
          },
          {
            "id": "pdm_c19_37",
            "name": "confirmBtn",
            "lines": 26,
            "event_type": "globalSearch"
          },
          {
            "id": "pdm_c19_38",
            "name": "sysBRSAFDMAddMainAction",
            "lines": 19,
            "event_type": "config: BRSAFDMAddMain",
            "note": "主件新增按钮-从主件 @param event"
          },
          {
            "id": "pdm_c19_39",
            "name": "sysBRSMainComSearchAction",
            "lines": 17,
            "event_type": "event: EventInterface",
            "note": "从主件-新增元件搜索 @param event @returns"
          },
          {
            "id": "pdm_c19_40",
            "name": "sysBRSDRRowEditAction",
            "lines": 9,
            "event_type": "event: RowSaveEvent",
            "note": "替代关系新增行事件-根据类型区分为添加和修改 @param event @returns"
          },
          {
            "id": "pdm_c19_41",
            "name": "sysBRSSubRowAction",
            "lines": 36,
            "event_type": "event: CellSaveEvent",
            "note": "替代关系行编辑事件 @param event @returns"
          },
          {
            "id": "pdm_c19_42",
            "name": "sysBRSDRRowAddAction",
            "lines": 51,
            "event_type": "event: RowSaveEvent",
            "note": "替代关系行编辑-新增类型 @param event @returns"
          },
          {
            "id": "pdm_c19_43",
            "name": "sysBRSDRRowModifyAction",
            "lines": 11,
            "event_type": "event: RowSaveEvent",
            "note": "替代关系行编辑-修改类型 @param event @returns"
          },
          {
            "id": "pdm_c19_44",
            "name": "sysBRSAFDMRemoveCheckAction",
            "lines": 31,
            "event_type": "event: EventInterface, data?: IBaseData, callBack?: (res: DppResponse<IBatchData<IBatchDataDetails>>) => void",
            "note": "主件-opt-移除按钮 @param event"
          },
          {
            "id": "pdm_c19_45",
            "name": "sysBRSAFDMPatchRemoveCheckAction",
            "lines": 7,
            "event_type": "event: EventInterface, data?: IBaseData",
            "note": "主件-float-移除按钮 @param event @param data"
          },
          {
            "id": "pdm_c19_46",
            "name": "sysBRSAFDRRemoveCheckAction",
            "lines": 12,
            "event_type": "event: EventInterface",
            "note": "替代关系-opt-移除按钮(从主件) @param event"
          },
          {
            "id": "pdm_c19_47",
            "name": "sysBRSAFDRPatchRemoveCheckAction",
            "lines": 39,
            "event_type": "event: EventInterface",
            "note": "替代关系-float-移除按钮(从主件) @param event @param data"
          },
          {
            "id": "pdm_c19_48",
            "name": "sysBRSDRMComQueryAfterAction",
            "lines": 31,
            "event_type": "event: EventInterface",
            "note": "替代件加载完后联动主件 @param event"
          },
          {
            "id": "pdm_c19_49",
            "name": "sysBRSDRMComRowAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "替代件点击行事件联动主件 @param event"
          },
          {
            "id": "pdm_c19_50",
            "name": "sysBRSSubRelationSearchAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "替代关系筛选 @use 替代申请单-从元件-修改-元件表格-替代件 @param event"
          },
          {
            "id": "pdm_c19_51",
            "name": "sysBRSAFDMAddComAction",
            "lines": 80,
            "event_type": "event: EventInterface",
            "note": "主件新增按钮-从元件 @param event"
          },
          {
            "id": "pdm_c19_52",
            "name": "confirmBtn",
            "lines": 23,
            "event_type": "table"
          },
          {
            "id": "pdm_c19_53",
            "name": "sysBRSAFDMAddComSearchAction",
            "lines": 17,
            "event_type": "event: EventInterface",
            "note": "从元件-新增元件搜索 @param event @returns"
          },
          {
            "id": "pdm_c19_54",
            "name": "sysBRSAFDMComRemoveCheckAction",
            "lines": 15,
            "event_type": "event: EventInterface, data?: RowNode[]",
            "note": "主件-opt-移除按钮(从元件) @param event"
          },
          {
            "id": "pdm_c19_55",
            "name": "sysBRSAFDMComPatchRemoveCheckAction",
            "lines": 15,
            "event_type": "event: EventInterface, data?: RowNode[]",
            "note": "主件-float-移除按钮(从元件) @param event @param data"
          },
          {
            "id": "pdm_c19_56",
            "name": "sysBRSAFDRRemoveComCheckAction",
            "lines": 12,
            "event_type": "event: EventInterface",
            "note": "替代关系-opt-移除按钮(从元件) @param event"
          },
          {
            "id": "pdm_c19_57",
            "name": "sysBRSAFDRPatchComRemoveCheckAction",
            "lines": 40,
            "event_type": "event: EventInterface",
            "note": "替代关系-float-移除按钮(从元件) @param event @param data"
          },
          {
            "id": "pdm_c19_58",
            "name": "sysBRSAFDRRemoveGlobalCheckAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "替代关系-opt-移除按钮(从元件) @param event"
          },
          {
            "id": "pdm_c19_59",
            "name": "sysBRSAFDRPatchGlobalRemoveCheckAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "替代关系-float-移除按钮(从元件) @param event @param data"
          },
          {
            "id": "pdm_c19_60",
            "name": "sysBRSDetailFormCheckInAction",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "详情-检入 @param event"
          },
          {
            "id": "pdm_c19_61",
            "name": "sysBRSDetailFormCheckOutAction",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "详情-检出 @param event"
          },
          {
            "id": "pdm_c19_62",
            "name": "sysBRSDetailFormCancelCheckOutAction",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "详情-取消检出 @param event"
          },
          {
            "id": "pdm_c19_63",
            "name": "sysBRSDetailFormSaveAction",
            "lines": 4,
            "event_type": "event: EventInterface",
            "note": "详情-保存 @param event"
          },
          {
            "id": "pdm_c19_64",
            "name": "sysBRSDetailRightTopImportCheckAction",
            "lines": 30,
            "event_type": "event: EventInterface",
            "note": "导入并检查 @param event"
          },
          {
            "id": "pdm_c19_65",
            "name": "sysBRSDetailRightTopExportTableAction",
            "lines": 28,
            "event_type": "event: EventInterface",
            "note": "导出编辑表 @param event"
          },
          {
            "id": "pdm_c19_66",
            "name": "sysInstanceBRSWholeNewlyBuiltAction",
            "lines": 39,
            "event_type": "event: EventInterface",
            "note": "替代查看-全局替代-新增按钮-单页签 @param event"
          },
          {
            "id": "pdm_c19_67",
            "name": "generateFieldMapping",
            "lines": 9,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: instanceData, onValueUpdate: (key, value) => { data[key] = value; data[`END2#${key}`] = value; } }"
          },
          {
            "id": "pdm_c19_68",
            "name": "fetchAndProcessOptions",
            "lines": 35,
            "event_type": "config: BRSApplyForConfig",
            "note": "请求接口并处理数据 @param action @param data @param tableCom"
          },
          {
            "id": "pdm_c19_69",
            "name": "applyForInitDefault",
            "lines": 3
          },
          {
            "id": "pdm_c19_70",
            "name": "sysWholeModifyInstanceAction",
            "lines": 10,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c19_71",
            "name": "sysWholeBatchModifyInstanceAction",
            "lines": 10,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c19_72",
            "name": "_bRSAFDRRemoveCheckAction",
            "lines": 26,
            "event_type": "event: EventInterface, callBack?: (table: DppTableComponent) => void",
            "note": "#endregion"
          },
          {
            "id": "pdm_c19_73",
            "name": "_bRSAFDMPatchRemoveCheckAction",
            "lines": 39,
            "event_type": "event: EventInterface, data?: IBaseData, callBack?: (table: DppTableComponent) => void"
          },
          {
            "id": "pdm_c19_74",
            "name": "sysBomViewWithItemAction",
            "lines": 11,
            "event_type": "event: CellSaveEvent"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f20",
    "project": "PDM",
    "filename": "substitute.event.ts",
    "groups": [
      {
        "id": "pdm_g20",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c20_0",
            "name": "sysReplaceSchemeAddAction",
            "lines": 118,
            "event_type": "event: EventInterface",
            "note": "替代方案新增"
          },
          {
            "id": "pdm_c20_1",
            "name": "onClick",
            "lines": 74,
            "event_type": "formCpn: DppFormComponent"
          },
          {
            "id": "pdm_c20_2",
            "name": "sysReplaceProgrammeDeleteAction",
            "lines": 16,
            "event_type": "event: EventInterface",
            "note": "替代方案表格操作列删除"
          },
          {
            "id": "pdm_c20_3",
            "name": "sysReplaceSchemeBatchDeleteAction",
            "lines": 26,
            "event_type": "event: EventInterface",
            "note": "替代方案批量删除"
          },
          {
            "id": "pdm_c20_4",
            "name": "sysRepScheTableSaveAsAction",
            "lines": 72,
            "event_type": "event: EventInterface",
            "note": "替代方案另存为（table）"
          },
          {
            "id": "pdm_c20_5",
            "name": "onClick",
            "lines": 3
          },
          {
            "id": "pdm_c20_6",
            "name": "sysMainItemAddAction",
            "lines": 51,
            "event_type": "event: EventInterface",
            "note": "新增主物料"
          },
          {
            "id": "pdm_c20_7",
            "name": "editMainItemQuantity",
            "lines": 42,
            "event_type": "event: CellSaveEvent",
            "note": "编辑主物料用量"
          },
          {
            "id": "pdm_c20_8",
            "name": "sysReferenceMainItemAction",
            "lines": 99,
            "event_type": "event: EventInterface",
            "note": "参考主物料"
          },
          {
            "id": "pdm_c20_9",
            "name": "sysNewReplaceItemGroupAction",
            "lines": 49,
            "event_type": "event: EventInterface",
            "note": "新增替代物料组 @author: lsp @modify: 陈龙 2025-01-02 修改添加后的表格刷新，优化添加逻辑"
          },
          {
            "id": "pdm_c20_10",
            "name": "setLoading",
            "lines": 6,
            "event_type": "true"
          },
          {
            "id": "pdm_c20_11",
            "name": "setLoading",
            "lines": 56,
            "event_type": "false"
          },
          {
            "id": "pdm_c20_12",
            "name": "setLoading",
            "lines": 48,
            "event_type": "false"
          },
          {
            "id": "pdm_c20_13",
            "name": "sysOpenGlobalSearchAction",
            "lines": 96,
            "event_type": "event: EventInterface",
            "note": "新增替代物料组｜行操作上的添加 --> 打开高级搜索 @author: lsp @modify: 陈龙 2025-01-02 修改添加后的表格刷新，优化添加逻辑"
          },
          {
            "id": "pdm_c20_14",
            "name": "setLoading",
            "lines": 6,
            "event_type": "true"
          },
          {
            "id": "pdm_c20_15",
            "name": "setLoading",
            "lines": 32,
            "event_type": "false"
          },
          {
            "id": "pdm_c20_16",
            "name": "setLoading",
            "lines": 15,
            "event_type": "false"
          },
          {
            "id": "pdm_c20_17",
            "name": "onClick",
            "lines": 7,
            "event_type": "globalSearch: DppGlobalSearchComponent"
          },
          {
            "id": "pdm_c20_18",
            "name": "onConfirm",
            "lines": 76,
            "event_type": "globalSearch, modal, setLoading"
          },
          {
            "id": "pdm_c20_19",
            "name": "createEnd2Param",
            "lines": 23,
            "event_type": "item: any, props: { [key: string]: string }",
            "note": "编辑替代物料组表格"
          },
          {
            "id": "pdm_c20_20",
            "name": "sysEditSubItemTableAction",
            "lines": 67,
            "event_type": "event: CellSaveEvent",
            "note": "编辑替代物料组表格  优先级｜用量｜生效｜失效  用量： 编辑当前行，其他行不改变  优先级｜生效｜失效： 同一优先级的所有行都改变 @author: lsp @modify: 陈龙 2025-01-02 修改编辑后的表格刷新，优化编辑逻辑"
          },
          {
            "id": "pdm_c20_21",
            "name": "isEmptyEdit",
            "lines": 3,
            "event_type": "editData: object",
            "note": "检查编辑数据是否为空"
          },
          {
            "id": "pdm_c20_22",
            "name": "buildEditProps",
            "lines": 9,
            "event_type": "editData: object",
            "note": "构建编辑属性"
          },
          {
            "id": "pdm_c20_23",
            "name": "isDateField",
            "lines": 3,
            "event_type": "key: string",
            "note": "判断是否为日期字段"
          },
          {
            "id": "pdm_c20_24",
            "name": "getRowsToUpdate",
            "lines": 15,
            "event_type": "editedColumn: string, rowData: any, event: CellSaveEvent",
            "note": "获取需要更新的行数据"
          },
          {
            "id": "pdm_c20_25",
            "name": "buildRequestParams",
            "lines": 9,
            "event_type": "rowData: any, rowsToUpdate: any[], props: Record<string, string>",
            "note": "构建请求参数"
          },
          {
            "id": "pdm_c20_26",
            "name": "sysUsedBOMAddAction",
            "lines": 110,
            "event_type": "event: EventInterface",
            "note": "被用在BOM新增"
          },
          {
            "id": "pdm_c20_27",
            "name": "sysReplaceViewAction",
            "lines": 33,
            "event_type": "event: EventInterface",
            "note": "替代查看"
          },
          {
            "id": "pdm_c20_28",
            "name": "sysReplaceSettingAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "替代设置"
          },
          {
            "id": "pdm_c20_29",
            "name": "replaceSetSaveAs",
            "lines": 144,
            "event_type": "event: EventInterface",
            "note": "替代设置-另存"
          },
          {
            "id": "pdm_c20_30",
            "name": "replaceSetUpdate",
            "lines": 127,
            "event_type": "event: EventInterface",
            "note": "替代设置-新增"
          },
          {
            "id": "pdm_c20_31",
            "name": "areAllElementsEqual",
            "lines": 4,
            "event_type": "arr: number[]"
          },
          {
            "id": "pdm_c20_32",
            "name": "sysReplaceSettingBatchAction",
            "lines": 131,
            "event_type": "event: EventInterface",
            "note": "替代设置（批量）"
          },
          {
            "id": "pdm_c20_33",
            "name": "sysMainItemRemoveAction",
            "lines": 32,
            "event_type": "event: EventInterface",
            "note": "主物料表格移除"
          },
          {
            "id": "pdm_c20_34",
            "name": "sysMainItemBatchRemoveAction",
            "lines": 51,
            "event_type": "event: EventInterface",
            "note": "主物料表格批量移除"
          },
          {
            "id": "pdm_c20_35",
            "name": "sysReplaceItemRemoveAction",
            "lines": 73,
            "event_type": "event: EventInterface",
            "note": "替代物料表格移除 1. 点的是替代主料的移除   需要根据PRIORITY和ISKEYITEM来判断,并把该组的第二条数据自动设为替代主料 2. 点的是替代物料组下的移除   直接移除 @author: lsp @modifier: 陈龙 2025-01-02 已经移除了主料辅料的概念，直接移除就可以 目前的expression没有传入node, 所以还需要设置属性标记为第一个"
          },
          {
            "id": "pdm_c20_36",
            "name": "buildRemoveParams",
            "lines": 22,
            "event_type": "removeNode: RowNode"
          },
          {
            "id": "pdm_c20_37",
            "name": "buildSetFirstNodeAsKeyItemParams",
            "lines": 24,
            "event_type": "node: RowNode"
          },
          {
            "id": "pdm_c20_38",
            "name": "buildBatchSetFirstNodeAsKeyItemParams",
            "lines": 24,
            "event_type": "nodes: RowNode[]"
          },
          {
            "id": "pdm_c20_39",
            "name": "getGroupFirstNodeAfterRemoved",
            "lines": 9,
            "event_type": "nodeRemoved: RowNode"
          },
          {
            "id": "pdm_c20_40",
            "name": "validateUnlinkResponse",
            "lines": 3,
            "event_type": "res: UnlinkResponse"
          },
          {
            "id": "pdm_c20_41",
            "name": "validateSaveResponse",
            "lines": 8,
            "event_type": "res: SaveResponse"
          },
          {
            "id": "pdm_c20_42",
            "name": "sysReplaceItemBatchRemoveAction",
            "lines": 85,
            "event_type": "event: EventInterface",
            "note": "替代物料表格批量移除 1. 获取所有选中的行数据，移除 DEL 2. 过滤掉删除的数据，按组进行分类，每组第一条数据是替代主料 3. 调用批量编辑的接口， 然后替代主料更新 UPD @author: lsp @modifier: 陈龙 2025-01-02 批量删除优化"
          },
          {
            "id": "pdm_c20_43",
            "name": "validateSelectedNodes",
            "lines": 8,
            "event_type": "selectNodes: RowNode[]"
          },
          {
            "id": "pdm_c20_44",
            "name": "prepareBatchRemoveParams",
            "lines": 28,
            "event_type": "selectNodes: RowNode[], table: DppTableComponent"
          },
          {
            "id": "pdm_c20_45",
            "name": "processRemoveResponse",
            "lines": 18,
            "event_type": "res: BatchRemoveResponse, removeNodesMap: Map<string, RowNode>"
          },
          {
            "id": "pdm_c20_46",
            "name": "findNodesToSetAsKeyItem",
            "lines": 31,
            "event_type": "successRemovedNodes: RowNode[]"
          },
          {
            "id": "pdm_c20_47",
            "name": "handleBatchRemoveResult",
            "lines": 8,
            "event_type": "res: BatchRemoveResponse, event: EventInterface"
          },
          {
            "id": "pdm_c20_48",
            "name": "processUpdateResponse",
            "lines": 15,
            "event_type": "updateRes: BatchRemoveResponse, needSetKeyItemNodesMap: Map<string, RowNode>"
          },
          {
            "id": "pdm_c20_49",
            "name": "batchEditDate",
            "lines": 93,
            "event_type": "event: EventInterface, dateType: 'effective' | 'expiration', formName: string, modalTitle: string",
            "note": "提取共同的批量编辑日期逻辑"
          },
          {
            "id": "pdm_c20_50",
            "name": "setBtnLoading",
            "lines": 6,
            "event_type": "true"
          },
          {
            "id": "pdm_c20_51",
            "name": "onClick",
            "lines": 6,
            "event_type": "formCpn: DppFormComponent"
          },
          {
            "id": "pdm_c20_52",
            "name": "onConfirm",
            "lines": 43,
            "event_type": "modal, formCpn, setBtnLoading"
          },
          {
            "id": "pdm_c20_53",
            "name": "handleDateConfirm",
            "lines": 104,
            "event_type": "formCpn: DppFormComponent, modal: DppNzModalRef, event: EventInterface, instanceData: IFoundaton, selectedDatas: RowNode[], dateType: 'effective' | 'expiration', table: DppTableComponent, setBtnLoading: (loading: boolean) => void",
            "note": "处理日期编辑确认"
          },
          {
            "id": "pdm_c20_54",
            "name": "setBtnLoading",
            "lines": 9,
            "event_type": "false"
          },
          {
            "id": "pdm_c20_55",
            "name": "setBtnLoading",
            "lines": 35,
            "event_type": "false"
          },
          {
            "id": "pdm_c20_56",
            "name": "setBtnLoading",
            "lines": 11,
            "event_type": "false"
          },
          {
            "id": "pdm_c20_57",
            "name": "getNodesInSelectedGroups",
            "lines": 18,
            "event_type": "selectedDatas: RowNode[]",
            "note": "获取"
          },
          {
            "id": "pdm_c20_58",
            "name": "sysUsedBOMBatchDeleteAction",
            "lines": 42,
            "event_type": "event: EventInterface",
            "note": "被用在BOM批量删除"
          },
          {
            "id": "pdm_c20_59",
            "name": "sysNewUsedBOMDeleteAction",
            "lines": 32,
            "event_type": "event: EventInterface",
            "note": "被用在BOM表格移除"
          },
          {
            "id": "pdm_c20_60",
            "name": "sysReplaceItemOptionAddAction",
            "lines": 48,
            "event_type": "event: EventInterface",
            "note": "替代物料表格添加"
          },
          {
            "id": "pdm_c20_61",
            "name": "setBtnLoading",
            "lines": 7,
            "event_type": "true"
          },
          {
            "id": "pdm_c20_62",
            "name": "setBtnLoading",
            "lines": 6,
            "event_type": "false"
          },
          {
            "id": "pdm_c20_63",
            "name": "setBtnLoading",
            "lines": 76,
            "event_type": "false"
          },
          {
            "id": "pdm_c20_64",
            "name": "buildOpenModalParams",
            "lines": 31,
            "event_type": "event: EventInterface, isAdd: boolean"
          },
          {
            "id": "pdm_c20_65",
            "name": "openSubItemModal",
            "lines": 44,
            "event_type": "event: EventInterface, onConfirm: (page: DppPageComponent, modal: DppNzModalRef, setBtnLoading: (loading: boolean) => void) => void, modalParams: any"
          },
          {
            "id": "pdm_c20_66",
            "name": "onClick",
            "lines": 6,
            "event_type": "selectedCpn: DppPageComponent"
          },
          {
            "id": "pdm_c20_67",
            "name": "onConfirm",
            "lines": 38,
            "event_type": "selectedCpn, modal, setBtnLoading"
          },
          {
            "id": "pdm_c20_68",
            "name": "collectSelectedData",
            "lines": 15,
            "event_type": "page: DppPageComponent"
          },
          {
            "id": "pdm_c20_69",
            "name": "buildAddParams",
            "lines": 26,
            "event_type": "instanceData: IFoundaton, selectedRows: any[], targetNode: RowNode"
          },
          {
            "id": "pdm_c20_70",
            "name": "buildNewParams",
            "lines": 39,
            "event_type": "instanceData: IFoundaton, selectedRows: any[], table: DppTableComponent"
          },
          {
            "id": "pdm_c20_71",
            "name": "sysUsedBOMAddSearchAction",
            "lines": 4,
            "event_type": "event: EventInterface",
            "note": "被用在BOM表格搜索"
          },
          {
            "id": "pdm_c20_72",
            "name": "sysAddMainItemSearchAction",
            "lines": 4,
            "event_type": "event: EventInterface",
            "note": "新增主物料表格搜索"
          },
          {
            "id": "pdm_c20_73",
            "name": "sysReferenceMainItemSearchAction",
            "lines": 4,
            "event_type": "event: EventInterface",
            "note": "参考主物料搜索"
          },
          {
            "id": "pdm_c20_74",
            "name": "sysAllItemSearchAction",
            "lines": 4,
            "event_type": "event: EventInterface",
            "note": "全部物料搜索"
          },
          {
            "id": "pdm_c20_75",
            "name": "sysReferenceSubstituteItemSearchAction",
            "lines": 4,
            "event_type": "event: EventInterface",
            "note": "参考替代物料搜索"
          },
          {
            "id": "pdm_c20_76",
            "name": "handleItemsSearch",
            "lines": 11,
            "event_type": "event: EventInterface, keys: string[]"
          },
          {
            "id": "pdm_c20_77",
            "name": "formateDate",
            "lines": 3,
            "event_type": "date: Date | string",
            "note": "日期格式化"
          },
          {
            "id": "pdm_c20_78",
            "name": "sysSupersedeSettingAction",
            "lines": 91,
            "event_type": "event: EventInterface",
            "note": "BOM页签 表格操作列 取代设置"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f21",
    "project": "PDM",
    "filename": "table-config.event.ts",
    "groups": [
      {
        "id": "pdm_g21",
        "name": "全部函数",
        "cards": []
      }
    ]
  },
  {
    "id": "pdm_f22",
    "project": "PDM",
    "filename": "tbm-project.event.ts",
    "groups": [
      {
        "id": "pdm_g22",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c22_0",
            "name": "openTBTaskDetailAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "@description 工作台-tb项目任务-name点击"
          },
          {
            "id": "pdm_c22_1",
            "name": "openTbProjectAction",
            "lines": 5,
            "event_type": "event: EventInterface",
            "note": "打开所属项目任务详情(废弃)"
          },
          {
            "id": "pdm_c22_2",
            "name": "openTbModal",
            "lines": 29,
            "event_type": "event: EventInterface, route: string, title: string"
          },
          {
            "id": "pdm_c22_3",
            "name": "sysTbCompleteAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "@description 工作台-tb项目任务-完成任务"
          },
          {
            "id": "pdm_c22_4",
            "name": "sysTBNewTaskAddDeliverablesAction",
            "lines": 77,
            "event_type": "event: EventInterface",
            "note": "@description tb项目任务对象-交付项和交付物详情-新增交付项"
          },
          {
            "id": "pdm_c22_5",
            "name": "onClick",
            "lines": 32,
            "event_type": "forCom: DppFormComponent"
          },
          {
            "id": "pdm_c22_6",
            "name": "updateTbDeliverablesTempAction",
            "lines": 38,
            "event_type": "event: SwitchChangeEvent",
            "note": "表格编辑交付项:必须、发布"
          },
          {
            "id": "pdm_c22_7",
            "name": "sysTbBOMAddDeliverablesAction",
            "lines": 70,
            "event_type": "event: EventInterface",
            "note": "@description 添加交付物 * @use tb项目任务对象-交付项和交付物详情-操作栏添加交付物"
          },
          {
            "id": "pdm_c22_8",
            "name": "onClick",
            "lines": 37,
            "event_type": "modalTable: DppGlobalSearchComponent"
          },
          {
            "id": "pdm_c22_9",
            "name": "sysTbBOMDeliverablesNewAction",
            "lines": 83,
            "event_type": "event: EventInterface",
            "note": "@description 新建交付物 * @use tb项目任务对象-交付项和交付物详情-操作栏"
          },
          {
            "id": "pdm_c22_10",
            "name": "sysTBDeliverablesCompleteAction",
            "lines": 51,
            "event_type": "event: EventInterface",
            "note": "@description 新建交付物  确认事件"
          },
          {
            "id": "pdm_c22_11",
            "name": "sysTBProcessTaskDeliverablesDeleteAction",
            "lines": 24,
            "event_type": "event: EventInterface",
            "note": "@description 删除交付物  @use tb项目任务对象-交付项和交付物详情-操作栏"
          },
          {
            "id": "pdm_c22_12",
            "name": "sysTBDeliverablesEditAction",
            "lines": 97,
            "event_type": "event: EventInterface",
            "note": "@description 编辑交付项 @params event"
          },
          {
            "id": "pdm_c22_13",
            "name": "onClick",
            "lines": 40,
            "event_type": "forCom: DppFormComponent"
          },
          {
            "id": "pdm_c22_14",
            "name": "sysTBTaskDeliverablesBatchDeleteAction",
            "lines": 73,
            "event_type": "event: EventInterface",
            "note": "@description 批量删除交付物  @use tb项目任务对象-交付项和交付物详情-悬停操作栏"
          },
          {
            "id": "pdm_c22_15",
            "name": "sysCloseTBDeliverablesAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "@description TB界面关闭 tb交付项界面"
          },
          {
            "id": "pdm_c22_16",
            "name": "openInstanceAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "@description 打开对象 @use 交付项表格点击交付物类型编号事件"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f23",
    "project": "PDM",
    "filename": "tree-table-edit.event.ts",
    "groups": [
      {
        "id": "pdm_g23",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c23_0",
            "name": "getRoute",
            "lines": 9,
            "event_type": "node: RowNode"
          },
          {
            "id": "pdm_c23_1",
            "name": "sysTableNewBrotherNodeAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "@description 相邻位置新建 @use bom | 维护产品结构 @param event"
          },
          {
            "id": "pdm_c23_2",
            "name": "sysTableNewBrotherNodeCompteAction",
            "lines": 92,
            "event_type": "event: EventInterface",
            "note": "相邻位置新建确认按钮"
          },
          {
            "id": "pdm_c23_3",
            "name": "iif",
            "lines": 4,
            "event_type": "() => checkout, // @ts-ignore of({ context: data, shouldRefresh: false, checkoutData: undefined }), this._handleCheckOut(node.parentNode!.origin, fromProcess, data)"
          },
          {
            "id": "pdm_c23_4",
            "name": "closeLoading",
            "lines": 24
          },
          {
            "id": "pdm_c23_5",
            "name": "sysTableNewChildNodeAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "@description 新建子级 @use bom | 维护产品结构 @param event"
          },
          {
            "id": "pdm_c23_6",
            "name": "sysTableNewChildNodeCompteAction",
            "lines": 96,
            "event_type": "event: EventInterface",
            "note": "新建子阶打开的弹窗   底部完成按钮的操作 @param event"
          },
          {
            "id": "pdm_c23_7",
            "name": "iif",
            "lines": 4,
            "event_type": "() => checkout, // @ts-ignore of({ context: data, shouldRefresh: false, checkoutData: undefined }), this._handleCheckOut(node.origin, fromProcess, data)"
          },
          {
            "id": "pdm_c23_8",
            "name": "closeLoading",
            "lines": 24
          },
          {
            "id": "pdm_c23_9",
            "name": "sysTableAddBrotherNodesAction",
            "lines": 116,
            "event_type": "event: EventInterface",
            "note": "@description 相邻位置添加 @jiexi 打开选择对象弹窗，1选择对象后，2【检出父级-查询bom模版信息】，3判断是否需要刷新顺序号插入，4添加关系 @param event"
          },
          {
            "id": "pdm_c23_10",
            "name": "closeLoading",
            "lines": 17
          },
          {
            "id": "pdm_c23_11",
            "name": "sysBOMTableAddBrotherNodesAction",
            "lines": 124,
            "event_type": "event: EventInterface",
            "note": "@description 相邻位置粘贴 @jiexi @param event"
          },
          {
            "id": "pdm_c23_12",
            "name": "sysTableSwapNodeAction",
            "lines": 123,
            "event_type": "event: EventInterface",
            "note": "@description 替换 @param event"
          },
          {
            "id": "pdm_c23_13",
            "name": "closeLoading",
            "lines": 18
          },
          {
            "id": "pdm_c23_14",
            "name": "sysBOMTableAddChildNodeAction",
            "lines": 111,
            "event_type": "event: EventInterface",
            "note": "粘贴为子阶 @param event @returns"
          },
          {
            "id": "pdm_c23_15",
            "name": "sysTableAddChildNodeAction",
            "lines": 119,
            "event_type": "event: EventInterface",
            "note": "@description 添加子级 @use bom @param event"
          },
          {
            "id": "pdm_c23_16",
            "name": "closeLoading",
            "lines": 22
          },
          {
            "id": "pdm_c23_17",
            "name": "_addChildRelation",
            "lines": 33,
            "event_type": "node: RowNode, checkoutResult: NzSafeAny, fromProcess: boolean, createTask: boolean"
          },
          {
            "id": "pdm_c23_18",
            "name": "_openSelectObjectDialog",
            "lines": 80,
            "event_type": "model: DppSafeAny, node: RowNode, event: EventInterface, _message?: DppMessageService",
            "note": "打开选择对象弹窗"
          },
          {
            "id": "pdm_c23_19",
            "name": "onClick",
            "lines": 17,
            "event_type": "globalSearch: DppGlobalSearchComponent"
          },
          {
            "id": "pdm_c23_20",
            "name": "_openNewObjectDialog",
            "lines": 59,
            "event_type": "event: EventInterface, parent = false",
            "note": "打开新建对象弹窗"
          },
          {
            "id": "pdm_c23_21",
            "name": "_replaceRelation",
            "lines": 32,
            "event_type": "node: RowNode, context: ModalSelect, fromProcess: boolean, createTask: boolean",
            "note": "@description 替换关联关系 @param node 被替换的节点 @param selectNode 选中的节点 @param isBOM @param isCreateTask @param templateName"
          },
          {
            "id": "pdm_c23_22",
            "name": "_newRelation",
            "lines": 32,
            "event_type": "node: RowNode, newObject: DppSafeAny, fromProcess: boolean, createTask: boolean",
            "note": "@description 新建关联关系 @param node 当前节点 @param newObject 新建的对象 @param fromProcess 是否来自流程"
          },
          {
            "id": "pdm_c23_23",
            "name": "_copyRelationNext",
            "lines": 47,
            "event_type": "node: RowNode, list: DppSafeAny[], fromProcess: boolean, createTask: boolean",
            "note": "@description 相邻位置粘贴关联关系(bom) @param node 当前节点 @param list  添加的数据 @param isBOM @param isCreateTask @param templateName @param refresh 是否刷新 @param canInsertNum 可插入的数量 @param templateInfo"
          },
          {
            "id": "pdm_c23_24",
            "name": "_cutAndAddRelation",
            "lines": 43,
            "event_type": "node: RowNode, children: any[], fromProcess: boolean, createTask: boolean"
          },
          {
            "id": "pdm_c23_25",
            "name": "sysBOMBatchRemoveEnd2Action",
            "lines": 86,
            "event_type": "event: EventInterface",
            "note": "批量移除"
          },
          {
            "id": "pdm_c23_26",
            "name": "_useKey",
            "lines": 22,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c23_27",
            "name": "_openSeqDialog",
            "lines": 56,
            "event_type": "insertNum: number, outNum: number",
            "note": "@description 打开是否刷新顺序号插入的弹窗 @param insertNum 插入的数量 @param outNum 超出的数量 @returns {Observable<boolean>} true 刷新 false 不刷新 @private"
          },
          {
            "id": "pdm_c23_28",
            "name": "_calcInsertNum",
            "lines": 11,
            "event_type": "node: RowNode",
            "note": "@description 得到能插入的数量 @param node 当前节点 @returns {number} -10插入任意数量 0不能插入"
          },
          {
            "id": "pdm_c23_29",
            "name": "_checkOutTableCallback",
            "lines": 18,
            "event_type": "node: RowNode, table: DppTableComponent",
            "note": "@description 检出node时需要刷新表格的回调 @param node 需要刷新的节点 @param table"
          },
          {
            "id": "pdm_c23_30",
            "name": "sysBOMRemoveEnd2Action",
            "lines": 47,
            "event_type": "event: EventInterface",
            "note": "@description BOM移除关系 @date 2025-08-01 @param event"
          },
          {
            "id": "pdm_c23_31",
            "name": "showBatchMessage",
            "lines": 20,
            "event_type": "event: EventInterface, res: any"
          },
          {
            "id": "pdm_c23_32",
            "name": "getCreateContext",
            "lines": 9,
            "event_type": "event: EventInterface",
            "note": "获取新增操作的相关参数"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f24",
    "project": "PDM",
    "filename": "valid.event.ts",
    "groups": [
      {
        "id": "pdm_g24",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c24_0",
            "name": "isRootNode",
            "lines": 3,
            "event_type": "node: RowNode"
          },
          {
            "id": "pdm_c24_1",
            "name": "isAboveOrBelowPosition",
            "lines": 3,
            "event_type": "position: DropTypeEnum"
          },
          {
            "id": "pdm_c24_2",
            "name": "getNodePermissions",
            "lines": 3,
            "event_type": "node: RowNode"
          },
          {
            "id": "pdm_c24_3",
            "name": "hasNoPermission",
            "lines": 4,
            "event_type": "node: RowNode, permissionKey: keyof NodePermissions"
          },
          {
            "id": "pdm_c24_4",
            "name": "isChildPosition",
            "lines": 3,
            "event_type": "position: DropTypeEnum"
          },
          {
            "id": "pdm_c24_5",
            "name": "getPermissionKeyByPosition",
            "lines": 8,
            "event_type": "position: DropTypeEnum",
            "note": "根据放置位置获取需要检查的权限键"
          },
          {
            "id": "pdm_c24_6",
            "name": "sysValidBomDragAction",
            "lines": 13,
            "event_type": "params: RowDragValidateParams"
          },
          {
            "id": "pdm_c24_7",
            "name": "sysValidBomDropAction",
            "lines": 14,
            "event_type": "params: RowDropValidateParams",
            "note": "bom drop 验证"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f25",
    "project": "PDM",
    "filename": "wizard.event.ts",
    "groups": [
      {
        "id": "pdm_g25",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c25_0",
            "name": "sysECMNextPageAction",
            "lines": 45,
            "event_type": "event: EventInterface",
            "note": "设计变更（下一页）"
          },
          {
            "id": "pdm_c25_1",
            "name": "sysECMPreviousPageAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "设计变更（上一页）"
          },
          {
            "id": "pdm_c25_2",
            "name": "sysECMCancelAction",
            "lines": 17,
            "event_type": "async event: EventInterface",
            "note": "设计变更（撤销）----"
          },
          {
            "id": "pdm_c25_3",
            "name": "deleteDetailObject",
            "lines": 15,
            "event_type": "async event: EventInterface"
          },
          {
            "id": "pdm_c25_4",
            "name": "batchDeleteFiles",
            "lines": 51,
            "event_type": "async event: EventInterface"
          },
          {
            "id": "pdm_c25_5",
            "name": "deleteMaster",
            "lines": 57,
            "event_type": "async event: EventInterface"
          },
          {
            "id": "pdm_c25_6",
            "name": "sysECMCompleteAction",
            "lines": 23,
            "event_type": "event: EventInterface",
            "note": "设计变更（保存） sysECMSaveAction(event: EventInterface): void {} 设计变更（完成）"
          },
          {
            "id": "pdm_c25_7",
            "name": "sysWizardECMNewDetailAction",
            "lines": 67,
            "event_type": "event: EventInterface",
            "note": "新建普通变更建议/变更指令（包括批量）"
          },
          {
            "id": "pdm_c25_8",
            "name": "sysECMAnnexAddAction",
            "lines": 76,
            "event_type": "event: EventInterface",
            "note": "附件步骤 -> 表格上的添加按钮"
          },
          {
            "id": "pdm_c25_9",
            "name": "sysWizardECMDeleteDetailAction",
            "lines": 7,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c25_10",
            "name": "sysECMWizardStartEcoAction",
            "lines": 4,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c25_11",
            "name": "sysECMWizardCompleteEcoAction",
            "lines": 4,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c25_12",
            "name": "sysECMWizardCancelEcoAction",
            "lines": 4,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c25_13",
            "name": "sysECMWizardCancelSubEcoAction",
            "lines": 4,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c25_14",
            "name": "sysECMWizardDeleteDetailAction",
            "lines": 21,
            "event_type": "event: EventInterface, isBatch = false"
          },
          {
            "id": "pdm_c25_15",
            "name": "sysECMWizardSavePerformerAction",
            "lines": 78,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c25_16",
            "name": "sysWizardFilePreviewAction",
            "lines": 36,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c25_17",
            "name": "sysWizardDeleteFileAction",
            "lines": 20,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c25_18",
            "name": "sysTaskNextPageAction",
            "lines": 27,
            "event_type": "event: EventInterface",
            "note": "任务管理（下一个）"
          },
          {
            "id": "pdm_c25_19",
            "name": "sysWizardMainFileAction",
            "lines": 21,
            "event_type": "event: EventInterface",
            "note": "设计变更/变更请求 设置主文件"
          },
          {
            "id": "pdm_c25_20",
            "name": "sysWizardFileBatchUploadAciton",
            "lines": 33,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c25_21",
            "name": "sysWizardFileBatchDeleteCommonAciton",
            "lines": 12,
            "event_type": "event: EventInterface"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f26",
    "project": "PDM",
    "filename": "workbench.event.ts",
    "groups": [
      {
        "id": "pdm_g26",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c26_0",
            "name": "sysGetHomeDefaultRoute",
            "lines": 17,
            "event_type": "event: RouteDynaGetDeaultEvent"
          },
          {
            "id": "pdm_c26_1",
            "name": "sysTaskListAction",
            "lines": 7,
            "event_type": "event: EventInterface",
            "note": "工作台待办过滤"
          },
          {
            "id": "pdm_c26_2",
            "name": "sysWorkbenchProjectAfterAction",
            "lines": 17,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c26_3",
            "name": "_applyColumnState",
            "lines": 5,
            "event_type": "table.beans, { state: [newState] }, 'ui'"
          },
          {
            "id": "pdm_c26_4",
            "name": "taskDistribution",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "任务分派"
          },
          {
            "id": "pdm_c26_5",
            "name": "sysScenceEntryCardAction",
            "lines": 9,
            "event_type": "event: CardEventInterface"
          },
          {
            "id": "pdm_c26_6",
            "name": "createProduct",
            "lines": 97,
            "event_type": "event: CardEventInterface",
            "note": "创建产品 @use 工作台-场景入口 @param {CardEventInterface} event @memberof WorkBenchEventService"
          },
          {
            "id": "pdm_c26_7",
            "name": "designReview",
            "lines": 1,
            "event_type": "event: EventInterface",
            "note": "设计评审ecManagement"
          },
          {
            "id": "pdm_c26_8",
            "name": "ecManagement",
            "lines": 33,
            "event_type": "event: CardEventInterface",
            "note": "变更请求"
          },
          {
            "id": "pdm_c26_9",
            "name": "sysMyAttentionAction",
            "lines": 4,
            "event_type": "async event: CardEventInterface",
            "note": "我的关注路由跳转 @use 工作台-我的关注 @param {CardEventInterface} event @return {*}  {Promise<void>} @memberof WorkBenchEventService"
          },
          {
            "id": "pdm_c26_10",
            "name": "designChange",
            "lines": 34,
            "event_type": "event: CardEventInterface",
            "note": "设计变更"
          },
          {
            "id": "pdm_c26_11",
            "name": "processTaskDistribution",
            "lines": 118,
            "event_type": "event: CardEventInterface",
            "note": "工艺分工 @param event"
          },
          {
            "id": "pdm_c26_12",
            "name": "generateFieldMapping",
            "lines": 9,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: res?.data, onValueUpdate: (key, value) => { params.data![key] = value; }, isMapToObject: false }"
          },
          {
            "id": "pdm_c26_13",
            "name": "onClick",
            "lines": 57,
            "event_type": "data: DppFormComponent"
          },
          {
            "id": "pdm_c26_14",
            "name": "generateFieldMapping",
            "lines": 8,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: formData, onValueUpdate: (key, value) => { object.props![key] = value; } }"
          },
          {
            "id": "pdm_c26_15",
            "name": "bomCompare",
            "lines": 9,
            "event_type": "event: CardEventInterface",
            "note": "bom比较"
          },
          {
            "id": "pdm_c26_16",
            "name": "substituteQuery",
            "lines": 27,
            "event_type": "event: CardEventInterface",
            "note": "替代查询 @param event"
          },
          {
            "id": "pdm_c26_17",
            "name": "sysProcessTaskDistributionSearchAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "产品料号搜索事件 @param event"
          },
          {
            "id": "pdm_c26_18",
            "name": "sysDesignListSearchAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "设计清单搜索事件 @param event"
          },
          {
            "id": "pdm_c26_19",
            "name": "sysSendWorkAction",
            "lines": 37,
            "event_type": "event: EventInterface",
            "note": "派工 @param event"
          },
          {
            "id": "pdm_c26_20",
            "name": "sysDivideWorkActive",
            "lines": 93,
            "event_type": "event: EventInterface",
            "note": "分工 @param event"
          },
          {
            "id": "pdm_c26_21",
            "name": "generateFieldMapping",
            "lines": 8,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: formData, onValueUpdate: (key, value) => { props![`TASK${key}`] = value; } }"
          },
          {
            "id": "pdm_c26_22",
            "name": "sysRevocationActive",
            "lines": 65,
            "event_type": "event: EventInterface",
            "note": "撤回派工 @param event"
          },
          {
            "id": "pdm_c26_23",
            "name": "taskOwnerOrTypeAction",
            "lines": 32,
            "event_type": "event: CellSaveEvent",
            "note": "设计清单-责任人和分工类型事件 @param event @returns"
          },
          {
            "id": "pdm_c26_24",
            "name": "sysBatchSendWorkAction",
            "lines": 42,
            "event_type": "event: EventInterface",
            "note": "批量派工事件 @param event"
          },
          {
            "id": "pdm_c26_25",
            "name": "sysBatchDivideWorkAction",
            "lines": 125,
            "event_type": "event: EventInterface",
            "note": "批量分工事件 @param event"
          },
          {
            "id": "pdm_c26_26",
            "name": "onClick",
            "lines": 74,
            "event_type": "formCpn: DppFormComponent"
          },
          {
            "id": "pdm_c26_27",
            "name": "generateFieldMapping",
            "lines": 8,
            "event_type": "{ mappingType: 'folder', fieldKey: 'COMMITFOLDER$', sourceData: formData, onValueUpdate: (key, value) => { props![`TASK${key}`] = value; } }"
          },
          {
            "id": "pdm_c26_28",
            "name": "sysBatchRevocationAction",
            "lines": 35,
            "event_type": "event: EventInterface",
            "note": "批量撤回派工 @param event"
          },
          {
            "id": "pdm_c26_29",
            "name": "sysNoticeCheckedAction",
            "lines": 7,
            "event_type": "e: EventInterface",
            "note": "card复选框功能"
          },
          {
            "id": "pdm_c26_30",
            "name": "handelParamsToUpperCase",
            "lines": 9,
            "event_type": "param: { category?: string; isreaded?: string; searchKey?: string }",
            "note": "对象key 转化成 大写"
          },
          {
            "id": "pdm_c26_31",
            "name": "sysNoticeAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "card 分段器事件查询状态消息"
          },
          {
            "id": "pdm_c26_32",
            "name": "noticeSearchAction",
            "lines": 68,
            "event_type": "event: EventInterface",
            "note": "@description 通知消息搜索 @use 通知 @param event"
          },
          {
            "id": "pdm_c26_33",
            "name": "sysReadChangeAction",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "@description 显示已读｜未读｜所有 @param event"
          },
          {
            "id": "pdm_c26_34",
            "name": "sortAction",
            "lines": 17,
            "event_type": "event: EventInterface",
            "note": "@description 通知消息排序 @use 通知 @param event"
          },
          {
            "id": "pdm_c26_35",
            "name": "sysCancelAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "@description 通知消息全选|取消全选 @use 通知 @param event"
          },
          {
            "id": "pdm_c26_36",
            "name": "sysNoticeDeleteAction",
            "lines": 32,
            "event_type": "event: EventInterface",
            "note": "@description 通知消息删除 @param event"
          },
          {
            "id": "pdm_c26_37",
            "name": "sysClickSetReadAction",
            "lines": 28,
            "event_type": "event: EventInterface",
            "note": "@description 通知消息点击设置为已读 @use 通知 @param event"
          },
          {
            "id": "pdm_c26_38",
            "name": "sysSetReadAction",
            "lines": 29,
            "event_type": "event: EventInterface",
            "note": "@description 通知消息设置为已读/未读 @use 通知 @param event"
          },
          {
            "id": "pdm_c26_39",
            "name": "openIntevue",
            "lines": 1,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c26_40",
            "name": "startAction",
            "lines": 1,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c26_41",
            "name": "pauseAction",
            "lines": 1,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c26_42",
            "name": "completeAction",
            "lines": 1,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c26_43",
            "name": "mainObjectAction",
            "lines": 30,
            "event_type": "event: EventInterface",
            "note": "工作台待办任务主对象"
          },
          {
            "id": "pdm_c26_44",
            "name": "myTaskOptionsAction",
            "lines": 67,
            "event_type": "event: EventInterface",
            "note": "工作台待办任务启动/暂停/完成按钮"
          },
          {
            "id": "pdm_c26_45",
            "name": "TaskOption",
            "lines": 3
          },
          {
            "id": "pdm_c26_46",
            "name": "TaskOption",
            "lines": 27
          },
          {
            "id": "pdm_c26_47",
            "name": "openDesignAction",
            "lines": 39,
            "event_type": "event: EventInterface",
            "note": "打开CAD操作事件 @param event"
          },
          {
            "id": "pdm_c26_48",
            "name": "sysApprovalAcceptAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "工作台待我审签同意"
          },
          {
            "id": "pdm_c26_49",
            "name": "sysApprovalRejectAction",
            "lines": 16,
            "event_type": "event: EventInterface",
            "note": "工作台待我审签拒绝"
          },
          {
            "id": "pdm_c26_50",
            "name": "sysNewDesignateTaskAction",
            "lines": 4,
            "event_type": "event: EventInterface",
            "note": "新建指派任务 @param event"
          },
          {
            "id": "pdm_c26_51",
            "name": "sysReassignmentAction",
            "lines": 94,
            "event_type": "event: EventInterface",
            "note": "任务分派任务管理-转派 @param event"
          },
          {
            "id": "pdm_c26_52",
            "name": "sysAssignTaskExportAllAction",
            "lines": 30,
            "event_type": "event: EventInterface",
            "note": "分派任务管理-导出全部"
          }
        ]
      }
    ]
  },
  {
    "id": "pdm_f27",
    "project": "PDM",
    "filename": "workflow.event.ts",
    "groups": [
      {
        "id": "pdm_g27",
        "name": "全部函数",
        "cards": [
          {
            "id": "pdm_c27_0",
            "name": "sysApproveSubmitAction",
            "lines": 66,
            "event_type": "event: EventInterface",
            "note": "提交 @use 流程-上方toolbar @param event"
          },
          {
            "id": "pdm_c27_1",
            "name": "sysApproveSubmitValidAction",
            "lines": 1,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c27_2",
            "name": "sysApproveSaveAction",
            "lines": 1,
            "event_type": "event: EventInterface",
            "note": "保存"
          },
          {
            "id": "pdm_c27_3",
            "name": "sysApproveDeleteAction",
            "lines": 50,
            "event_type": "event: EventInterface",
            "note": "删除 @use 流程-上方toolbar @param event"
          },
          {
            "id": "pdm_c27_4",
            "name": "triggerInstance",
            "lines": 182
          },
          {
            "id": "pdm_c27_5",
            "name": "sysWorkflowPassAction",
            "lines": 1751,
            "event_type": "event: EventInterface",
            "note": "同意 @use 流程-上方toolbar"
          },
          {
            "id": "pdm_c27_6",
            "name": "createDropdownContainer",
            "lines": 7,
            "event_type": "top: number, left: number",
            "note": "创建下拉菜单容器的函数"
          },
          {
            "id": "pdm_c27_7",
            "name": "createDropdownOption",
            "lines": 9,
            "event_type": "dropdownContainer: HTMLElement, text: string",
            "note": "创建下拉菜单选项的函数"
          },
          {
            "id": "pdm_c27_8",
            "name": "sysWorkflowRejectAction",
            "lines": 151,
            "event_type": "event: EventInterface",
            "note": "拒绝 @use 流程-上方toolbar @param event"
          },
          {
            "id": "pdm_c27_9",
            "name": "sysAddApproveActivityAction",
            "lines": 41,
            "event_type": "event: EventInterface",
            "note": "加签 @use 流程-上方toolbar @param event"
          },
          {
            "id": "pdm_c27_10",
            "name": "addPlantime",
            "lines": 11,
            "event_type": "event: DirectDateEditEvent",
            "note": "添加日期"
          },
          {
            "id": "pdm_c27_11",
            "name": "addApproverAction",
            "lines": 51,
            "event_type": "event: TagOpenEvent",
            "note": "添加审批人 @use 流程详情-表格中tag @param event"
          },
          {
            "id": "pdm_c27_12",
            "name": "deleteApproverAction",
            "lines": 7,
            "event_type": "event: TagDeleteEvent",
            "note": "删除执行人 @use 流程详情-表格中tag @param event"
          },
          {
            "id": "pdm_c27_13",
            "name": "sysNewTemplateAction",
            "lines": 61,
            "event_type": "event: EventInterface",
            "note": "新建模板 @use 流程详情-表格上方toolbar @param event"
          },
          {
            "id": "pdm_c27_14",
            "name": "sysDelteTemplateAction",
            "lines": 41,
            "event_type": "event: EventInterface",
            "note": "删除模板"
          },
          {
            "id": "pdm_c27_15",
            "name": "sysSelectTemplateAction",
            "lines": 55,
            "event_type": "event: EventInterface",
            "note": "模板选择"
          },
          {
            "id": "pdm_c27_16",
            "name": "sysWorkflowAddAction",
            "lines": 131,
            "event_type": "event: EventInterface",
            "note": "添加审批对象"
          },
          {
            "id": "pdm_c27_17",
            "name": "sysWorkflowSearchAction",
            "lines": 56,
            "event_type": "event: EventInterface",
            "note": "普通搜索/打开全局搜索"
          },
          {
            "id": "pdm_c27_18",
            "name": "sysRelatedApprovalAnalysisAction",
            "lines": 16,
            "event_type": "event: EventInterface",
            "note": "关联审批对象分析"
          },
          {
            "id": "pdm_c27_19",
            "name": "sysApproveObjectDeleteAction",
            "lines": 18,
            "event_type": "event: EventInterface",
            "note": "审批对象操作列移除"
          },
          {
            "id": "pdm_c27_20",
            "name": "sysWorkflowPasteAction",
            "lines": 65,
            "event_type": "event: EventInterface",
            "note": "粘贴"
          },
          {
            "id": "pdm_c27_21",
            "name": "sysDownloadAllDrawingAction",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "下载所有图纸"
          },
          {
            "id": "pdm_c27_22",
            "name": "sysDrawApproveAction",
            "lines": 61,
            "event_type": "event: EventInterface",
            "note": "图纸审批"
          },
          {
            "id": "pdm_c27_23",
            "name": "sysDrawApproveDownLoadAllAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "图纸审批里 下载所有图纸  可视化审批"
          },
          {
            "id": "pdm_c27_24",
            "name": "downloadAllDrawing",
            "lines": 21,
            "event_type": "params: { procRtGuid: string }, setBtnLoading: (loading: boolean) => void",
            "note": "下载图纸具体实现 @use 流程详情-表格上方toolbar @use 图纸审批-批量下载图纸 @param params"
          },
          {
            "id": "pdm_c27_25",
            "name": "setBtnLoading",
            "lines": 19,
            "event_type": "true"
          },
          {
            "id": "pdm_c27_26",
            "name": "setBtnLoading",
            "lines": 3,
            "event_type": "false"
          },
          {
            "id": "pdm_c27_27",
            "name": "setBtnLoading",
            "lines": 18,
            "event_type": "false"
          },
          {
            "id": "pdm_c27_28",
            "name": "sysDrawApproveDownloadAction",
            "lines": 29,
            "event_type": "event: EventInterface",
            "note": "图纸审批 批量下载图纸"
          },
          {
            "id": "pdm_c27_29",
            "name": "sysSaveIntevueCommentCommonAction",
            "lines": 79,
            "event_type": "event: EventInterface, targetNode?: RowNode, isShowMsg?: boolean",
            "note": "保存批注"
          },
          {
            "id": "pdm_c27_30",
            "name": "saveCommon",
            "lines": 5,
            "event_type": "param, actRtGuid"
          },
          {
            "id": "pdm_c27_31",
            "name": "saveCommon",
            "lines": 2,
            "event_type": "param, actRtGuid"
          },
          {
            "id": "pdm_c27_32",
            "name": "saveCommon",
            "lines": 51,
            "event_type": "param, actRtGuid, isShowMsg"
          },
          {
            "id": "pdm_c27_33",
            "name": "sysSaveIntevueCommentAction",
            "lines": 3,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c27_34",
            "name": "sysDrawApprovePreviewTableAfetrAction",
            "lines": 75,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c27_35",
            "name": "handelDrawApprovePreview",
            "lines": 47,
            "event_type": "file: ViewerComponent, tableData: IFoundaton, fileGuid: string, tags?: IAnnotationComment, callback?: () => void, rowNode?: RowNode"
          },
          {
            "id": "pdm_c27_36",
            "name": "sysDrawApprovePreviewAction",
            "lines": 12,
            "event_type": "event: EventInterface",
            "note": "图纸审批中的预览 行点击事件 @description 点击行-》预览=》刷新已读 @param event @author yff+yqy @modify 陈龙 2025-01-22 去掉全部请求的逻辑"
          },
          {
            "id": "pdm_c27_37",
            "name": "showNoPreviewMessage",
            "lines": 7
          },
          {
            "id": "pdm_c27_38",
            "name": "handlePreviewAndMarkReadTargetNode",
            "lines": 43,
            "event_type": "context: PreviewContext"
          },
          {
            "id": "pdm_c27_39",
            "name": "getPreviewContext",
            "lines": 64,
            "event_type": "event: EventInterface, triggerType: TriggerType = 'rowClick'",
            "note": "获取预览上下文 @description 根据不同的触发方式获取预览相关的上下文信息 @param event - 事件对象 @param triggerType - 触发类型：                   - rowClick: 表格行点击（默认）                   - up: 上一个按钮                   - down: 下一个按钮 @returns {PreviewContext} 预览上下文对象，包含：          - viewComp: 预览组件          - source: 来源（sp: 审批页面 | eye: 预览页面）          - setBtnLoading: 设置按钮加载状态的函数          - lastNode: 上一个选中的节点          - targetNode: 当前目标节点          - event: 事件对象          - table: 表格组件"
          },
          {
            "id": "pdm_c27_40",
            "name": "initDrawApproveStatus",
            "lines": 5,
            "note": "初始化图纸审批状态 @private"
          },
          {
            "id": "pdm_c27_41",
            "name": "previewDrawApproveRow",
            "lines": 24,
            "event_type": "context: PreviewContext",
            "note": "@description 预览行 @param event @returns Observable<boolean>"
          },
          {
            "id": "pdm_c27_42",
            "name": "handleKKFilePreview",
            "lines": 5,
            "event_type": "viewComp: ViewerComponent, node: RowNode",
            "note": "@description 处理KK_FILE类型的预览 @param file @param data @returns Observable<boolean>"
          },
          {
            "id": "pdm_c27_43",
            "name": "handleDrawingPreview",
            "lines": 17,
            "event_type": "viewComp: ViewerComponent, node: RowNode",
            "note": "@description 处理NEW_DI_2D、NEW_DI_3D、ZI_QI_AN类型的预览 @param file @param data @returns Observable<boolean>"
          },
          {
            "id": "pdm_c27_44",
            "name": "commonPreviewDrawApprove",
            "lines": 45,
            "event_type": "viewComp: ViewerComponent, node: RowNode, editFrom: DppFormComponent | undefined, tags?: IAnnotationComment"
          },
          {
            "id": "pdm_c27_45",
            "name": "sysDrawApproveNextAction",
            "lines": 19,
            "event_type": "event: EventInterface",
            "note": "下一个"
          },
          {
            "id": "pdm_c27_46",
            "name": "sysDrawApprovePreviousAction",
            "lines": 19,
            "event_type": "event: EventInterface",
            "note": "上一个"
          },
          {
            "id": "pdm_c27_47",
            "name": "sysApproveCancelAction",
            "lines": 35,
            "event_type": "event: EventInterface",
            "note": "撤销"
          },
          {
            "id": "pdm_c27_48",
            "name": "sysApproveCheckInAction",
            "lines": 41,
            "event_type": "event: EventInterface",
            "note": "检入"
          },
          {
            "id": "pdm_c27_49",
            "name": "sysRefreshInvalidAnnexAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "刷新无效附件状态"
          },
          {
            "id": "pdm_c27_50",
            "name": "sysRefreshAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "刷新"
          },
          {
            "id": "pdm_c27_51",
            "name": "sysApproveObjectBatchRemoveAction",
            "lines": 27,
            "event_type": "event: EventInterface",
            "note": "工作流浮动toolbar移除"
          },
          {
            "id": "pdm_c27_52",
            "name": "sysWorkflowOpenGeneralBlankAction",
            "lines": 12,
            "event_type": "event: HasModelEventInterface"
          },
          {
            "id": "pdm_c27_53",
            "name": "sysWorkflowExportAction",
            "lines": 23,
            "event_type": "event: EventInterface"
          },
          {
            "id": "pdm_c27_54",
            "name": "downloadBlob",
            "lines": 8,
            "event_type": "data: Blob, fileName: string"
          },
          {
            "id": "pdm_c27_55",
            "name": "configBomCellEditorSelector",
            "lines": 11,
            "event_type": "params: CellEditorSelectorParams"
          },
          {
            "id": "pdm_c27_56",
            "name": "configBomCellValueSetter",
            "lines": 14,
            "event_type": "params: ValueSetterParams"
          },
          {
            "id": "pdm_c27_57",
            "name": "sysApproveOpenGeneralDrawerAction",
            "lines": 5,
            "event_type": "event: EventInterface"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f0",
    "project": "UMC",
    "filename": "bom-template.event.ts",
    "groups": [
      {
        "id": "umc_g0",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c0_0",
            "name": "tempSysBomTemplateTableToggleAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "// 切换bom模板状态(废)"
          },
          {
            "id": "umc_c0_1",
            "name": "tempSysBomTemplateSaveAction",
            "lines": 35,
            "event_type": "event: EventInterface",
            "note": "// bom模板表单保存（废）"
          },
          {
            "id": "umc_c0_2",
            "name": "tempSysBomBusinessObjectAddAction",
            "lines": 81,
            "event_type": "event: EventInterface",
            "note": "// BOM业务对象添加（废）"
          },
          {
            "id": "umc_c0_3",
            "name": "tempSysBusinessObjectToggleAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "// 切换bom业务对象状态(废)"
          },
          {
            "id": "umc_c0_4",
            "name": "tempSysReportFormsAddAction",
            "lines": 77,
            "event_type": "event: EventInterface",
            "note": "// 报表添加"
          },
          {
            "id": "umc_c0_5",
            "name": "tempSysReportFormsEditAction",
            "lines": 81,
            "event_type": "event: EventInterface",
            "note": "// 报表编辑"
          },
          {
            "id": "umc_c0_6",
            "name": "tempSysReportFormsDeleteAction",
            "lines": 25,
            "event_type": "event: EventInterface",
            "note": "// 报表删除"
          },
          {
            "id": "umc_c0_7",
            "name": "addBomTemplateEnd1Action",
            "lines": 50,
            "event_type": "event: EventInterface",
            "note": "// 添加父阶业务对象"
          },
          {
            "id": "umc_c0_8",
            "name": "deleteRBomTemplateEnd1Action",
            "lines": 7,
            "event_type": "event: EventInterface",
            "note": "// 删除父阶业务对象"
          },
          {
            "id": "umc_c0_9",
            "name": "addBomTemplateEnd2Action",
            "lines": 48,
            "event_type": "event: EventInterface",
            "note": "// 添加子阶业务对象"
          },
          {
            "id": "umc_c0_10",
            "name": "deleteBomTemplateEnd2Action",
            "lines": 20,
            "event_type": "event: EventInterface",
            "note": "// 删除子阶业务对象"
          },
          {
            "id": "umc_c0_11",
            "name": "tempSysBomNewTemplateAction",
            "lines": 62,
            "event_type": "event: EventInterface",
            "note": "// 新增BOM模板(废弃)"
          },
          {
            "id": "umc_c0_12",
            "name": "tempSysBomTemplateSearchAction",
            "lines": 25,
            "event_type": "event: EventInterface",
            "note": "// 搜索bom模板"
          },
          {
            "id": "umc_c0_13",
            "name": "sysBomNewTemplateAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "// 新增BOM模板按钮"
          },
          {
            "id": "umc_c0_14",
            "name": "sysBomNewRelationAction",
            "lines": 11,
            "event_type": "event: EventInterface",
            "note": "// 新增BOM关系按钮"
          },
          {
            "id": "umc_c0_15",
            "name": "sysBomTemplateEditAction",
            "lines": 11,
            "event_type": "event: EventInterface",
            "note": "// 编辑BOM模板"
          },
          {
            "id": "umc_c0_16",
            "name": "sysBomTemplateCopyAddAction",
            "lines": 16,
            "event_type": "event: TableCellToolbarExecuteEvent",
            "note": "/** BOM模板复制添加\n* @use BOM模板管理   复制新增\n* @type 表格单元格工具栏执行事件\n*/"
          },
          {
            "id": "umc_c0_17",
            "name": "sysBomRelationEditAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "// 编辑BOM关系"
          },
          {
            "id": "umc_c0_18",
            "name": "sysBomTemplateActiveAction",
            "lines": 39,
            "event_type": "event: SwitchChangeEvent",
            "note": "// 生失效BOM模板"
          },
          {
            "id": "umc_c0_19",
            "name": "sysBomRelationActiveAction",
            "lines": 45,
            "event_type": "event: SwitchChangeEvent",
            "note": "// 生失效BOM关系"
          },
          {
            "id": "umc_c0_20",
            "name": "sysBomTemplateFilterAction",
            "lines": 21,
            "event_type": "event: EventInterface",
            "note": "/** Bom模板筛选\n* @param event EventInterface\n*/"
          },
          {
            "id": "umc_c0_21",
            "name": "sysBomRelationFilterAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "/** bom关系筛选\n* @param event EventInterface\n*/"
          },
          {
            "id": "umc_c0_22",
            "name": "sysAddExportBomAction",
            "lines": 5,
            "event_type": "event: EventInterface",
            "note": "/** 导出模板添加新空行\n* @param event EventInterface\n*/"
          },
          {
            "id": "umc_c0_23",
            "name": "sysDelExportTemplateAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "/** 新增BOM导出格式模板行删除\n* @param event EventInterface\n*/"
          },
          {
            "id": "umc_c0_24",
            "name": "sysExportBomUploadShowAction",
            "lines": 23,
            "event_type": "event: EventInterface",
            "note": "/**\n* 上传文件\n* @param event EventInterface\n*/"
          },
          {
            "id": "umc_c0_25",
            "name": "sysExportBomUploadDelAction",
            "lines": 20,
            "event_type": "event: EventInterface",
            "note": "/**\n* 删除文件\n* @param event EventInterface\n*/"
          },
          {
            "id": "umc_c0_26",
            "name": "sysExportBomDownloadAction",
            "lines": 33,
            "event_type": "event: EventInterface",
            "note": "/**\n* 下载文件\n* @param event EventInterface\n*/"
          },
          {
            "id": "umc_c0_27",
            "name": "sysBomSetDefaultAction",
            "lines": 19,
            "event_type": "event: EventInterface",
            "note": "/** 设置BOM为缺省值\n* @param event EventInterface\n*/"
          },
          {
            "id": "umc_c0_28",
            "name": "_switchActiveFn",
            "lines": 8,
            "event_type": "event: TagEventInterface, config: { contentStr: string remoteFn: (data: IUser, content: DppTableComponent",
            "note": "/** BOM生失效提取函数\n* @param event TagEventInterface\n* @param config { contentStr: string; remoteFn: (data: IUser) => IFoundaton }\n* @returns void\n*/"
          },
          {
            "id": "umc_c0_29",
            "name": "setLoadingFn",
            "lines": 9,
            "event_type": "false",
            "note": "// tableTagCpm?.['updateRow'](resData);\n// table.refreshData();"
          },
          {
            "id": "umc_c0_30",
            "name": "changeState",
            "lines": 12
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f1",
    "project": "UMC",
    "filename": "business-rule.event.ts",
    "groups": [
      {
        "id": "umc_g1",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c1_0",
            "name": "sysBusinessRuleIsArtificialReviseAction",
            "lines": 21,
            "event_type": "event: SwitchChangeEvent",
            "note": "/**\n* @use 业务规则 - 允许手工修订，业务规则模块手工修订Switch切换时触发\n* @type Switch生失效切换事件\n*/"
          },
          {
            "id": "umc_c1_1",
            "name": "reviseAfterLifecycleAction",
            "lines": 31,
            "event_type": "event: CellSaveEvent",
            "note": "/**\n* @use 业务规则 - 修订后生命周期阶段，修订后生命周期阶段单元格保存时触发\n* @type 单元格保存事件\n*/"
          },
          {
            "id": "umc_c1_2",
            "name": "sysBomForkSaveAction",
            "lines": 22,
            "event_type": "event: EventInterface",
            "note": "/**\n* @MIGRATE\n* @use 业务规则 - BOM衍生配置保存，BOM衍生配置表单底部\"保存\"按钮点击时触发\n* @type 通用事件接口\n*/"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f2",
    "project": "UMC",
    "filename": "cad-template.event.ts",
    "groups": [
      {
        "id": "umc_g2",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c2_0",
            "name": "sysNewCADTemplateAction",
            "lines": 58,
            "event_type": "event: EventInterface",
            "note": "/**\n* 新建CAD图档模板事件\n*/"
          },
          {
            "id": "umc_c2_1",
            "name": "sysCADTemplateSourceFileSearchAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "/**\n* 源文件弹窗搜索事件\n* @param event\n* @returns\n*/"
          },
          {
            "id": "umc_c2_2",
            "name": "sysCADTemplateEditAction",
            "lines": 68,
            "event_type": "event: EventInterface",
            "note": "/**\n* CAD图档模板编辑事件\n* @param event\n*/"
          },
          {
            "id": "umc_c2_3",
            "name": "sysCADTemplateDeleteAction",
            "lines": 18,
            "event_type": "event: EventInterface",
            "note": "/**\n* CAD图档模板删除事件\n* @param event\n*/"
          },
          {
            "id": "umc_c2_4",
            "name": "sysCADTemplateIsShowAction",
            "lines": 31,
            "event_type": "event: SwitchChangeEvent",
            "note": "/**\n* 模板是否显示处理事件\n* @param event\n*/"
          },
          {
            "id": "umc_c2_5",
            "name": "sysCADTemplateBatchDeleteAction",
            "lines": 19,
            "event_type": "event: EventInterface",
            "note": "/**\n* 批量删除事件\n* @param event\n*/"
          },
          {
            "id": "umc_c2_6",
            "name": "syCadOriginBlankAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "/**\n* cad模板打开原图事件\n* @param event\n*/"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f3",
    "project": "UMC",
    "filename": "calendar-Management.event.ts",
    "groups": [
      {
        "id": "umc_g3",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c3_0",
            "name": "saveExceptionDateAction",
            "lines": 71,
            "event_type": "event: CellSaveEvent",
            "note": "/**\n* @description 日历管理-例外日期-编辑表格单元格保存、表格添加行保存\n*/"
          },
          {
            "id": "umc_c3_1",
            "name": "getByteLength",
            "lines": 3,
            "event_type": "str: string"
          },
          {
            "id": "umc_c3_2",
            "name": "sysExceptionDateDeleteAction",
            "lines": 17,
            "event_type": "event: EventInterface",
            "note": "// 例外日期删除【编辑表格不能走模型防止刷新未保存编辑行 待适配】"
          },
          {
            "id": "umc_c3_3",
            "name": "sysExceptionDateDetailsAction",
            "lines": 99,
            "event_type": "event: EventInterface",
            "note": "// 例外日期详情详情信息"
          },
          {
            "id": "umc_c3_4",
            "name": "sysExceptionDateDetailSaveAction",
            "lines": 76,
            "event_type": "event: EventInterface",
            "note": "// 例外日期详情时间添加保存"
          },
          {
            "id": "umc_c3_5",
            "name": "sysExceptionDateDetailsDeleteAction",
            "lines": 17,
            "event_type": "event: EventInterface",
            "note": "// 例外日期的详情时间删除【编辑表格入参是data 刷新待适配】"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f4",
    "project": "UMC",
    "filename": "classification-Management.event.ts",
    "groups": [
      {
        "id": "umc_g4",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c4_0",
            "name": "SysClassRulesClick",
            "lines": 9,
            "event_type": "event: EventInterface",
            "note": "// 分类管理规则table和码段table 点击交互"
          },
          {
            "id": "umc_c4_1",
            "name": "sysClassificationAddSynthesisRulesAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "// 新增合成规则"
          },
          {
            "id": "umc_c4_2",
            "name": "openSynthesisRulesModal",
            "lines": 157,
            "event_type": "event: EventInterface, add?: boolean, rowData?: RowNode",
            "note": "// 打开合成规则表格"
          },
          {
            "id": "umc_c4_3",
            "name": "sysSynthesisRulesCopyAndAddAction",
            "lines": 4,
            "event_type": "event: EventInterface",
            "note": "// 复制新增"
          },
          {
            "id": "umc_c4_4",
            "name": "sysSynthesisRulesDeleteAction",
            "lines": 27,
            "event_type": "event: EventInterface",
            "note": "// 合成规则删除"
          },
          {
            "id": "umc_c4_5",
            "name": "sysClassifyRulesPasteClick",
            "lines": 18,
            "event_type": "event: EventInterface",
            "note": "// 粘贴界面合成规则行点击事件"
          },
          {
            "id": "umc_c4_6",
            "name": "sysSynthesisRulesCopyAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "// 复制合成规则"
          },
          {
            "id": "umc_c4_7",
            "name": "sysSynthesisRulesBatchCopyAction",
            "lines": 16,
            "event_type": "event: EventInterface",
            "note": "// 批量复制合成规则"
          },
          {
            "id": "umc_c4_8",
            "name": "sysClassifyRulesPasteInitAfterAction",
            "lines": 52,
            "event_type": "event: EventInterface",
            "note": "// 粘贴界面合成规则加载后事件"
          },
          {
            "id": "umc_c4_9",
            "name": "sysClassificationPasteSynthesisRulesAction",
            "lines": 173,
            "event_type": "event: EventInterface, data: ClassificationFeatureItem[]",
            "note": "// 粘贴合成规则"
          },
          {
            "id": "umc_c4_10",
            "name": "sysClassifyCodePasteClick",
            "lines": 5,
            "event_type": "event: EventInterface",
            "note": "// 码段行点击事件"
          },
          {
            "id": "umc_c4_11",
            "name": "sysSynthesisRulesEditPasteAction",
            "lines": 125,
            "event_type": "event: EventInterface",
            "note": "// 粘贴合成规则界面 规则编辑事件"
          },
          {
            "id": "umc_c4_12",
            "name": "sysCodeSegmentEditPasteAction",
            "lines": 206,
            "event_type": "event: EventInterface",
            "note": "// 粘贴合成规则界面 码段编辑事件"
          },
          {
            "id": "umc_c4_13",
            "name": "sysSynthesisRulesBatchDeleteAction",
            "lines": 78,
            "event_type": "event: EventInterface",
            "note": "// 批量删除合成规则"
          },
          {
            "id": "umc_c4_14",
            "name": "RefreshSynthesisRulesFn",
            "lines": 24,
            "event_type": "table: DppTableComponent, rowData: IFoundaton, FIELDNAME?: string",
            "note": "// 记录选中数据刷新合成规则"
          },
          {
            "id": "umc_c4_15",
            "name": "refreshKeepSelectionAndSync",
            "lines": 41,
            "event_type": "masterTable: DppTableComponent, detailTable: DppTableComponent",
            "note": "/**\n* 主表刷新，保持选中并同步详情表\n* 仅用于分类管理-合成规则场景\n*/"
          },
          {
            "id": "umc_c4_16",
            "name": "sysClassificationsPasteCodeSegmentAction",
            "lines": 110,
            "event_type": "event: EventInterface",
            "note": "// 粘贴码段"
          },
          {
            "id": "umc_c4_17",
            "name": "sysCodeSegmentCopyAction",
            "lines": 11,
            "event_type": "event: EventInterface",
            "note": "// 复制码段 FEATUREITEMINFOS"
          },
          {
            "id": "umc_c4_18",
            "name": "sysCodeSegmentBatchCopyAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "// 批量复制码段"
          },
          {
            "id": "umc_c4_19",
            "name": "sysCodeSegmentBatchDeleteAction",
            "lines": 87,
            "event_type": "event: EventInterface",
            "note": "// 批量删除码段"
          },
          {
            "id": "umc_c4_20",
            "name": "sysClassificationsAddCodeSegmentAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "// 新增码段"
          },
          {
            "id": "umc_c4_21",
            "name": "openCodeSegmentModal",
            "lines": 128,
            "event_type": "event: EventInterface, title?: string, dppRender?: DppSafeAny, footer?: DppSafeAny",
            "note": "// 打开码段From"
          },
          {
            "id": "umc_c4_22",
            "name": "searchTextAction",
            "lines": 17,
            "event_type": "event: EventInterface",
            "note": "// 高级搜索通用搜索"
          },
          {
            "id": "umc_c4_23",
            "name": "searchClassTextAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "// 新增码段-字段表格-搜索"
          },
          {
            "id": "umc_c4_24",
            "name": "searchClassCdeTextAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "// 新增码段-码段类型-字段和流水码搜索"
          },
          {
            "id": "umc_c4_25",
            "name": "syCodeSegmentExamineAction",
            "lines": 71,
            "event_type": "event: EventInterface",
            "note": "// 码段查看"
          },
          {
            "id": "umc_c4_26",
            "name": "sysCodeSegmentEditAction",
            "lines": 169,
            "event_type": "event: EventInterface",
            "note": "// 码段修改"
          },
          {
            "id": "umc_c4_27",
            "name": "sysCodeSegmentDeleteAction",
            "lines": 19,
            "event_type": "event: EventInterface",
            "note": "// 码段删除"
          },
          {
            "id": "umc_c4_28",
            "name": "sysCodeSegmentMoveupAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "// 上移"
          },
          {
            "id": "umc_c4_29",
            "name": "sysCodeSegmentMovedownAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "// 下移"
          },
          {
            "id": "umc_c4_30",
            "name": "CodeSegmentMoveupAction",
            "lines": 21,
            "event_type": "event: EventInterface, type: boolean"
          },
          {
            "id": "umc_c4_31",
            "name": "sysClassSynthesisRulesImportAction",
            "lines": 109,
            "event_type": "event: EventInterface, type: boolean",
            "note": "// 导入规则/码段"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f5",
    "project": "UMC",
    "filename": "code-management.event.ts",
    "groups": [
      {
        "id": "umc_g5",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c5_0",
            "name": "handleCodeNew",
            "lines": 64,
            "event_type": "event: EventInterface, type?: string",
            "note": "// 新增code"
          },
          {
            "id": "umc_c5_1",
            "name": "sysClassificationCodeNewAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "// 分类组码"
          },
          {
            "id": "umc_c5_2",
            "name": "sysNormalCodeNewAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "// 普通组码"
          },
          {
            "id": "umc_c5_3",
            "name": "sysCodeSearchAction",
            "lines": 11,
            "event_type": "event: EventInterface",
            "note": "// 搜索code"
          },
          {
            "id": "umc_c5_4",
            "name": "sysCodeSaveAction",
            "lines": 49,
            "event_type": "event: EventInterface",
            "note": "// 保存"
          },
          {
            "id": "umc_c5_5",
            "name": "sysCodeItemNewAction",
            "lines": 94,
            "event_type": "event: EventInterface",
            "note": "// 新增code子项"
          },
          {
            "id": "umc_c5_6",
            "name": "getRoute",
            "lines": 9,
            "event_type": "node: RowNode"
          },
          {
            "id": "umc_c5_7",
            "name": "sysCodeItemModifyAction",
            "lines": 72,
            "event_type": "event: EventInterface",
            "note": "// 修改code子项"
          },
          {
            "id": "umc_c5_8",
            "name": "sysCodeManageDownloadTempAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "// 下载模板"
          },
          {
            "id": "umc_c5_9",
            "name": "downloadBlob",
            "lines": 8,
            "event_type": "data: Blob, fileName: string"
          },
          {
            "id": "umc_c5_10",
            "name": "sysCodeManageImportUserAction",
            "lines": 26,
            "event_type": "event: EventInterface",
            "note": "// 导入组码"
          },
          {
            "id": "umc_c5_11",
            "name": "sysClassificationAttributeAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "/**\n* 传分类属性\n* @param event\n*/"
          },
          {
            "id": "umc_c5_12",
            "name": "sysClassificationSubitemAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "/**\n* 传分类子项\n* @param event\n*/"
          },
          {
            "id": "umc_c5_13",
            "name": "sysClassificationAttributeAndSubitemAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "/**\n* 传分类属性和分类子项\n* @param event\n*/"
          },
          {
            "id": "umc_c5_14",
            "name": "sysCodeDeleteAction",
            "lines": 12,
            "event_type": "event: EventInterface",
            "note": "/**\n* 删除code\n*/"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f6",
    "project": "UMC",
    "filename": "configuration-transformation.event.ts",
    "groups": [
      {
        "id": "umc_g6",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c6_0",
            "name": "sysConfigurationTransformationAddAction",
            "lines": 87,
            "event_type": "event: EventInterface",
            "note": "// 添加转换"
          },
          {
            "id": "umc_c6_1",
            "name": "sysTransferObjectInitializationAction",
            "lines": 23,
            "event_type": "event: EventInterface",
            "note": "// 初始化"
          },
          {
            "id": "umc_c6_2",
            "name": "sysAddSignTemplateAction",
            "lines": 91,
            "event_type": "event: EventInterface",
            "note": "// 添加模板"
          },
          {
            "id": "umc_c6_3",
            "name": "sysSignTemplateSearchAction",
            "lines": 11,
            "event_type": "event: EventInterface",
            "note": "// 签章模板搜索"
          },
          {
            "id": "umc_c6_4",
            "name": "sysConfigurationTransformationSearchAction",
            "lines": 11,
            "event_type": "event: EventInterface",
            "note": "// 转换配置搜索"
          },
          {
            "id": "umc_c6_5",
            "name": "sysTransformationTypeToggleAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "// 切换"
          },
          {
            "id": "umc_c6_6",
            "name": "sysConfigMenuClick",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "// 转换配置左侧menu点击事件"
          },
          {
            "id": "umc_c6_7",
            "name": "sysSignMenuClick",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "// 签章方案左侧menu点击事件"
          },
          {
            "id": "umc_c6_8",
            "name": "sysAddSignatureAction",
            "lines": 51,
            "event_type": "event: EventInterface",
            "note": "// 添加签章"
          },
          {
            "id": "umc_c6_9",
            "name": "sysTransferWorkflowSettingAddAction",
            "lines": 83,
            "event_type": "event: EventInterface",
            "note": "// 添加流程配置"
          },
          {
            "id": "umc_c6_10",
            "name": "sysTransferObjectAddAction",
            "lines": 77,
            "event_type": "event: EventInterface",
            "note": "// 添加转换对象"
          },
          {
            "id": "umc_c6_11",
            "name": "sysCompositeFieldAddAction",
            "lines": 55,
            "event_type": "event: EventInterface",
            "note": "// 添加合成字段"
          },
          {
            "id": "umc_c6_12",
            "name": "sysCompositeFieldDeleteAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "// 删除合成字段"
          },
          {
            "id": "umc_c6_13",
            "name": "sysCompositeFieldEditAction",
            "lines": 67,
            "event_type": "event: EventInterface",
            "note": "// 编辑合成字段"
          },
          {
            "id": "umc_c6_14",
            "name": "sysCompositeFieldMoveupAction",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "// 上移"
          },
          {
            "id": "umc_c6_15",
            "name": "sysCompositeFieldMovedownAction",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "// 下移"
          },
          {
            "id": "umc_c6_16",
            "name": "sysTransferObjectDeleteAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "// 删除转换对象"
          },
          {
            "id": "umc_c6_17",
            "name": "sysTransferWorkflowSettingDeleteAction",
            "lines": 7,
            "event_type": "event: EventInterface",
            "note": "// 删除流程配置"
          },
          {
            "id": "umc_c6_18",
            "name": "sysSignatureSchemeEditAction",
            "lines": 7,
            "event_type": "event: EventInterface",
            "note": "// 编辑"
          },
          {
            "id": "umc_c6_19",
            "name": "sysTransferTypeClickAction",
            "lines": 45,
            "event_type": "event: EventInterface",
            "note": "// 打开转换配置抽屉"
          },
          {
            "id": "umc_c6_20",
            "name": "sysConfigurationTransformationSaveAction",
            "lines": 43,
            "event_type": "event: EventInterface",
            "note": "// 转换配置保存"
          },
          {
            "id": "umc_c6_21",
            "name": "sysConfigurationTransformationDeleteAction",
            "lines": 11,
            "event_type": "event: EventInterface",
            "note": "// 转换配置删除"
          },
          {
            "id": "umc_c6_22",
            "name": "sysConfigurationTransformationCopyAction",
            "lines": 109,
            "event_type": "event: EventInterface",
            "note": "// 转换配置复制"
          },
          {
            "id": "umc_c6_23",
            "name": "sysSignatureSchemeDeleteAction",
            "lines": 11,
            "event_type": "event: EventInterface",
            "note": "// 签章模板删除"
          },
          {
            "id": "umc_c6_24",
            "name": "sysSignatureSchemeCopyAction",
            "lines": 80,
            "event_type": "event: EventInterface",
            "note": "// 签章方案复制新建"
          },
          {
            "id": "umc_c6_25",
            "name": "sysSignDeleteAction",
            "lines": 11,
            "event_type": "event: EventInterface",
            "note": "// 删除签章"
          },
          {
            "id": "umc_c6_26",
            "name": "sysSignCopyAction",
            "lines": 62,
            "event_type": "event: EventInterface",
            "note": "// 复制签章"
          },
          {
            "id": "umc_c6_27",
            "name": "sysSignEditAction",
            "lines": 54,
            "event_type": "event: EventInterface",
            "note": "// 编辑签章"
          },
          {
            "id": "umc_c6_28",
            "name": "showSignDetailAction",
            "lines": 12,
            "event_type": "event: EventInterface"
          },
          {
            "id": "umc_c6_29",
            "name": "showSignFilePreviewAction",
            "lines": 28,
            "event_type": "event: EventInterface"
          },
          {
            "id": "umc_c6_30",
            "name": "editTransferWorkflowTableAction",
            "lines": 8,
            "event_type": "event: EventInterface"
          },
          {
            "id": "umc_c6_31",
            "name": "sysBatchTransferAction",
            "lines": 23,
            "event_type": "event: EventInterface",
            "note": "// 批量转换"
          },
          {
            "id": "umc_c6_32",
            "name": "downloadMainFileAction",
            "lines": 13,
            "event_type": "event: any",
            "note": "// 主文件下载"
          },
          {
            "id": "umc_c6_33",
            "name": "downloadFile",
            "lines": 25,
            "event_type": "file: any, fileName: string, isAll: boolean"
          },
          {
            "id": "umc_c6_34",
            "name": "filePreviewAction",
            "lines": 37,
            "event_type": "event: EventInterface",
            "note": "/**\n* 预览\n* @use 表格主文件列预览\n* @param event\n*/"
          },
          {
            "id": "umc_c6_35",
            "name": "sysTransferWorkflowSettingAction",
            "lines": 5,
            "event_type": "event: CellSaveEvent"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f7",
    "project": "UMC",
    "filename": "customize-form.event.ts",
    "groups": [
      {
        "id": "umc_g7",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c7_0",
            "name": "selectAvailableObjectAdd",
            "lines": 6,
            "event_type": "field, formCpn",
            "note": "// 选择对象及分类(可用对象)-新增"
          },
          {
            "id": "umc_c7_1",
            "name": "selectAvailableObject",
            "lines": 6,
            "event_type": "field, formCpn",
            "note": "// 选择对象及分类(可用对象)-复制/查看"
          },
          {
            "id": "umc_c7_2",
            "name": "selectLaunchObjectAdd",
            "lines": 6,
            "event_type": "field, formCpn",
            "note": "// 选择对象及分类(可发起对象)-新增"
          },
          {
            "id": "umc_c7_3",
            "name": "selectLaunchObject",
            "lines": 6,
            "event_type": "field, formCpn",
            "note": "// 选择对象及分类(可发起对象)-复制/查看"
          },
          {
            "id": "umc_c7_4",
            "name": "handleAvailableObject",
            "lines": 89,
            "event_type": "field: any, observer: Observer<CustObjectOpenRet>, config: { wfName: string; targetKey: string }",
            "note": "// 处理可用对象"
          },
          {
            "id": "umc_c7_5",
            "name": "handleLaunchObject",
            "lines": 103,
            "event_type": "field: any, formCpn: DppFormComponent, observer: Observer<CustObjectOpenRet>, config: { wfName: string; targetKey: string }",
            "note": "// 选择对象及分类(可发起对象)"
          },
          {
            "id": "umc_c7_6",
            "name": "delAvailableObject",
            "lines": 47,
            "event_type": "item",
            "note": "// 移除已选可用对象"
          },
          {
            "id": "umc_c7_7",
            "name": "delLaunchObject",
            "lines": 3,
            "event_type": "item",
            "note": "// 移除已选可发起对象"
          },
          {
            "id": "umc_c7_8",
            "name": "setAgentOpen",
            "lines": 87,
            "event_type": "field, formCpm"
          },
          {
            "id": "umc_c7_9",
            "name": "agentSearch",
            "lines": 12,
            "event_type": "input, option, pinyinFn"
          },
          {
            "id": "umc_c7_10",
            "name": "cadTemplateSourceFileOpenClick",
            "lines": 77,
            "event_type": "field, formCpm"
          },
          {
            "id": "umc_c7_11",
            "name": "initDataErpAction",
            "lines": 12,
            "event_type": "value, formCpm"
          },
          {
            "id": "umc_c7_12",
            "name": "sysFolderClickAction",
            "lines": 3,
            "event_type": "fieldCpm, formCpm"
          },
          {
            "id": "umc_c7_13",
            "name": "sysObjectClick",
            "lines": 19,
            "event_type": "item"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f8",
    "project": "UMC",
    "filename": "dingding-integrated.event.ts",
    "groups": [
      {
        "id": "umc_g8",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c8_0",
            "name": "sysDingDingIntegratedSaveAction",
            "lines": 43,
            "event_type": "event: EventInterface",
            "note": "/**\n* 钉钉集成-保存\n* @param event\n*/"
          },
          {
            "id": "umc_c8_1",
            "name": "sysDingDingIntegratedTestAction",
            "lines": 20,
            "event_type": "event: EventInterface",
            "note": "/**\n* 钉钉集成-集成测试\n* @param event\n*/"
          },
          {
            "id": "umc_c8_2",
            "name": "sysDingDingIntegratedOrgStructureSynchAction",
            "lines": 20,
            "event_type": "event: EventInterface",
            "note": "/**\n* 钉钉集成-组织结构同步\n*/"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f9",
    "project": "UMC",
    "filename": "dispatch-center.event.ts",
    "groups": [
      {
        "id": "umc_g9",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c9_0",
            "name": "sysDCNodeManagNewAction",
            "lines": 48,
            "event_type": "event: EventInterface",
            "note": "// 新增节点"
          },
          {
            "id": "umc_c9_1",
            "name": "sysDCTaskManagNewAction",
            "lines": 48,
            "event_type": "event: EventInterface",
            "note": "// 新增任务"
          },
          {
            "id": "umc_c9_2",
            "name": "sysDCActuatorManagNewAction",
            "lines": 48,
            "event_type": "event: EventInterface",
            "note": "// 新增调度器"
          },
          {
            "id": "umc_c9_3",
            "name": "sysDCNodeManagEditAction",
            "lines": 54,
            "event_type": "event: EventInterface"
          },
          {
            "id": "umc_c9_4",
            "name": "sysDCTaskManagEditAction",
            "lines": 3,
            "event_type": "event: EventInterface"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f10",
    "project": "UMC",
    "filename": "email-server-manage.event.ts",
    "groups": [
      {
        "id": "umc_g10",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c10_0",
            "name": "EmailServerManageSaveAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "/** 邮件服务保存\n* @param event\n*/"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f11",
    "project": "UMC",
    "filename": "erpintegrated-template-management.event.ts",
    "groups": [
      {
        "id": "umc_g11",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c11_0",
            "name": "sysERPIntegratedTemplateCopyAndAddAction",
            "lines": 116,
            "event_type": "event: EventInterface",
            "note": "/**\n* erp集成模板复制新增\n* @param event\n*/"
          },
          {
            "id": "umc_c11_1",
            "name": "sysERPIntegratedTemplateLookAndEditAction",
            "lines": 115,
            "event_type": "event: EventInterface",
            "note": "/**\n* erp集成模板查看及修改\n* @param event\n*/"
          },
          {
            "id": "umc_c11_2",
            "name": "sysERPIntegratedTemplateDeleteAction",
            "lines": 39,
            "event_type": "event: EventInterface",
            "note": "/**\n* erp集成模板删除\n* @param event\n*/"
          },
          {
            "id": "umc_c11_3",
            "name": "sysERPIntegratedProductLibraryNewAction",
            "lines": 30,
            "event_type": "event: EventInterface",
            "note": "/**\n* 新增集成产品\n* @param event\n*/"
          },
          {
            "id": "umc_c11_4",
            "name": "sysERPIntegratedProductLibraryLookAndEditAction",
            "lines": 36,
            "event_type": "event: EventInterface",
            "note": "/**\n* erp集成产品库查看及修改集成产品\n* @param event\n*/"
          },
          {
            "id": "umc_c11_5",
            "name": "sysERPIntegratedProductLibraryTestConnectionAction",
            "lines": 44,
            "event_type": "event: EventInterface",
            "note": "/**\n* erp集成产品库测试连接\n* @param event\n*/"
          },
          {
            "id": "umc_c11_6",
            "name": "sysERPIntegratedProductLibraryDeleteAction",
            "lines": 47,
            "event_type": "event: EventInterface",
            "note": "/**\n* erp集成产品库删除\n* @param event\n*/"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f12",
    "project": "UMC",
    "filename": "global-search.event.ts",
    "groups": [
      {
        "id": "umc_g12",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c12_0",
            "name": "sysGlobalSearchObjectClickAction",
            "lines": 8,
            "event_type": "event: HasModelEventInterface",
            "note": "/**\n* @description 高级搜索Object类型点击事件\n*/"
          },
          {
            "id": "umc_c12_1",
            "name": "sysGlobalSearchIDClickAction",
            "lines": 3,
            "event_type": "event: HasModelEventInterface",
            "note": "/**\n* @description 高级搜索点击ID事件\n*/"
          },
          {
            "id": "umc_c12_2",
            "name": "sysGlobalSearchNameClickAction",
            "lines": 3,
            "event_type": "event: HasModelEventInterface",
            "note": "/**\n* @description 高级搜索点name事件\n*/"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f13",
    "project": "UMC",
    "filename": "milestone-management.event.ts",
    "groups": [
      {
        "id": "umc_g13",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c13_0",
            "name": "sysMilestoneLeftNewCreateAction",
            "lines": 59,
            "event_type": "event: EventInterface",
            "note": "// 新建里程碑"
          },
          {
            "id": "umc_c13_1",
            "name": "sysMilestoneTypeEditAction",
            "lines": 40,
            "event_type": "event: CellSaveEvent",
            "note": "// 里程碑类型编辑"
          },
          {
            "id": "umc_c13_2",
            "name": "sysMilestoneNameLinkClickAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "// 里程碑表格name点击事件"
          },
          {
            "id": "umc_c13_3",
            "name": "sysdeleteMilestoneAction",
            "lines": 31,
            "event_type": "event: EventInterface",
            "note": "// 删除里程碑类型"
          },
          {
            "id": "umc_c13_4",
            "name": "sysMilestoneDragAction",
            "lines": 11,
            "event_type": "event: EventInterface",
            "note": "// 拖拽里程碑"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f14",
    "project": "UMC",
    "filename": "organization.event.ts",
    "groups": [
      {
        "id": "umc_g14",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c14_0",
            "name": "sysOrganNewUserAction",
            "lines": 35,
            "event_type": "event: TableTopToolbarExecuteEvent",
            "note": "/**\n* @use 组织管理表格 - 新建用户，组织管理模块表格顶部工具栏\"新建用户\"按钮点击时触发\n* @type 表格顶部工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_1",
            "name": "sysOrgantEditUserAction",
            "lines": 42,
            "event_type": "event: TableCellToolbarExecuteEvent",
            "note": "/**\n* @use 组织管理表格 - 编辑用户，组织管理模块表格行\"编辑\"按钮点击时触发\n* @type 表格单元格工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_2",
            "name": "sysOrgantUserSaveAction",
            "lines": 43,
            "event_type": "event: EventInterface",
            "note": "/**\n* @ToQY\n* @use 用户页面 - 保存按钮，用户编辑/新建抽屉底部\"保存\"按钮点击时触发\n* @type 通用事件接口\n*/"
          },
          {
            "id": "umc_c14_3",
            "name": "sysOrgantUserSaveNewAction",
            "lines": 31,
            "event_type": "event: EventInterface",
            "note": "/**\n* @ToQY\n* @use 用户页面 - 保存并新建按钮，用户编辑/新建抽屉底部\"保存并新建\"按钮点击时触发\n* @type 通用事件接口\n*/"
          },
          {
            "id": "umc_c14_4",
            "name": "sysOrgantUserCloseAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "/**\n* @ToQY\n* @use 用户页面 - 关闭按钮，用户编辑/新建抽屉底部\"关闭\"按钮点击时触发\n* @type 通用事件接口\n*/"
          },
          {
            "id": "umc_c14_5",
            "name": "rigDelTagAction",
            "lines": 41,
            "event_type": "event: TagDeleteEvent",
            "note": "/**\n* @use 组织管理表格 - 所属部门Tag删除，组织管理模块表格单元格中部门标签删除时触发\n* @type Tag删除事件\n*/"
          },
          {
            "id": "umc_c14_6",
            "name": "agentDelTagAction",
            "lines": 28,
            "event_type": "event: TagDeleteEvent",
            "note": "/**\n* @use 组织管理表格 - 代理人Tag删除，组织管理模块表格单元格中代理人标签删除时触发\n* @type Tag删除事件\n*/"
          },
          {
            "id": "umc_c14_7",
            "name": "sysOrganActiveAction",
            "lines": 99,
            "event_type": "event: SwitchChangeEvent",
            "note": "/**\n* @use 组织管理表格 - 用户生失效切换，组织管理模块表格单元格中用户状态Switch切换时触发\n* @type Switch切换事件\n*/"
          },
          {
            "id": "umc_c14_8",
            "name": "organActiveAgentConfirm",
            "lines": 77,
            "event_type": "closeLoading: (",
            "note": "/**\n* @use 私有方法 - 确认失效代理人设置，用户失效时确认代理人设置\n*/"
          },
          {
            "id": "umc_c14_9",
            "name": "sysOrgantSearchAction",
            "lines": 17,
            "event_type": "event: TableTopToolbarExecuteEvent",
            "note": "/**\n* @use 组织管理表格 - Toolbar搜索，组织管理模块表格顶部搜索框输入时触发\n* @type 表格顶部工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_10",
            "name": "sysOrgantSelectAction",
            "lines": 9,
            "event_type": "event: TableTopToolbarExecuteEvent",
            "note": "/**\n* @use 组织管理表格 - Toolbar下拉筛选，组织管理模块表格顶部\"显示废弃角色\"下拉切换时触发\n* @type 表格顶部工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_11",
            "name": "sysOrgantSetAgentAction",
            "lines": 88,
            "event_type": "event: TableCellToolbarExecuteEvent",
            "note": "/**\n* @use 组织管理表格 - 设置代理人，组织管理模块表格行\"设置代理人\"按钮点击时触发\n* @type 表格单元格工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_12",
            "name": "sysOrgantReSetPawAction",
            "lines": 17,
            "event_type": "event: TableCellToolbarExecuteEvent",
            "note": "/**\n* @use 组织管理表格 - 重置密码，组织管理模块表格行\"重置密码\"按钮点击时触发\n* @type 表格单元格工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_13",
            "name": "sysOrgantUnlockAction",
            "lines": 19,
            "event_type": "event: TableCellToolbarExecuteEvent",
            "note": "/**\n* @use 组织管理表格 - 解锁用户，组织管理模块表格行\"解锁\"按钮点击时触发\n* @type 表格单元格工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_14",
            "name": "sysOrgantRemoveAction",
            "lines": 71,
            "event_type": "event: TableCellToolbarExecuteEvent",
            "note": "/**\n* @use 组织管理表格 - 移动用户，组织管理模块表格行\"移动\"按钮点击时触发\n* @type 表格单元格工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_15",
            "name": "sysOrgantAddUserToRigAction",
            "lines": 60,
            "event_type": "event: TableTopToolbarExecuteEvent",
            "note": "/**\n* @use 组织管理表格 - 添加用户到部门角色，组织管理模块表格顶部\"添加用户到部门角色\"按钮点击时触发\n* @type 表格顶部工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_16",
            "name": "sysOrgantDownloadTempAction",
            "lines": 18,
            "event_type": "event: TableTopToolbarExecuteEvent",
            "note": "/**\n* @use 组织管理表格 - 下载模板，组织管理模块表格顶部\"下载模板\"按钮点击时触发\n* @type 表格顶部工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_17",
            "name": "downloadBlob",
            "lines": 8,
            "event_type": "data: Blob, fileName: string"
          },
          {
            "id": "umc_c14_18",
            "name": "sysOrgantImportUserAction",
            "lines": 90,
            "event_type": "event: TableCellToolbarExecuteEvent",
            "note": "/**\n* @use 组织管理表格 - 导入用户，组织管理模块表格行\"导入用户\"按钮点击时触发\n* @type 表格单元格工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_19",
            "name": "sysClassSynthesisRulesDownloadTempAction",
            "lines": 18,
            "event_type": "event: TableTopToolbarExecuteEvent",
            "note": "/**\n* @use 分类管理 - 下载模板，分类管理模块表格顶部\"下载模板\"按钮点击时触发\n* @type 表格顶部工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_20",
            "name": "sysOrgantGSearchAction",
            "lines": 6,
            "event_type": "event: TableCellToolbarExecuteEvent",
            "note": "/**\n* @use 部门管理表格 - Toolbar搜索，部门管理模块表格工具栏搜索时触发\n* @type 表格单元格工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_21",
            "name": "sysOrganGroupFilterAction",
            "lines": 12,
            "event_type": "event: QuickFilterEvent",
            "note": "/**\n* @use 部门管理表格 - 快速过滤，部门管理模块表格快速过滤时触发\n* @type 快速过滤事件\n*/"
          },
          {
            "id": "umc_c14_22",
            "name": "sysOrganGroupHasExternalFilter",
            "lines": 4,
            "event_type": "event: EventInterface",
            "note": "/**\n* @ToQY\n* @use 部门管理表格 - 是否有外部过滤器，部门管理模块表格检查是否有外部过滤器时触发\n* @type 通用事件接口\n*/"
          },
          {
            "id": "umc_c14_23",
            "name": "sysOrganGroupExternalFilterPasses",
            "lines": 15,
            "event_type": "event: ExtendFilterEvent",
            "note": "/**\n* @use 部门管理表格 - 外部过滤器通过检查，部门管理模块表格外部过滤器通过检查时触发\n* @type 扩展过滤事件\n*/"
          },
          {
            "id": "umc_c14_24",
            "name": "sysNewChildGroupAction",
            "lines": 34,
            "event_type": "event: TableCellToolbarExecuteEvent",
            "note": "/**\n* @use 部门管理表格 - 新建子部门，部门管理模块表格行\"新建子部门\"按钮点击时触发\n* @type 表格单元格工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_25",
            "name": "sysOrganGActiveAction",
            "lines": 74,
            "event_type": "event: SwitchChangeEvent",
            "note": "/**\n* @use 部门管理表格 - 部门生失效切换，部门管理模块表格单元格中部门状态Switch切换时触发\n* @type Switch切换事件\n*/"
          },
          {
            "id": "umc_c14_26",
            "name": "sysOrgantEditGroupAction",
            "lines": 45,
            "event_type": "event: TableCellToolbarExecuteEvent",
            "note": "/**\n* @use 部门管理表格 - 编辑部门，部门管理模块表格行\"编辑\"按钮点击时触发\n* @type 表格单元格工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_27",
            "name": "getRoute",
            "lines": 9,
            "event_type": "node: RowNode"
          },
          {
            "id": "umc_c14_28",
            "name": "sysOrgantGroupSaveAction",
            "lines": 66,
            "event_type": "event: EventInterface",
            "note": "/**\n* @ToQY\n* @use 部门页面 - 保存按钮，部门编辑/新建页面底部\"保存\"按钮点击时触发\n* @type 通用事件接口\n*/"
          },
          {
            "id": "umc_c14_29",
            "name": "sysOrgantGroupSaveNewAction",
            "lines": 41,
            "event_type": "event: EventInterface",
            "note": "/**\n* @ToQY\n* @use 部门页面 - 保存并新建按钮，部门编辑/新建页面底部\"保存并新建\"按钮点击时触发\n* @type 通用事件接口\n*/"
          },
          {
            "id": "umc_c14_30",
            "name": "sysOrgantGroupCloseAction",
            "lines": 3,
            "event_type": "event: EventInterface",
            "note": "/**\n* @ToQY\n* @use 部门页面 - 关闭按钮，部门编辑/新建页面底部\"关闭\"按钮点击时触发\n* @type 通用事件接口\n*/"
          },
          {
            "id": "umc_c14_31",
            "name": "sysOrgantGDownloadTempAction",
            "lines": 17,
            "event_type": "event: TableTopToolbarExecuteEvent",
            "note": "/**\n* @use 部门管理表格 - 下载模板，部门管理模块表格顶部\"下载模板\"按钮点击时触发\n* @type 表格顶部工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_32",
            "name": "sysOrgantImportGroupAction",
            "lines": 95,
            "event_type": "event: TableTopToolbarExecuteEvent",
            "note": "/**\n* @use 部门管理表格 - 导入部门，部门管理模块表格顶部\"导入部门\"按钮点击时触发\n* @type 表格顶部工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_33",
            "name": "sysOrganGroupExportAction",
            "lines": 10,
            "event_type": "event: TableTopToolbarExecuteEvent",
            "note": "/**\n* @use 部门管理表格 - 导出失败数据，部门管理模块表格顶部\"导出失败数据\"按钮点击时触发\n* @type 表格顶部工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_34",
            "name": "sysOrgantGSelectAction",
            "lines": 11,
            "event_type": "event: TableTopToolbarExecuteEvent",
            "note": "/**\n* @use 部门管理表格 - 下拉筛选（Y全部/N仅有效），部门管理模块表格顶部下拉筛选切换时触发\n* @type 表格顶部工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_35",
            "name": "roleDelTagAction",
            "lines": 43,
            "event_type": "event: TagDeleteEvent",
            "note": "/**\n* @use 部门管理表格 - 角色Tag删除，部门管理模块表格单元格中角色标签删除时触发\n* @type Tag删除事件\n*/"
          },
          {
            "id": "umc_c14_36",
            "name": "sysOrgantRSearchAction",
            "lines": 13,
            "event_type": "event: TableTopToolbarExecuteEvent",
            "note": "/**\n* @use 角色管理表格 - Toolbar搜索，角色管理模块表格顶部搜索框输入时触发\n* @type 表格顶部工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_37",
            "name": "sysOrganRActiveAction",
            "lines": 40,
            "event_type": "event: SwitchChangeEvent",
            "note": "/**\n* @use 角色管理表格 - 角色生失效切换，角色管理模块表格单元格中角色状态Switch切换时触发\n* @type Switch切换事件\n*/"
          },
          {
            "id": "umc_c14_38",
            "name": "sysOrgantRSelectAction",
            "lines": 8,
            "event_type": "event: TableTopToolbarExecuteEvent",
            "note": "/**\n* @use 角色管理表格 - Toolbar下拉筛选，角色管理模块表格顶部下拉筛选切换时触发\n* @type 表格顶部工具栏执行事件\n*/"
          },
          {
            "id": "umc_c14_39",
            "name": "sysRoleRowAddAction",
            "lines": 8,
            "event_type": "event: RowSaveEvent",
            "note": "/**\n* @use 角色管理表格 - 添加行/单元格保存，角色管理模块表格行内编辑保存时触发\n* @type 行保存事件\n*/"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f15",
    "project": "UMC",
    "filename": "page-mess.event.ts",
    "groups": [
      {
        "id": "umc_g15",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c15_0",
            "name": "sysOrganSMenuClick",
            "lines": 44,
            "event_type": "event: EventInterface",
            "note": "/**\n* 组织结构菜单点击事件\n* @param event 事件对象\n* @use 产品设计二级页面menu行点击\n*/"
          },
          {
            "id": "umc_c15_1",
            "name": "sysTableClick",
            "lines": 7,
            "event_type": "event: EventInterface",
            "note": "/**\n* table文件夹点击事件\n* @param event 事件对象\n* @use 产品设计二级页面table文件夹点击\n*/"
          },
          {
            "id": "umc_c15_2",
            "name": "SysBomTemplateRelationRowClick",
            "lines": 26,
            "event_type": "event: EventInterface",
            "note": "/**\n* BOM模板行点击事件\n* @param event 事件对象\n*/"
          },
          {
            "id": "umc_c15_3",
            "name": "SysAssocitionTemplateBusinessRowClick",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "/**\n* BOM模板行点击事件\n* @param event 事件对象\n*/"
          },
          {
            "id": "umc_c15_4",
            "name": "menuClick",
            "lines": 10,
            "event_type": "event: EventInterface, paramsKeysArr: string[]",
            "note": "/** 菜单点击事件（公用）\n* @param event\n* @param paramsKey\n*/"
          },
          {
            "id": "umc_c15_5",
            "name": "sysDerRuleMenuClick",
            "lines": 74,
            "event_type": "event: EventInterface",
            "note": "// 派生规则菜单点击事件"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f16",
    "project": "UMC",
    "filename": "permission.event.ts",
    "groups": [
      {
        "id": "umc_g16",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c16_0",
            "name": "sysNewDPermCommandAction",
            "lines": 30,
            "event_type": "event: EventInterface"
          },
          {
            "id": "umc_c16_1",
            "name": "sysDPermCheckAction",
            "lines": 56,
            "event_type": "event: EventInterface"
          },
          {
            "id": "umc_c16_2",
            "name": "sysCheckSimulationAction",
            "lines": 27,
            "event_type": "event: EventInterface"
          },
          {
            "id": "umc_c16_3",
            "name": "sysDPermDeleteAction",
            "lines": 16,
            "event_type": "event: EventInterface"
          },
          {
            "id": "umc_c16_4",
            "name": "sysPerBatchDeleteAction",
            "lines": 66,
            "event_type": "event: EventInterface"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f17",
    "project": "UMC",
    "filename": "public.event.ts",
    "groups": [
      {
        "id": "umc_g17",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c17_0",
            "name": "sysOpenBlankHasPMChangeAction",
            "lines": 29,
            "event_type": "event: HasModelEventInterface, config?: BlankInterface",
            "note": "/**\n* 处理包含有项目变更单的跳转函数\n* @param event\n*/"
          },
          {
            "id": "umc_c17_1",
            "name": "sysOpenDrawerHasPMChangeAction",
            "lines": 28,
            "event_type": "event: HasModelEventInterface, config?: BlankInterface",
            "note": "/**\n* 处理包含有项目变更单的打开抽屉函数\n* @param event\n*/"
          },
          {
            "id": "umc_c17_2",
            "name": "sysOpenGeneralDrawerAction",
            "lines": 3,
            "event_type": "event: HasModelEventInterface, config?: BlankInterface",
            "note": "/**\n* 通用打开实例抽屉方法（包含打开其他项目）\n* @action 注意！与后端约定，数据中带BASEURI字段，这个字段代表打开的对象属于哪个项目\n* @param event\n*/"
          },
          {
            "id": "umc_c17_3",
            "name": "sysOpenGeneralBlankAction",
            "lines": 3,
            "event_type": "event: HasModelEventInterface, config?: BlankInterface",
            "note": "/**\n* 通用打开实例页签方法（包含打开其他项目）\n* @action 注意！与后端约定，数据中带BASEURI字段，这个字段代表打开的对象属于哪个项目\n* @add 添加特殊情况处理specialCaseFn\n* @param event\n*/"
          },
          {
            "id": "umc_c17_4",
            "name": "executeGeneralAction",
            "lines": 19,
            "event_type": "event: HasModelEventInterface, actionFn: (handleConfig: CellClickGeneralCall",
            "note": "/**\n* 执行一般动作函数\n*\n* 该函数用于处理一个通用动作事件，根据是否提供了特定配置来决定执行的动作\n* 它允许在不修改原有动作函数的情况下，引入特定场景下的特殊处理逻辑\n*\n* @param event - 事件对象，包含模型事件的相关信息\n* @param actionFn - 动作函数，当事件触发时会被调用\n* @param config - 可选的空白配置对象，用于传递额外的配置信息\n*/"
          },
          {
            "id": "umc_c17_5",
            "name": "sysOpenGeneralDrawerFn",
            "lines": 17,
            "event_type": "handleConfig: CellClickGeneralCall",
            "note": "/**\n* 打开系统通用抽屉函数\n* 该函数用于处理点击事件后打开抽屉的操作，根据不同的配置展示不同的内容\n* @param handleConfig - 包含抽屉配置的对象，包括属性、模型、参数等信息\n*/"
          },
          {
            "id": "umc_c17_6",
            "name": "sysOpenGeneralBlankFn",
            "lines": 18,
            "event_type": "handleConfig: CellClickGeneralCall",
            "note": "/**\n* 打开新窗口的通用函数\n* 该函数用于在点击表格单元格后，根据配置信息打开一个新的窗口或标签页\n*\n* @param handleConfig 包含打开新窗口所需配置信息的对象\n*/"
          },
          {
            "id": "umc_c17_7",
            "name": "cellClickGeneralAction",
            "lines": 104,
            "event_type": "event: HasModelEventInterface, config?: BlankInterface",
            "note": "/**\n* 单元格点击通用处理\n* @param event\n* @returns\n*/"
          },
          {
            "id": "umc_c17_8",
            "name": "positionLinkAction",
            "lines": 17,
            "event_type": "event: HasModelEventInterface, data?: Record<string, DppSafeAny>",
            "note": "/**\n* 公用内置位置跳转\n* @param event\n* @param data\n*/"
          },
          {
            "id": "umc_c17_9",
            "name": "sysSelectLocationFilterAction",
            "lines": 8,
            "event_type": "event: EventInterface",
            "note": "// 全局搜索/添加位置 -> 表格过滤"
          },
          {
            "id": "umc_c17_10",
            "name": "sysCopyObjectAction",
            "lines": 34,
            "event_type": "event: EventInterface",
            "note": "/**\n* @description 复制\n* @use 高级搜索页面\n* @param event\n*/"
          },
          {
            "id": "umc_c17_11",
            "name": "sysStartDonwloadAction",
            "lines": 25,
            "event_type": "event: EventInterface",
            "note": "/**\n* 下载附件\n* @param event\n* @use 高级搜索页面\n*/"
          },
          {
            "id": "umc_c17_12",
            "name": "downloadAttach",
            "lines": 25,
            "event_type": "guid: string, classGuid: string, boGuidList?: string[], fileTypeList?: string[]"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f18",
    "project": "UMC",
    "filename": "relation-template.event.ts",
    "groups": [
      {
        "id": "umc_g18",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c18_0",
            "name": "tempSysRelationTemplateToggleAction",
            "lines": 12,
            "event_type": "event: EventInterface",
            "note": "// 切换关联模板状态（废）"
          },
          {
            "id": "umc_c18_1",
            "name": "tempSysRelationSaveAction",
            "lines": 40,
            "event_type": "event: EventInterface",
            "note": "// 关联模板表单保存"
          },
          {
            "id": "umc_c18_2",
            "name": "tempSysRelationBusinessObjectToggleAction",
            "lines": 14,
            "event_type": "event: EventInterface",
            "note": "// 切换关联业务对象状态(废弃)"
          },
          {
            "id": "umc_c18_3",
            "name": "deleteRelationTemplateEnd1Action",
            "lines": 7,
            "event_type": "event: EventInterface",
            "note": "// 删除父阶业务对象"
          },
          {
            "id": "umc_c18_4",
            "name": "addRelationTemplateEnd2Action",
            "lines": 47,
            "event_type": "event: EventInterface",
            "note": "// 添加子阶业务对象"
          },
          {
            "id": "umc_c18_5",
            "name": "deleteRelationTemplateEnd2Action",
            "lines": 24,
            "event_type": "event: EventInterface",
            "note": "// 删除子阶业务对象"
          },
          {
            "id": "umc_c18_6",
            "name": "sysRelationNewTemplateAction",
            "lines": 9,
            "event_type": "event: EventInterface",
            "note": "// 新增关系模板"
          },
          {
            "id": "umc_c18_7",
            "name": "sysRelationTemplateSearchAction",
            "lines": 19,
            "event_type": "event: EventInterface",
            "note": "// 关系模板搜索"
          },
          {
            "id": "umc_c18_8",
            "name": "sysAssociationTemplateFilterAction",
            "lines": 27,
            "event_type": "event: EventInterface",
            "note": "// 关联模板过滤"
          },
          {
            "id": "umc_c18_9",
            "name": "sysAssociationBusinessFilterAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "// 关联业务对象过滤"
          },
          {
            "id": "umc_c18_10",
            "name": "sysRelationTemplateEditAction",
            "lines": 10,
            "event_type": "event: EventInterface",
            "note": "// 关联模板编辑"
          },
          {
            "id": "umc_c18_11",
            "name": "sysRelationTemplateCopyAddAction",
            "lines": 12,
            "event_type": "event: EventInterface",
            "note": "// 复制新增"
          },
          {
            "id": "umc_c18_12",
            "name": "addRelationTemplateEnd1Action",
            "lines": 42,
            "event_type": "event: EventInterface",
            "note": "// 添加父阶业务对象"
          },
          {
            "id": "umc_c18_13",
            "name": "sysRelationBusinessObjectAddAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "// 关联业务对象添加"
          },
          {
            "id": "umc_c18_14",
            "name": "sysRelationBusinessEditAction",
            "lines": 13,
            "event_type": "event: EventInterface",
            "note": "// 编辑关联关系"
          },
          {
            "id": "umc_c18_15",
            "name": "sysAssociationTemplateUpdateValidAction",
            "lines": 25,
            "event_type": "event: SwitchChangeEvent",
            "note": "// 关联模板生失效"
          },
          {
            "id": "umc_c18_16",
            "name": "sysRelationBusinessObjectUpdateValidAction",
            "lines": 25,
            "event_type": "event: SwitchChangeEvent",
            "note": "// 关联关系对象生失效"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f19",
    "project": "UMC",
    "filename": "role.event.ts",
    "groups": [
      {
        "id": "umc_g19",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c19_0",
            "name": "tempSysAddRoleAction",
            "lines": 73,
            "event_type": "event: EventInterface",
            "note": "// 添加角色"
          },
          {
            "id": "umc_c19_1",
            "name": "tempSysNewRoleFormSaveAction",
            "lines": 35,
            "event_type": "event: EventInterface",
            "note": "// 编辑角色"
          },
          {
            "id": "umc_c19_2",
            "name": "stopORstart",
            "lines": 10,
            "event_type": "roleID: string, roleGuid: string, YorN: string"
          },
          {
            "id": "umc_c19_3",
            "name": "tempSysRoleToggleAction",
            "lines": 21,
            "event_type": "event: EventInterface",
            "note": "// 启用/停用角色"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f20",
    "project": "UMC",
    "filename": "rule-management.event.ts",
    "groups": [
      {
        "id": "umc_g20",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c20_0",
            "name": "EditionRuleSaveAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "/**  版本规则保存\n* @param event\n*/"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f21",
    "project": "UMC",
    "filename": "security-settings.event.ts",
    "groups": [
      {
        "id": "umc_g21",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c21_0",
            "name": "SecuritySettingsUserInfoSaveAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "/** 安全设置用户信息保存\n* @param event\n*/"
          },
          {
            "id": "umc_c21_1",
            "name": "SecuritySettingsWaterMarkSaveAction",
            "lines": 6,
            "event_type": "event: EventInterface",
            "note": "/**\n* 安全设置水印保存\n*\n* @param {EventInterface} event\n* @memberof SecuritySettingsEvent\n*/"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f22",
    "project": "UMC",
    "filename": "user.event.ts",
    "groups": [
      {
        "id": "umc_g22",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c22_0",
            "name": "sysGetHomeDefaultRoute",
            "lines": 4,
            "event_type": "event: RouteDynaGetDeaultEvent"
          },
          {
            "id": "umc_c22_1",
            "name": "tempSysNewUserAction",
            "lines": 79,
            "event_type": "event: EventInterface",
            "note": "// 添加用户"
          },
          {
            "id": "umc_c22_2",
            "name": "tempSysNewUserFormSaveAction",
            "lines": 41,
            "event_type": "event: EventInterface",
            "note": "// 编辑用户"
          },
          {
            "id": "umc_c22_3",
            "name": "stopORstart",
            "lines": 10,
            "event_type": "userID: string, userGuid: string, YorN: string"
          },
          {
            "id": "umc_c22_4",
            "name": "tempSysUserToggleAction",
            "lines": 18,
            "event_type": "event: EventInterface",
            "note": "// 启用/停用用户"
          },
          {
            "id": "umc_c22_5",
            "name": "tempSysUserImportAction",
            "lines": 28,
            "event_type": "event: EventInterface",
            "note": "// 导入"
          },
          {
            "id": "umc_c22_6",
            "name": "UnlockAction",
            "lines": 16,
            "event_type": "event: EventInterface",
            "note": "/**\n* 用户管理-更多-解锁\n* @param event\n*/"
          },
          {
            "id": "umc_c22_7",
            "name": "tempSysUserSearchAction",
            "lines": 9,
            "event_type": "event: EventInterface",
            "note": "// 用户搜索"
          },
          {
            "id": "umc_c22_8",
            "name": "tempSysUserResetAction",
            "lines": 15,
            "event_type": "event: EventInterface",
            "note": "// 重置密码"
          }
        ]
      }
    ]
  },
  {
    "id": "umc_f23",
    "project": "UMC",
    "filename": "workflow-template.event.ts",
    "groups": [
      {
        "id": "umc_g23",
        "name": "全部函数",
        "cards": [
          {
            "id": "umc_c23_0",
            "name": "sysWFTemplateNewAction",
            "lines": 28,
            "event_type": "event: EventInterface",
            "note": "// 新建流程模板"
          },
          {
            "id": "umc_c23_1",
            "name": "sysWFTemplateSearchAction",
            "lines": 24,
            "event_type": "event: EventInterface",
            "note": "// 流程模板搜索"
          },
          {
            "id": "umc_c23_2",
            "name": "sysWFSelectTemplateAction",
            "lines": 22,
            "event_type": "event: EventInterface",
            "note": "// 表格过滤(所有模板/仅生效模板)"
          },
          {
            "id": "umc_c23_3",
            "name": "_searchAdd",
            "lines": 7,
            "event_type": "condition: QueryCondition, value: string"
          },
          {
            "id": "umc_c23_4",
            "name": "sysWFUpdateValidAction",
            "lines": 36,
            "event_type": "event: SwitchChangeEvent",
            "note": "// 生失效更新"
          },
          {
            "id": "umc_c23_5",
            "name": "sysWFActivitySettingAction",
            "lines": 25,
            "event_type": "event: EventInterface",
            "note": "// 流程活动设置"
          },
          {
            "id": "umc_c23_6",
            "name": "sysWFPermissionSettingAction",
            "lines": 22,
            "event_type": "event: EventInterface",
            "note": "// 流程权限设置"
          },
          {
            "id": "umc_c23_7",
            "name": "sysWFErpIntegrateAction",
            "lines": 22,
            "event_type": "event: EventInterface",
            "note": "// ERP集成设置"
          },
          {
            "id": "umc_c23_8",
            "name": "sysWFTCopyAndNewAction",
            "lines": 38,
            "event_type": "event: EventInterface",
            "note": "// 复制新建"
          },
          {
            "id": "umc_c23_9",
            "name": "sysWFTViewAndModifyAction",
            "lines": 38,
            "event_type": "event: EventInterface",
            "note": "// 查看修改"
          },
          {
            "id": "umc_c23_10",
            "name": "sysWFSelectOCRemoveAction",
            "lines": 22,
            "event_type": "event: EventInterface",
            "note": "// 选择对象及分类的移除"
          }
        ]
      }
    ]
  }
];