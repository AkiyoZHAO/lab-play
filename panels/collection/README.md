# Collection

从 `draw` events 聚合卡牌发现记录：某个 `tier + activity` 曾被抽到即解锁，次数来自共享时间线实时计算。

- 只读，不自存历史。
- 未发现卡牌隐藏名称，不增加新的奖励或货币系统。
- 卡池定义仍以 [`plays/draw/cards.json`](../../plays/draw/cards.json) 为准。
