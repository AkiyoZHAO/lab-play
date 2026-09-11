# lab-play

一个自己拥有的**个人空间**,承载我的人生系统。纯静态、自建、UI 可换,不寄居别人平台。

**→ [akiyolab.com](https://akiyolab.com/)**（正式） · [GitHub Pages](https://akiyozhao.github.io/lab-play/)（预览）

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
│   ├── stats/          Dashboard(events 聚合 + 面板摘要)
│   ├── career/         事业(公开摘要 + Owner 私有正文/编辑)
│   └── collection/     成就图鉴(events 累计行为→阈值点亮)
├── core/               Supabase/Auth · events · panels 数据入口
├── auth/               Owner 邮箱 + 密码登录
├── db/                 events schema · RLS 迁移与配置说明
├── design/             tokens.css(唯一视觉来源)· DESIGN.md
├── skins/              首页 anchor→视觉映射 + 默认兜底
├── scripts/            本地静态验收 + Supabase 远端权限验收
├── wrangler.jsonc      akiyolab.com 的 Worker Static Assets 部署
├── README.md
├── AGENTS.md           agent 规则
└── ROADMAP.md          蓝图 · 待办 · 决策
```

## 验收

```bash
node scripts/check.mjs         # 本地静态结构 / 语法 / 数据层边界
node scripts/check-remote.mjs  # Supabase Auth / RLS / 面板表
node scripts/check-live.mjs    # 正式站页面、隐藏资产与安全响应头
```

`main` push 后由 GitHub Actions 自动验收；仓库配置 `CLOUDFLARE_API_TOKEN` secret 后，同一工作流会继续部署 Cloudflare Worker 并检查正式站。
