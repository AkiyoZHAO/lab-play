// Supabase client 的唯一实例。认证与 events 数据层共用同一会话，
// 避免各页面各自创建 client，造成 auth 状态不同步。
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config.js';

if (!window.supabase) {
  throw new Error('请先通过 CDN 引入 @supabase/supabase-js@2');
}

export const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
