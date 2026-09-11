import { requireOwner } from './auth.js';
import { queryEvents } from './events.js';
import { queryAllPanelPrivate, queryAllPanelStates } from './panels.js';
import { db } from './supabase.js';

export async function createBackup() {
  await requireOwner();
  const [events, panelStates, panelPrivate] = await Promise.all([
    queryEvents(),
    queryAllPanelStates(),
    queryAllPanelPrivate(),
  ]);
  return {
    format: 'lab-play-backup',
    version: 1,
    exported_at: new Date().toISOString(),
    events,
    panel_states: panelStates,
    panel_private: panelPrivate,
  };
}

export async function restoreBackup(backup) {
  await requireOwner();
  if (backup?.format !== 'lab-play-backup' || backup?.version !== 1) {
    throw new Error('不支持的备份格式');
  }
  const { data, error } = await db.rpc('restore_lab_play_backup', { p_backup: backup });
  if (error) throw error;
  return data;
}

export function downloadBackup(backup) {
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `lab-play-backup-${backup.exported_at.slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
