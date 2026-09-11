-- Career 当前摘要与私有正文。
-- panel_states 是公开摘要；panel_private 仅 owner 可读写。

create table if not exists public.panel_states (
  panel       text primary key,
  state       jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

create table if not exists public.panel_private (
  panel       text primary key,
  content     jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

alter table public.panel_states enable row level security;
alter table public.panel_private enable row level security;

grant select on public.panel_states to anon, authenticated;
grant insert, update on public.panel_states to authenticated;
grant select, insert, update on public.panel_private to authenticated;

drop policy if exists "公开读取面板摘要" on public.panel_states;
drop policy if exists "仅 owner 新增面板摘要" on public.panel_states;
drop policy if exists "仅 owner 更新面板摘要" on public.panel_states;
drop policy if exists "仅 owner 读取私有面板" on public.panel_private;
drop policy if exists "仅 owner 新增私有面板" on public.panel_private;
drop policy if exists "仅 owner 更新私有面板" on public.panel_private;

create policy "公开读取面板摘要" on public.panel_states
  for select to anon, authenticated
  using (true);

create policy "仅 owner 新增面板摘要" on public.panel_states
  for insert to authenticated
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'owner');

create policy "仅 owner 更新面板摘要" on public.panel_states
  for update to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'owner')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'owner');

create policy "仅 owner 读取私有面板" on public.panel_private
  for select to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'owner');

create policy "仅 owner 新增私有面板" on public.panel_private
  for insert to authenticated
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'owner');

create policy "仅 owner 更新私有面板" on public.panel_private
  for update to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'owner')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'owner');
