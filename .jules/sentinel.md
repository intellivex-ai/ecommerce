## 2024-07-05 - Missing Authentication on Admin Route
**Vulnerability:** Client-side administrative route `/admin` was exposed without component-level route guards.
**Learning:** In a React app relying on client-side routing (`react-router-dom`), simply omitting standard layout navigation links is insufficient. The route component itself must explicitly enforce authorization checks to prevent direct URL access.
**Prevention:** Always implement role-based access control directly within the admin component using a custom authentication hook, returning early with a `<Navigate>` fallback for unauthorized users.
