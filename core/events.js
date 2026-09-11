// =============================================================
// lab-play · events 读写封装（共享核心层）
// -------------------------------------------------------------
// 所有 play / view 写入或读取事件，都必须走这里，禁止各自
// 直接建 Supabase client 或拼查询。这样“唯一写入口”的语义才成立——
// 不管数据来自哪个 play，格式和调用方式都统一。
//
// 数据层：纯静态 + Supabase，前端直连 events 表（靠 RLS 兜底）。
// 表结构见 db/schema.sql。
//
// 依赖：页面需先通过 CDN 引入 supabase-js（本模块从全局 window.supabase 取），
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
// 放在 import 本模块的 <script type="module"> 之前。
// =============================================================

import { db } from './supabase.js';
import { requireOwner } from './auth.js';

/**
 * 写入一条 event。
 * @param {string} play    哪个 play，如 'draw'
 * @param {string} type    事件类型，如 'draw_pending'
 * @param {object} payload 各 play 自定义内容
 * @returns {Promise<{id:number, created_at:string}>}
 */
export async function logEvent(play, type, payload = {}) {
  await requireOwner();
  const { data, error } = await db.from('events')
    .insert({ play, type, payload })
    .select('id, created_at')
    .single();
  if (error) throw error;
  return data;
}

/**
 * 更新一条 event（如抽卡两段式 pending → done/skip）。
 * @param {number} id
 * @param {{type?:string, payload?:object}} patch 只传要改的字段
 * @returns {Promise<object>}
 */
export async function updateEvent(id, patch) {
  await requireOwner();
  const { data, error } = await db.from('events')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * 查询 events。统计 / 图鉴 / 回顾都基于它在前端计算。
 * @param {{play?:string, type?:string, from?:string, to?:string, limit?:number}} filters
 * @returns {Promise<Array<object>>} 按 created_at 升序的事件数组
 */
export async function queryEvents(filters = {}) {
  let query = db.from('events')
    .select('id, created_at, play, type, payload')
    .order('created_at', { ascending: true });
  if (filters.play) query = query.eq('play', filters.play);
  if (filters.type) query = query.eq('type', filters.type);
  if (filters.from) query = query.gte('created_at', filters.from);
  if (filters.to) query = query.lte('created_at', filters.to);
  if (filters.limit) query = query.limit(filters.limit);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}
