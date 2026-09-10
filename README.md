# lab-play

一个自己拥有的**个人空间**,承载我的人生系统。纯静态、自建、UI 可换,不寄居别人平台。

- **玩法 Play** — 一次性行动,写 events(如抽卡)
- **面板 Panel** — 展示 / 维护状态(如统计、事业)
- **events 表** — 共享时间线

> 蓝图 · 待办 · 决策见 [`ROADMAP.md`](ROADMAP.md);agent 规则见 [`AGENTS.md`](AGENTS.md);视觉规范见 [`design/DESIGN.md`](design/DESIGN.md)。

## 文件系统

```
lab-play/
├── index.html          首页(读 plays.json,渲染玩法 / 面板两栏)
├── plays.json          清单:{ plays[], panels[] }
├── plays/
│   └── draw/           抽卡
├── panels/
│   ├── stats/          统计(读 events)
│   └── career/         事业(读 career-turnaround.md)
├── core/               config.js · events.js(事件读写唯一入口)
├── db/                 schema.sql:events 表 + RLS
├── design/             tokens.css(唯一视觉来源)· DESIGN.md
├── README.md
├── AGENTS.md           agent 规则
└── ROADMAP.md          蓝图 · 待办 · 决策
```

## 跑起来

```bash
python3 -m http.server 8000
```

打开 http://localhost:8000 。数据在 Supabase(配置 [`core/config.js`](core/config.js),首次需在 SQL Editor 执行 [`db/schema.sql`](db/schema.sql))。纯静态,push 即上线。
