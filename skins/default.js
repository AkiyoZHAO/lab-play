// 默认首页皮肤：只负责把稳定 anchor 映射为视觉纹样。
// 新增 anchor 未显式配置时必须走 fallback，首页代码无需跟着修改。
const anchors = {
  'play:draw': `
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
         stroke-width="1.4" stroke-linejoin="round">
      <rect x="9" y="14" width="20" height="28" rx="3" transform="rotate(-9 19 28)"/>
      <rect x="19" y="12" width="20" height="28" rx="3" transform="rotate(6 29 26)"/>
      <path d="M29 20 l3.2 6.2 6.8 1 -5 4.7 1.2 6.8 -6.2-3.2 -6.2 3.2 1.2-6.8 -5-4.7 6.8-1 z"
            stroke-width="1.1"/>
    </svg>`,
  dashboard: `
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
         stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40 h32"/>
      <path d="M14 40 V26 M22 40 V16 M30 40 V22 M38 40 V12"/>
      <path d="M14 26 l8-10 8 6 8-10" stroke-width="1.1"/>
    </svg>`,
  'panel:career': `
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
         stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 40 V22 a6 6 0 0 1 6-6 h12"/>
      <path d="M28 10 l7 6 -7 6" stroke-width="1.1"/>
      <circle cx="12" cy="40" r="1.7" fill="currentColor" stroke="none"/>
    </svg>`,
  'panel:collection': `
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
         stroke-width="1.4" stroke-linejoin="round">
      <rect x="8" y="10" width="13" height="18" rx="2"/>
      <rect x="27" y="10" width="13" height="18" rx="2"/>
      <rect x="8" y="32" width="13" height="8" rx="2"/>
      <rect x="27" y="32" width="13" height="8" rx="2"/>
      <path d="M14.5 15 17 19.5 14.5 24 12 19.5z M33.5 15 36 19.5 33.5 24 31 19.5z" stroke-width="1.1"/>
    </svg>`,
};

const fallback = `
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
       stroke-width="1.4" stroke-linejoin="round">
    <path d="M24 5 43 24 24 43 5 24 z"/>
    <path d="M24 13 35 24 24 35 13 24 z" stroke-width="1.1"/>
  </svg>`;

export function resolveHomeAnchor(anchor) {
  return { glyph: anchors[anchor] || fallback };
}
