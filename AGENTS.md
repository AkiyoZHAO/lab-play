# AGENTS.md — 给 coding agent 的工作规则

本文件是在这个 repo 里工作的硬性约束。动手前先读它，以及 [`ROADMAP.md`](ROADMAP.md)（定位 · 蓝图 · 决策）和 [`design/DESIGN.md`](design/DESIGN.md)（视觉规范）。

---

## 一、这是什么

lab-play 是一个自己拥有的**个人空间**，承载人生系统。内容分两类：**玩法**（flow 型，写 events，如抽卡）/ **面板**（state 型，自持状态，如统计、事业）。价值在内容与 UI 体验，不在功能复杂度。

定位、分层 + anchor 契约、TODO 见 [`ROADMAP.md`](ROADMAP.md)。

---

## 二、不可违背的原则

1. **单向流水账**：events 只记录「发生了什么」。**不做**双向货币（赚币-花币-兑换定价），**不做**手动定价的消费出口——这是最容易半途而废的环节。
2. **记账动作要最轻**：先把原始事件存下来，规则（分档定价、成就阈值）后置、可随时调整，不影响底层数据。
3. **events 是共享时间线**（不再是「唯一状态存储」）：玩法的行动、面板的里程碑都写进这条线；回顾 / 统计 / Dashboard 对它做读视图。但**面板的当前状态由面板自己持有**（如事业面板先用 Markdown 文档态），不要求一切都能从 events 重建。玩法侧不自存历史，历史交给 events。
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

## 四、如何新增玩法 / 面板（标准流程）

新增任何内容 = 多一个 anchor（`play:<id>` 或 `panel:<id>`），首页据清单自动列出，**不用改首页代码**；UI 需为未显式摆位的 anchor 提供默认兜底（见项目书〔五〕）。

**新增玩法（flow 型，写 events）：**

1. 在 `plays/<name>/` 建目录，放 `index.html`（页面）和 `README.md`（玩法意图 + 写哪些 event）。
2. 页面里：
   - `<link rel="stylesheet" href="../../design/tokens.css">` 引入设计 token；
   - 若要写事件，先引 supabase-js CDN，再 import events.js：
     ```html
     <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
     <script type="module">
       import { logEvent, updateEvent, queryEvents } from '../../core/events.js';
     </script>
     ```
3. 在 `plays.json` 加一条清单（`id / name / desc / icon / path / status`）。

**新增面板（state 型，展示 / 维护状态）：**

1. 在 `panels/<name>/` 建目录，放 `index.html`（+ 可选 `README.md`）。可参考已有的 `panels/stats/`、`panels/career/`。
2. 数据来源二选一：
   - **自持状态型**（如事业）：公开摘要与私有正文由面板自己的数据入口维护（事业现用 `panel_states` / `panel_private`，公开 Markdown 仅作空白模板与 fallback）；**里程碑**通过 events.js emit 一条事件。
   - **聚合型**（如总览 Dashboard、统计）：`queryEvents` 读 events 聚合，只读、不自存状态。
3. 在 `plays.json` 加一条清单。

> 「账本视图」已并入「面板」：Dashboard 在 `panels/stats/`、事业在 `panels/career/`、图鉴在 `panels/collection/`；`plays.json` 用 `plays[]` + `panels[]` 两个数组。

---

## 五、数据写入约定

- **一律通过 [`core/events.js`](core/events.js) 读写**，禁止在玩法 / 面板里自己建 Supabase client 或直接查 events 表。这样「唯一写入口」的语义才成立。
- 事件格式：`play`（来源：哪个玩法 / 面板，如 `draw` / `career`）/ `type`（事件类型）/ `payload`（该来源自定义的 JSON）。新内容**不改表结构**，自定义部分全塞进 `payload`。
- 数据层是**纯静态 + Supabase**，前端直连 events 表（靠 RLS 兜底），表结构与策略见 [`db/schema.sql`](db/schema.sql)。但玩法 / 面板代码**只认 `core/events.js`**，不直接建 Supabase client。

---

## 六、技术与代码风格

- 前端：**纯静态、原生 ES module、零构建、零打包器**。不引框架、不加构建步骤（这本身是「极简」原则的一部分）。
- **别删仓库根的 `.nojekyll`**：它关掉 GitHub Pages 的 Jekyll，让 `.md` 等文件按原样提供。事业面板仍会 `fetch` 公开 Markdown 模板作初始值 / fallback，删了它公网会 404（本地静态服务器不受影响，坑很隐蔽）。
- 承接全局 CLAUDE.md 的纪律：动手前说清计划、复杂改动先确认；只改与任务相关的代码，不顺手重构无关部分；不删有效注释；修 bug 先定位根因，不用 try/catch 或改配置掩盖问题；不确定 API/库用法时先看现有用法保持风格一致。
- 中文沟通与文档。
