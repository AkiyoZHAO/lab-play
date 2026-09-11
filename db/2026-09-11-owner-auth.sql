-- 在已有 lab-play Supabase 项目执行本迁移。
-- 执行前先按 db/README.md 创建 owner 用户并写入 app_metadata.role。

alter table public.events enable row level security;

drop policy if exists "允许插入" on public.events;
drop policy if exists "允许读取" on public.events;
drop policy if exists "允许更新" on public.events;
drop policy if exists "公开读取" on public.events;
drop policy if exists "仅 owner 插入" on public.events;
drop policy if exists "仅 owner 更新" on public.events;

create policy "公开读取" on public.events
  for select to anon, authenticated
  using (true);

create policy "仅 owner 插入" on public.events
  for insert to authenticated
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'owner');

create policy "仅 owner 更新" on public.events
  for update to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'owner')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'owner');
