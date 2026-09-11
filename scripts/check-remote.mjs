#!/usr/bin/env node
// 只读/无落库远端验收。匿名写探针故意缺少必填字段：即使策略仍开放也不会产生记录。
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../core/config.js';

const headers = { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' };
const failures = [];

async function jsonResponse(path, options = {}, cacheBust = false) {
  const separator = path.includes('?') ? '&' : '?';
  const url = `${SUPABASE_URL}${path}${cacheBust ? `${separator}_check=${Date.now()}` : ''}`;
  const response = await fetch(url, {
    headers: { ...headers, 'Cache-Control': 'no-cache' },
    cache: 'no-store',
    ...options,
  });
  let body = null;
  try { body = await response.json(); } catch {}
  return { response, body };
}

const settings = await jsonResponse('/auth/v1/settings', {}, true);
if (!settings.response.ok) {
  failures.push(`Auth settings unavailable: HTTP ${settings.response.status}`);
} else if (settings.body.disable_signup !== true) {
  failures.push('Supabase public signup is still enabled');
}

for (const table of ['panel_states', 'panel_private']) {
  const result = await jsonResponse(`/rest/v1/${table}?select=*&limit=1`);
  if (result.response.status === 404 || result.body?.code === 'PGRST205') {
    failures.push(`${table} has not been deployed`);
  } else if (!result.response.ok) {
    failures.push(`${table} check failed: HTTP ${result.response.status}`);
  }
}

const insertProbe = await jsonResponse('/rest/v1/events', {
  method: 'POST',
  body: '{}',
});
if (insertProbe.body?.code === '23502') {
  failures.push('anon can still reach events INSERT constraints; owner-only RLS is not active');
} else if (insertProbe.response.ok) {
  failures.push('anon INSERT unexpectedly succeeded');
} else if (!['42501', 'PGRST301'].includes(insertProbe.body?.code)) {
  failures.push(`anon INSERT probe returned an unexpected result: ${insertProbe.body?.code || insertProbe.response.status}`);
}

for (const [name, body] of [
  ['save_career_panel', { p_state: {}, p_private: {}, p_milestones: [] }],
  ['restore_lab_play_backup', { p_backup: { format: 'invalid', version: 0 } }],
]) {
  const result = await jsonResponse(`/rest/v1/rpc/${name}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (result.response.status === 404 || result.body?.code === 'PGRST202') {
    failures.push(`${name} RPC has not been deployed`);
  } else if (result.response.ok) {
    failures.push(`${name} unexpectedly allowed anonymous execution`);
  } else if (!['42501', 'PGRST301'].includes(result.body?.code)) {
    failures.push(`${name} anonymous gate returned an unexpected result: ${result.body?.code || result.response.status}`);
  }
}

if (failures.length) {
  console.error(failures.map(item => `- ${item}`).join('\n'));
  process.exit(1);
}
console.log('OK: remote Auth, RLS, and panel tables are ready');
