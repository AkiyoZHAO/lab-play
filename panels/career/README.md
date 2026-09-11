# Career Panel

Career 是 state 型面板，数据分三层：

- [`career-turnaround.md`](career-turnaround.md)：公开的空白模板与首次加载 fallback，不得填写敏感内容。
- `panel_states`：公开摘要（level、RTO、公开 next、各 section 状态与 activation）。
- `panel_private`：Owner 私有 Markdown 正文，以及 lanes、bottleneck、biggest unknown 等私有上下文；详情下钻登录后才读取。

Owner 可在网页内编辑摘要和各 section 正文。摘要跨越 readiness、section status 或 activation 阈值时，通过 [`core/events.js`](../../core/events.js) 写入 `career_milestone`，当前状态仍由面板表持有。
