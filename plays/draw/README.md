# 抽卡 play（draw）

> 状态：**骨架待实现**。本文件说明这个玩法的意图和它与账本（events）的关系，供后续轮次落地。

## 玩法意图

对抗决策疲劳的随机触发器：不知道现在想干嘛、又不想刷手机时，随机抽一件「有点意思但不想设为每日任务」的事来做（弹琴、唱歌、看书、画画……），配一个倒计时陪你做完。

## 计划中的机制（下一轮实现）

- **按能量/时长分档抽卡**（R/SR/SSR），先选当前能量档 → 再在档内随机，避免「只剩 5 分钟电却抽到 30 分钟任务」的错配。具体档位阈值和活动清单由用户定。
- **倒计时**：抽中后陪跑一段时间；需保留原实现里「记录绝对结束时间点、切后台不失准」的做法。
- **两段式反馈**：抽中即记录，反馈后更新状态（见下）。

## 与 events 的关系

一律通过 [`core/events.js`](../../core/events.js) 读写，不自己建 Supabase client。

| 时机 | 调用 | type | payload 示例 |
|---|---|---|---|
| 抽中的瞬间 | `logEvent('draw', 'draw_pending', {...})` | `draw_pending` | `{ "activity": "弹钢琴", "tier": "SR" }` |
| 反馈「做了」 | `updateEvent(id, { type: 'draw_done', payload })` | `draw_done` | `{ "activity": "弹钢琴", "tier": "SR", "duration": 30 }` |
| 反馈「没做」 | `updateEvent(id, { type: 'draw_skip', payload })` | `draw_skip` | 同上 |

两段式的意义：抽中瞬间就落一条 `draw_pending`，即使中途关页面/换设备，也不会丢失「抽过这一签」的痕迹。

## 视觉约束

遵守 [`design/DESIGN.md`](../../design/DESIGN.md)：只引 `design/tokens.css`，中性 light 雅致基调，一个界面一个焦点，动效慢而柔。抽卡动画要克制，不做浮夸弹跳。
