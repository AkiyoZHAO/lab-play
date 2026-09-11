// Dashboard 事件源注册表。新增 play/panel 的时间线格式时只改这里，
// 主页面只负责布局、范围筛选和通用渲染。
export const DRAW_TYPES = {
  done: 'draw_done',
  skip: 'draw_skip',
  pending: 'draw_pending',
};

const sources = {
  draw: {
    contributesToSummary(event) {
      return Object.values(DRAW_TYPES).includes(event.type);
    },
    format(event) {
      const labels = {
        [DRAW_TYPES.done]: '完成',
        [DRAW_TYPES.skip]: '跳过',
        [DRAW_TYPES.pending]: '进行中',
      };
      return {
        label: labels[event.type] || event.type,
        kind: event.type === DRAW_TYPES.done ? 'done'
          : event.type === DRAW_TYPES.skip ? 'skip' : 'pending',
        name: event.payload?.activity || '—',
        meta: [
          event.payload?.tier,
          event.type === DRAW_TYPES.done && event.payload?.duration
            ? `${event.payload.duration} 代币` : '',
        ].filter(Boolean).join(' · '),
      };
    },
  },
  career: {
    contributesToSummary() { return false; },
    format(event) {
      const name = event.payload?.section || event.payload?.criterion || 'Career readiness';
      return {
        label: event.type === 'career_milestone' ? '里程碑' : event.type,
        kind: 'pending',
        name: name.replaceAll('_', ' '),
        meta: [event.payload?.from, event.payload?.to]
          .filter(value => value !== undefined).join(' → '),
      };
    },
  },
};

const fallback = {
  contributesToSummary() { return false; },
  format(event) {
    return {
      label: event.type,
      kind: 'pending',
      name: event.play,
      meta: '',
    };
  },
};

export function sourceFor(event) {
  return sources[event.play] || fallback;
}

export function summaryEvents(events) {
  return events.filter(event => sourceFor(event).contributesToSummary(event));
}

export function formatTimelineEvent(event) {
  return sourceFor(event).format(event);
}

export const PANEL_WIDGETS = [
  {
    id: 'career',
    panel: 'career',
    className: 'widget-career',
    fallbackUrl: '../career/career-turnaround.md',
    markup: `
      <div class="section-label">Career readiness</div>
      <div class="career-top">
        <div class="career-level" data-field="level">—</div>
        <div class="career-rto" data-field="rto">RTO —</div>
      </div>
      <div class="career-track"><div class="career-fill" data-field="fill"></div></div>
      <div class="career-next" data-field="next">读取面板状态…</div>`,
    render(element, state) {
      const level = Number(state?.readiness_level) || 0;
      element.querySelector('[data-field="level"]').textContent = `L${level}`;
      element.querySelector('[data-field="fill"]').style.width = `${Math.min(100, Math.max(0, level / 5 * 100))}%`;
      element.querySelector('[data-field="rto"]').textContent = `RTO ${state?.career_rto || 'unknown'}`;
      element.querySelector('[data-field="next"]').textContent = state?.next_action || '尚未设置下一步。';
    },
  },
];
