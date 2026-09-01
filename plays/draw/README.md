# 抽卡 play（draw）

> 状态：**核心玩法已实现**（分档抽卡 + 倒计时 + 两段式写 events）。代币展示、图鉴留待后续轮次。

## 玩法

对抗决策疲劳的随机触发器：先选「现在有多少电」（能量档），再在该档随机抽一张活动卡，配倒计时陪你做完。

**分档（扭蛋稀有度）**：活动按体力/心力消耗分档，抽卡前先选档，避免「只剩 5 分钟电却抽到 30 分钟任务」的错配。

| 档位 | 时长 | 完成代币 |
|---|---|---|
| R（低消耗） | 5 min | 5 |
| SR（中消耗） | 15 min | 15 |
| SSR（高消耗） | 30 min | 30 |

**时间代币**：完成一张卡，按卡面时长记账，**1 分钟 = 1 代币**。代币和某活动的累计时长都从 events 表算出来（本轮已把 `duration` 写进 payload，展示/图鉴留待下轮）。

## 配置卡池

各档放哪些活动、时长多少，全在 [`cards.json`](cards.json)。改活动 = 改这个文件，不动代码：

```json
{ "tiers": [ { "id": "R", "duration": 5, "desc": "低消耗 · 5 分钟", "activities": ["…"] }, … ] }
```

`duration` 单位分钟，既是倒计时时长，也是完成后写入 payload 的代币数（1:1）。

## 与 events 的关系

一律通过 [`core/events.js`](../../core/events.js) 读写，不自己建 Supabase client。

| 时机 | 调用 | type | payload |
|---|---|---|---|
| 抽中的瞬间 | `logEvent('draw','draw_pending',payload)` | `draw_pending` | `{ tier, activity, duration }` |
| 反馈「做了」 | `updateEvent(id,{type:'draw_done',payload})` | `draw_done` | 同上 |
| 反馈「没做」 | `updateEvent(id,{type:'draw_skip',payload})` | `draw_skip` | 同上 |

两段式：抽中瞬间就落一条 `draw_pending`，即使中途关页面/换设备也不丢这次抽卡的痕迹；反馈时更新这条记录的 type，而非新插一条。

## 实现要点

- **倒计时抗后台失准**：记录绝对结束时间点，每次用真实时间差算剩余，切后台/锁屏回来不累积误差。
- **刷新/被杀恢复**：页面打开时读 localStorage，若有未结束的一轮，自动恢复到抽卡阶段。

## 视觉约束

遵守 [`design/DESIGN.md`](../../design/DESIGN.md)：只引 `design/tokens.css`，中性 light 雅致，抽卡动画克制。

## 待实现（下一轮）

- 时间代币的累计展示（读 events 算）
- 图鉴/成就点亮（如「钢琴家 Lv1 = 累计弹满 5h」，读 events 扫描规则）
