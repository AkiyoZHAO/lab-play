# lab-play

一个属于自己的**个人游戏系统**网站。把散落的「下班后想做点什么」收敛成可玩、可回顾的玩法（play），用游戏化的方式对抗倦怠。

抽卡是第一个玩法，之后会持续加入更多。设计哲学见 [`lab-play-system-design.md`](lab-play-system-design.md)：**极简、低摩擦、单向记账、events 表是唯一真相源**。

> 这是一个「重 UI」的项目——玩法本身实现不难，价值在于玩法创意与体验设计。所有玩法必须共享同一套视觉语言，见 [`design/DESIGN.md`](design/DESIGN.md)。

## 架构（三层）

```
① 游戏外壳   index.html            主菜单，读 plays.json 渲染所有玩法入口
② 各玩法     plays/<name>/         每个玩法自包含（页面 + 说明）
   账本视图  views/<name>/         消费 events 的只读视图（如统计），不是玩法
③ 共享核心   core/                 数据与逻辑：events 读写、前端配置
             design/               视觉语言：设计 token + 规范
```

数据层：**纯静态 + Supabase**。前端通过 [`core/events.js`](core/events.js) 直连 Supabase 的 events 表读写（靠 RLS 策略兜底），零后端、零构建、零部署步骤。

## 数据流

```
[某个 play] --logEvent--> [core/events.js] --supabase-js--> [Supabase events 表]
                                                                     │
[views/stats 等] <--queryEvents-- [core/events.js] <----- select ----┘
```

events 表是唯一真相源，统计 / 图鉴 / 回顾都是它的读视图，不单独存状态。表结构见 [`db/schema.sql`](db/schema.sql)。

## 目录

| 路径 | 说明 |
|---|---|
| `index.html` | 主菜单（清单驱动） |
| `plays.json` | 玩法 / 视图清单 |
| `plays/` | 各玩法，每个一个自包含目录 |
| `views/` | 账本视图（统计等） |
| `core/` | 共享逻辑：`config.js`（Supabase 配置）、`events.js`（事件读写） |
| `design/` | 设计系统：`tokens.css`（设计 token）、`DESIGN.md`（规范） |
| `db/` | `schema.sql`：events 表结构 + RLS 策略（在 Supabase SQL Editor 执行） |
| `AGENTS.md` | 给 coding agent 的规则（含「如何新增一个 play」） |
| `lab-play-system-design.md` | 项目书 / 设计哲学 |

## 本地开发

前端是纯静态、零构建，用任意静态服务器起（因为用了 ES module，直接 `file://` 打开会被 CORS 挡住）：

```bash
python3 -m http.server 8000
```

然后打开 http://localhost:8000 。数据存在 Supabase，配置在 [`core/config.js`](core/config.js)（URL + anon key，anon key 设计成可公开、靠 RLS 兜底）。首次使用需在 Supabase 项目的 SQL Editor 执行 [`db/schema.sql`](db/schema.sql) 建表。

## 部署

纯静态，GitHub Pages 或任意静态托管直接发布，push 即上线，无构建步骤。

## 现状

抽卡玩法已落地（分档抽卡 + 倒计时 + 两段式写 events）。统计视图已落地（对 events 的只读汇总）。图鉴系统在项目书中已规划，等账本数据再长一点后加。
