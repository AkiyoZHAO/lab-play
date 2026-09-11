-- 工程稳固：Career 原子保存 + Owner 备份恢复。

create or replace function public.save_career_panel(
  p_state jsonb,
  p_private jsonb,
  p_milestones jsonb default '[]'::jsonb
) returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_milestones integer := 0;
begin
  if coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') <> 'owner' then
    raise exception 'owner required' using errcode = '42501';
  end if;

  insert into public.panel_private(panel, content, updated_at)
  values ('career', p_private, now())
  on conflict (panel) do update
    set content = excluded.content, updated_at = excluded.updated_at;

  insert into public.panel_states(panel, state, updated_at)
  values ('career', p_state, now())
  on conflict (panel) do update
    set state = excluded.state, updated_at = excluded.updated_at;

  insert into public.events(play, type, payload)
  select 'career', 'career_milestone', value
  from jsonb_array_elements(coalesce(p_milestones, '[]'::jsonb));
  get diagnostics v_milestones = row_count;

  return jsonb_build_object(
    'state', p_state,
    'content', p_private,
    'milestones', v_milestones
  );
end;
$$;

revoke all on function public.save_career_panel(jsonb, jsonb, jsonb) from public, anon;
grant execute on function public.save_career_panel(jsonb, jsonb, jsonb) to authenticated;

create or replace function public.restore_lab_play_backup(p_backup jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_events integer := 0;
  v_states integer := 0;
  v_private integer := 0;
  v_max_id bigint;
begin
  if coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') <> 'owner' then
    raise exception 'owner required' using errcode = '42501';
  end if;
  if p_backup ->> 'format' <> 'lab-play-backup'
     or coalesce((p_backup ->> 'version')::integer, 0) <> 1 then
    raise exception 'unsupported backup format' using errcode = '22023';
  end if;

  insert into public.events(id, created_at, play, type, payload)
  select id, created_at, play, type, payload
  from jsonb_to_recordset(coalesce(p_backup -> 'events', '[]'::jsonb))
    as item(id bigint, created_at timestamptz, play text, type text, payload jsonb)
  on conflict (id) do update
    set created_at = excluded.created_at,
        play = excluded.play,
        type = excluded.type,
        payload = excluded.payload;
  get diagnostics v_events = row_count;

  insert into public.panel_states(panel, state, updated_at)
  select panel, state, updated_at
  from jsonb_to_recordset(coalesce(p_backup -> 'panel_states', '[]'::jsonb))
    as item(panel text, state jsonb, updated_at timestamptz)
  on conflict (panel) do update
    set state = excluded.state, updated_at = excluded.updated_at;
  get diagnostics v_states = row_count;

  insert into public.panel_private(panel, content, updated_at)
  select panel, content, updated_at
  from jsonb_to_recordset(coalesce(p_backup -> 'panel_private', '[]'::jsonb))
    as item(panel text, content jsonb, updated_at timestamptz)
  on conflict (panel) do update
    set content = excluded.content, updated_at = excluded.updated_at;
  get diagnostics v_private = row_count;

  select max(id) into v_max_id from public.events;
  if v_max_id is null then
    perform setval(pg_get_serial_sequence('public.events', 'id'), 1, false);
  else
    perform setval(pg_get_serial_sequence('public.events', 'id'), v_max_id, true);
  end if;

  return jsonb_build_object(
    'events', v_events,
    'panel_states', v_states,
    'panel_private', v_private
  );
end;
$$;

revoke all on function public.restore_lab_play_backup(jsonb) from public, anon;
grant execute on function public.restore_lab_play_backup(jsonb) to authenticated;
