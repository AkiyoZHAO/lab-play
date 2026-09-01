# AGENTS.md — 给 coding agent 的工作规则

本文件是在这个 repo 里工作的硬性约束。动手前先读它，以及 [`lab-play-system-design.md`](lab-play-system-design.md)（设计哲学）和 [`design/DESIGN.md`](design/DESIGN.md)（视觉规范）。

---

## 一、这是什么

lab-play 是一个**个人游戏系统**网站——不是工具箱，是一个有整体感、重体验的游戏系统。抽卡是第一个玩法（play），之后会不断加新玩法。价值在**玩法创意与 UI 体验**，不在功能复杂度。

---

## 二、不可违背的原则（来自项目书）

1. **单向流水账**：events 只记录「发生了什么」。**不做**双向货币（赚币-花币-兑换定价），**不做**手动定价的消费出口——这是最容易半途而废的环节。
2. **记账动作要最轻**：先把原始事件存下来，规则（分档定价、成就阈值）后置、可随时调整，不影响底层数据。
3. **events 是唯一真相源**：统计 / 图鉴 / 回顾都是对 events 表的读视图，**不单独存状态、不新增业务表**。图鉴 = 基于规则扫描事件表，而非另存一份成就状态。
4. **极简、低摩擦**：不因为「更完整」就引入违背极简的复杂度（例如手动搬运外部打卡数据）。

---

## 三、视觉规则（重 UI 项目的核心纪律）

完整规范见 [`design/DESIGN.md`](design/DESIGN.md)，要点：

- **基调**：中性色 · light · 简约雅致。大量留白、克制色彩、精致排版、微妙动效。
- **唯一视觉来源**是 [`design/tokens.css`](design/tokens.css)。所有颜色 / 间距 / 字号 / 圆角 / 动效**从 token 取，禁止写死**。
- **不新增局部风格**：需要新 token 时加进 `tokens.css`（全站共享），不在单个页面硬编码新字体 / 新强调色 / 新圆角体系。
- **一个界面一个焦点**：主动作用强调色，其余中性。
- **动效慢而柔**，服务于反馈而非表演。
- 检验标准：新页面截图和主菜单并排，应一眼看出「是同一个网站」。

---

## 四、如何新增一个 play（标准流程）

1. 在 `plays/<name>/` 建目录，放 `index.html`（页面）和 `README.md`（玩法意图 + 写哪些 event）。
2. 页面里：
   - `<link rel="stylesheet" href="../../design/tokens.css">` 引入设计 token；
   - 若要读写事件，先引 supabase-js CDN，再 import events.js：
     ```html
     <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
     <script type="module">
       import { logEvent, updateEvent, queryEvents } from '../../core/events.js';
     </script>
     ```
3. 在 `plays.json` 的 `plays` 数组加一条（`id / name / desc / icon / path / status`）。
4. 完成——主菜单 `index.html` 会自动列出这个入口，**不用改首页代码**。

> 账本视图（不产生新数据、只汇总的页面，如统计）放 `views/<name>/`，流程同上，加进 `plays.json` 的 `views` 数组。

---

## 五、数据写入约定

- **一律通过 [`core/events.js`](core/events.js) 读写**，禁止在 play 里自己建 Supabase client 或直接查 events 表。这样「唯一写入口」的语义才成立。
- 事件格式：`play`（哪个玩法）/ `type`（事件类型）/ `payload`（该玩法自定义的 JSON）。新玩法**不改表结构**，自定义内容全塞进 `payload`。
- 数据层是**纯静态 + Supabase**，前端直连 events 表（靠 RLS 兜底），表结构与策略见 [`db/schema.sql`](db/schema.sql)。但 play 代码**只认 `core/events.js`**，不直接建 Supabase client。

---

## 六、技术与代码风格

- 前端：**纯静态、原生 ES module、零构建、零打包器**。不引框架、不加构建步骤（这本身是「极简」原则的一部分）。
- 承接全局 CLAUDE.md 的纪律：动手前说清计划、复杂改动先确认；只改与任务相关的代码，不顺手重构无关部分；不删有效注释；修 bug 先定位根因，不用 try/catch 或改配置掩盖问题；不确定 API/库用法时先看现有用法保持风格一致。
- 中文沟通与文档。
