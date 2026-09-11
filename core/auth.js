import { db } from './supabase.js';

export class AuthRequiredError extends Error {
  constructor() {
    super('需要 owner 登录后才能执行此操作');
    this.name = 'AuthRequiredError';
  }
}

export async function getSession() {
  const { data, error } = await db.auth.getSession();
  if (error) throw error;
  return data.session;
}

export function onAuthChange(callback) {
  const { data } = db.auth.onAuthStateChange((event, session) => {
    callback(session, event);
  });
  return () => data.subscription.unsubscribe();
}

export async function sendMagicLink(email, redirectTo) {
  const { error } = await db.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
      // 账号只由 Supabase 后台预先创建；公开页面不能注册新用户。
      shouldCreateUser: false,
    },
  });
  if (error) throw error;
}

export async function signOut() {
  const { error } = await db.auth.signOut();
  if (error) throw error;
}

export function isOwner(session) {
  return session?.user?.app_metadata?.role === 'owner';
}

export async function requireOwner() {
  const session = await getSession();
  if (!isOwner(session)) throw new AuthRequiredError();
  return session;
}
