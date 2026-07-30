-- 迁移脚本：支持"抽签即记录(pending)，反馈时再更新状态"的两段式流程
-- 在 Supabase 项目的 SQL Editor 里执行一次即可，不会影响已有数据

-- 1. 放宽 status 的 check 约束，新增 'pending' 状态
--    （旧约束只允许 'done' / 'skip'，抽签瞬间还没结果，需要一个"进行中"的状态）
alter table lottery_log drop constraint if exists lottery_log_status_check;
alter table lottery_log add constraint lottery_log_status_check
  check (status in ('pending', 'done', 'skip'));

-- 2. 允许匿名用户更新记录（之前只开放了 insert 和 select，现在反馈阶段需要 update）
--    限制：只能更新 status 字段本身走前端逻辑保证，这里用最简单的开放策略
--    （因为是私人小工具，没有账号系统，风险可接受）
drop policy if exists "允许更新" on lottery_log;
create policy "允许更新" on lottery_log
  for update to anon
  using (true)
  with check (true);
