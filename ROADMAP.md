# ROADMAP

lab-play 的元维护层:蓝图 · 待办 · 决策。
README 记「现在是什么」,这里记「要去哪、还差什么、为什么这么定」。

## 定位

- **个人空间**:自有、纯静态、UI 可换、不寄居别人平台。游戏化只是它的一个子类。
- 内容 = **玩法**(flow,写 events)+ **面板**(state,自持状态)。
- **events = 共享时间线**,不是唯一状态源;面板状态自持(如事业先用 md)。
- **UI 是薄表层**:接口(anchor)固定,皮肤可换。

## 分层 + anchor 契约

层级:**L0 首页 → L1 功能页**(领域展开成 L2 待定)。

- 首页:`panel:*` `play:*` `dashboard` `skin-switch` `self-glance`
- 面板:`back` `state-view` `state-edit` `milestone` `child:*`
- 玩法:`back` `action` `resolve`

铁律:新增内容 = 多一个 anchor;皮肤须给未摆位的 anchor 兜底。

## TODO

- [ ] 统计 → 高密度「总览 Dashboard」(widget 网格)
- [ ] 事业面板:里程碑写 events / 子线详情下钻 / 网页内编辑
- [ ] 皮肤层:anchor→皮肤绑定 + 兜底
- [ ] 首页 `self-glance`(如小月历)
- [ ] career md 迁 Supabase(远)
- [ ] 图鉴、外部打卡接入(远)

已接:首页(玩法/面板两栏)· 抽卡 · 统计 · 事业面板只读 v0。

## 决策日志

- **2026-09-10** 小游戏 → 个人空间;events 升级为共享时间线;内容分玩法/面板;anchor 接口与皮肤分离;首页简约 / Dashboard 高密度;事业面板走文档态(frontmatter 承载状态,方案 B)。
