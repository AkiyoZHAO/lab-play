#!/usr/bin/env node
// 零依赖静态验收：检查 JSON、HTML 内部资源、ES module 语法与架构红线。
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const ignoredDirs = new Set(['.git', '.playwright-cli', '.wrangler']);
const files = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (ignoredDirs.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else files.push(path);
  }
}
walk(root);

const failures = [];
const show = path => relative(root, path);

for (const file of files.filter(path => extname(path) === '.json')) {
  try { JSON.parse(readFileSync(file, 'utf8')); }
  catch (error) { failures.push(`${show(file)}: invalid JSON (${error.message})`); }
}

for (const file of files.filter(path => extname(path) === '.js')) {
  try {
    execFileSync(process.execPath, ['--input-type=module', '--check'], {
      input: readFileSync(file), stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (error) {
    failures.push(`${show(file)}: invalid JavaScript (${error.stderr?.toString().trim() || error.message})`);
  }
}

const attrPattern = /\b(?:href|src)=["']([^"']+)["']/g;
const modulePattern = /<script\s+type=["']module["'][^>]*>([\s\S]*?)<\/script>/g;
for (const file of files.filter(path => extname(path) === '.html')) {
  const html = readFileSync(file, 'utf8');
  for (const unpinned of [
    'cdn.jsdelivr.net/npm/@supabase/supabase-js@2"',
    'cdn.jsdelivr.net/npm/js-yaml@4/',
    'cdn.jsdelivr.net/npm/marked/marked.min.js',
  ]) {
    if (html.includes(unpinned)) failures.push(`${show(file)}: unpinned CDN dependency ${unpinned}`);
  }
  for (const match of html.matchAll(attrPattern)) {
    const ref = match[1];
    if (ref.includes('${')) continue;
    if (/^(?:https?:|mailto:|data:|#)/.test(ref)) continue;
    const clean = ref.split(/[?#]/, 1)[0];
    if (!clean) continue;
    let target = normalize(resolve(dirname(file), clean));
    if (clean.endsWith('/')) target = join(target, 'index.html');
    if (!existsSync(target)) failures.push(`${show(file)}: missing ${ref}`);
  }
  for (const [index, match] of [...html.matchAll(modulePattern)].entries()) {
    try {
      execFileSync(process.execPath, ['--input-type=module', '--check'], {
        input: match[1], stdio: ['pipe', 'pipe', 'pipe'],
      });
    } catch (error) {
      failures.push(`${show(file)}: invalid inline module #${index + 1} (${error.stderr?.toString().trim() || error.message})`);
    }
  }
}

for (const file of files.filter(path => !path.includes(`${join(root, 'core')}/`) && !path.includes(`${join(root, 'db')}/`))) {
  const text = readFileSync(file, 'utf8');
  if (/\b(?:supabase|db)\.from\s*\(/.test(text) || /createClient\s*\(/.test(text)) {
    failures.push(`${show(file)}: direct Supabase access outside core/`);
  }
}

if (failures.length) {
  console.error(failures.map(item => `- ${item}`).join('\n'));
  process.exit(1);
}
console.log(`OK: ${files.length} files checked`);
