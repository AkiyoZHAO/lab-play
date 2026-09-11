# Collection

成就型图鉴：把共享时间线中的累计行为与阈值匹配，达到条件后点亮人物或称号。

当前条目：

- **李斯特**：所有 `draw_done` 中“弹钢琴”的 `payload.duration` 累计达到 300 分钟。

## 数据契约

- 图鉴定义在 [`achievements.json`](achievements.json)，新增成就不改页面逻辑。
- 当前支持 `activity_minutes`：按活动名称累计完成分钟数，跨 R / SR / SSR 合并。
- 只统计 `draw_done`；`draw_pending`、`draw_skip` 和 Career milestone 均不计入。
- 图鉴不自存进度，解锁状态与首次达成日期始终由 events 重算。
