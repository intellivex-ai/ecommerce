## 2024-05-24 - Missing Admin Authorization
**Vulnerability:** The client-side admin endpoint `/admin` lacked a route guard, allowing unauthenticated or low-privilege users to access the AdminPanel component and potentially view or interact with administrative interfaces.
**Learning:** Relying purely on server-side validation or backend data absence is insufficient for client-side applications. Route components must implement explicit auth checks and redirect unauthorized access immediately.
**Prevention:** Always implement component-level authorization checks utilizing custom hooks like `useAuth` in sensitive routes to enforce strict access control.
