// =============================================================
// lab-play · 前端配置（单一来源）
// -------------------------------------------------------------
// 整个前端只在这一个文件里配置 Supabase 连接。
// 以前 URL/KEY 散落在多个 HTML 里、明文重复，现在统一收到这里，
// 其他页面一律 import 本模块。
//
// 数据层：纯静态 + Supabase，前端直接读写 events 表（靠 RLS 兜底）。
// anon key 本就是设计成可公开的，写进仓库无妨。
// =============================================================

export const SUPABASE_URL = 'https://biiarbusbmdnqyjfnhax.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_gKU7fggwQQX73nVZnApvxg_QdeH438A';
