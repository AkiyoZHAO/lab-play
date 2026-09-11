# Supabase 配置

前端只使用公开的 publishable/anon key；真正的权限边界由 Auth 与 RLS 提供。

## Owner 登录

1. 在 Supabase Dashboard 的 **Authentication → URL Configuration** 中：
   - Site URL 填正式站点根地址；
   - Redirect URLs 加入正式站点的 `/auth/`，本地开发时再加入本地 `/auth/`。
2. 关闭公开注册，只在 Authentication 后台创建自己的邮箱账号。
3. 在 SQL Editor 将该用户标记为 owner（替换邮箱）：

   ```sql
   update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
     || '{"role":"owner"}'::jsonb
   where email = '你的邮箱';
   ```

4. 执行 [`2026-09-11-owner-auth.sql`](2026-09-11-owner-auth.sql) 更新 events RLS。
5. 执行 [`2026-09-11-career-panel.sql`](2026-09-11-career-panel.sql) 创建公开摘要表和 Owner 私有正文表。
6. 重新登录，使新的 `app_metadata` 进入 JWT。

完成后在仓库根目录运行：

```bash
node scripts/check-remote.mjs
```

它会验证：公开注册已关闭、Career 两张表存在、匿名 events INSERT 已被 RLS 拒绝。写权限探针使用缺少必填字段的无效记录，不会留下数据。

页面使用 magic link 登录，并设置 `shouldCreateUser: false`；未在后台创建的邮箱不会由前端自动注册。

## 面板数据分层

- `panel_states`：公开摘要，匿名可读、仅 Owner 可写；不要存公司、薪资、联系人、具体经历或私人判断。
- `panel_private`：敏感正文与私有上下文，仅 Owner 可读写。
- `events`：只记录面板状态跨档等里程碑，不承担当前状态重建。
