## 2024-05-30 - Missing Authentication on Admin Route
**Vulnerability:** The client-side admin route (`/admin`) lacked a component-level route guard to enforce access control based on user email or profile.
**Learning:** In this architecture, administrative privileges are checked by confirming if `user?.email === 'admin@velocity.io'` at the component level rather than relying on router-level protection in `App.jsx`. Relying solely on UI obscuration without explicit route guards leaves sensitive endpoints vulnerable to direct URL access.
**Prevention:** Always implement component-level route guards utilizing the `useAuth` hook and `<Navigate>` to enforce strict access control on administrative and sensitive routes.
