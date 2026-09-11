// 面板当前状态与私有正文的统一数据入口。
// events 只记里程碑；可变的当前状态由面板表自己持有。
import { requireOwner } from './auth.js';
import { db } from './supabase.js';

export async function queryPanelState(panel) {
  const { data, error } = await db.from('panel_states')
    .select('state, updated_at')
    .eq('panel', panel)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function savePanelState(panel, state) {
  await requireOwner();
  const { data, error } = await db.from('panel_states')
    .upsert({ panel, state, updated_at: new Date().toISOString() }, { onConflict: 'panel' })
    .select('state, updated_at')
    .single();
  if (error) throw error;
  return data;
}

export async function queryPanelPrivate(panel) {
  await requireOwner();
  const { data, error } = await db.from('panel_private')
    .select('content, updated_at')
    .eq('panel', panel)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function savePanelPrivate(panel, content) {
  await requireOwner();
  const { data, error } = await db.from('panel_private')
    .upsert({ panel, content, updated_at: new Date().toISOString() }, { onConflict: 'panel' })
    .select('content, updated_at')
    .single();
  if (error) throw error;
  return data;
}

export async function queryAllPanelStates() {
  await requireOwner();
  const { data, error } = await db.from('panel_states')
    .select('panel, state, updated_at')
    .order('panel');
  if (error) throw error;
  return data || [];
}

export async function queryAllPanelPrivate() {
  await requireOwner();
  const { data, error } = await db.from('panel_private')
    .select('panel, content, updated_at')
    .order('panel');
  if (error) throw error;
  return data || [];
}

export async function saveCareerPanel(state, content, milestones = []) {
  await requireOwner();
  const { data, error } = await db.rpc('save_career_panel', {
    p_state: state,
    p_private: content,
    p_milestones: milestones,
  });
  if (error) throw error;
  return data;
}
