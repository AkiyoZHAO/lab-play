# Dashboard（stats）

> 状态：**已实现**（widget 网格 + 时间范围 + KPI + 月历 + Career readiness + 趋势/排行/时间线）。

## 定位

落实项目书里的「周期性回顾摘要」：把累积的事件转化为可感知的「这段时间其实做了这些」的证据，对抗「好像什么都没留下」的空虚感。终点是**证据**，不是奖励。

## 本页展示

- 时间范围：最近 7 天 / 30 天 / 全部（按本地时区切日）
- KPI：完成、跳过、完成率、时间代币（完成分钟累计，1 分钟 = 1 代币）
- 完成占比、每日痕迹（跨度超过 31 天改按周）、本月事件日历、活动完成率排行、最近痕迹列表
- Career 面板 readiness / RTO / 下一步摘要
- 最近时间线同时展示玩法事件和 Career milestone；玩法 KPI 只统计 draw，不把面板事件误算为 pending
- 时间代币只来自 `draw_done.payload.duration`；面板 milestone 不参与代币计算
- 完成率分母是已结算（完成 + 跳过）；进行中的 pending 单独计数，不计入完成率

## 与 events 的关系

只读，通过 [`core/events.js`](../../core/events.js) 的 `queryEvents` 拉事件，在前端聚合。**不新增任何表、不单独存状态**——所有数字都是对 events 表的实时计算。

## 视觉约束

遵守 [`design/DESIGN.md`](../../design/DESIGN.md)：中性 light 雅致，图表配色用中性阶 + `--c-positive` / `--c-negative`，不堆高饱和色块。不引图表库。
