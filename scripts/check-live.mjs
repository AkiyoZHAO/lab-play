#!/usr/bin/env node
const base = process.env.LAB_PLAY_URL || 'https://akiyolab.com';
const pages = [
  ['/', '<title>lab-play</title>'],
  ['/auth/', 'id="signInBtn"'],
  ['/plays/draw/', 'id="poolGrid"'],
  ['/panels/stats/', 'id="board"'],
  ['/panels/career/', 'id="overview"'],
  ['/panels/collection/', 'achievements.json'],
];
const failures = [];

for (const [path, marker] of pages) {
  const response = await fetch(`${base}${path}`, { headers: { 'Cache-Control': 'no-cache' } });
  const body = await response.text();
  if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
  else if (!body.includes(marker)) failures.push(`${path}: missing marker ${marker}`);
}
for (const path of ['/.gitignore', '/db/schema.sql', '/AGENTS.md', '/scripts/check.mjs']) {
  const response = await fetch(`${base}${path}`, { headers: { 'Cache-Control': 'no-cache' } });
  if (response.status !== 404) failures.push(`${path}: expected 404, got ${response.status}`);
}

const home = await fetch(`${base}/`, { headers: { 'Cache-Control': 'no-cache' } });
for (const header of ['content-security-policy', 'x-content-type-options', 'x-frame-options']) {
  if (!home.headers.get(header)) failures.push(`/: missing ${header}`);
}

if (failures.length) {
  console.error(failures.map(item => `- ${item}`).join('\n'));
  process.exit(1);
}
console.log(`OK: ${base} live smoke passed`);
