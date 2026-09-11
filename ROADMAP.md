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

- [x] 账号与权限地基:Supabase Auth(magic link,仅我)+ events RLS「anon 只读 / 仅 Owner 可写」+ 前端登录门禁
- [x] 分层隐私 + career 细节迁库:公开 `panel_states` + Owner-only `panel_private`;下钻登录才看
- [x] 挂上 akiyolab.com:复用 Cloudflare Worker Static Assets + custom domain,替换旧落地页
- [x] 统计 → 高密度「总览 Dashboard」(widget 网格)
- [x] 事业面板:里程碑写 events / 网页内编辑
- [x] 皮肤层:anchor→皮肤绑定 + 兜底
- [x] 首页 `self-glance`(周视图)
- [x] 图鉴:按共享 events 解锁卡牌与统计 encounters

已接:首页(玩法/面板两栏 + self-glance + 默认皮肤)· 抽卡 · Dashboard · 事业面板(概览 + 私有下钻/编辑)· 图鉴。

## 决策日志

- **2026-09-10** 小游戏 → 个人空间;events 升级为共享时间线;内容分玩法/面板;anchor 接口与皮肤分离;首页简约 / Dashboard 高密度;事业面板走文档态(frontmatter 承载状态,方案 B)。
- **2026-09-11** 首页改为 anchor→默认皮肤映射并提供未知 anchor 兜底;加入 self-glance 周视图;统计升级为 widget Dashboard,聚合 events、月历与 Career readiness。
- **2026-09-11** Career 数据分层为公开 `panel_states` 摘要与 Owner-only `panel_private` 正文;网页内可编辑,状态升级写 `career_milestone`;公开 md 降为无敏感信息的初始模板。
- **2026-09-11** `akiyolab.com` 已有 Worker Static Assets 与 custom domain,不重复创建 Pages 项目;部署配置迁入本仓库,待权限地基上线后覆盖旧落地页。
- **2026-09-11** Supabase 创建唯一 Owner 用户,关闭公开注册,配置正式/预览/本地回跳 URL;events 与 Career 表 RLS 已做 anon 拒写 + Owner 事务试写验证。
- **2026-09-11** `akiyolab.com` 正式发布 lab-play;线上功能页与匿名门禁通过浏览器回归,仓库元数据/SQL/验收脚本不进入静态资产。
- **2026-09-11** 删除未定义数据源的「外部打卡」待办,不为清单完整度引入同步复杂度;当前只有 `draw_done.payload.duration` 累计为时间代币,`career_milestone` 只进入共享时间线、不产生代币。
