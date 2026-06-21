## 2024-05-24 - Missing Authentication on Admin Route
**Vulnerability:** The `/admin` endpoint and `AdminPanel` component lacked any authentication or authorization checks, allowing any anonymous user to access the control suite and potentially view or modify system data.
**Learning:** Client-side routing must implement explicit route guards for privileged areas. Relying only on hiding UI links is insufficient, as the route remains accessible via direct URL navigation.
**Prevention:** Always implement role-based access control (RBAC) at the route level using an authentication hook (e.g., `useAuth`) and verify the user's specific administrative privileges before rendering privileged components.
