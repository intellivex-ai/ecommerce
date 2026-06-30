## 2024-05-24 - Missing Admin Authorization
**Vulnerability:** The `/admin` route lacked client-side authorization checks, allowing any user to access the admin panel.
**Learning:** Client-side administrative routes require component-level route guards using the `useAuth` hook and `<Navigate>` to enforce access control.
**Prevention:** Always implement role-based access control (RBAC) on administrative routes and ensure early returns for route guards are placed strictly after all React hook declarations.