## 2025-02-28 - Missing Authorization on Admin Panel
**Vulnerability:** The Admin panel (`/admin`) was accessible to any user, including unauthenticated guests, as it lacked route-level protection or authorization checks in the component.
**Learning:** Even if backend API requests are protected by RLS or admin-only policies, exposing the administrative UI to unauthorized users is a critical security gap that can leak system structure, features, and potentially allow unintended actions if frontend state is manipulated or backend policies have flaws.
**Prevention:** Always implement route-level or component-level authorization checks (`ProtectedRoute` or `useAuth` hook validation) for any administrative or sensitive interfaces, redirecting unauthorized users before rendering the UI.
