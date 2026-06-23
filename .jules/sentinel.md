## 2024-06-23 - Client-side Administrative Route Protection
**Vulnerability:** The `/admin` route was exposed without any authentication or authorization checks at the component level, allowing unauthenticated users and non-admin users to access the admin panel and potentially execute administrative actions.
**Learning:** Client-side administrative routes must have explicit component-level route guards using the `useAuth` hook and `<Navigate>` to enforce access control based on user email/profile, rather than relying on router-level protection or assuming obscurity.
**Prevention:** Always implement explicit component-level authorization checks (e.g., verifying `user?.email === 'admin@velocity.io'`) on sensitive routes before rendering administrative UI or fetching sensitive data.
