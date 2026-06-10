## 2024-10-24 - [Missing Admin Route Protection]
**Vulnerability:** The Admin component (`src/pages/Admin.jsx`) lacked authentication checks, relying entirely on the parent routing which also lacked guards (`<Route path="/admin" ... />`).
**Learning:** React Router v6 doesn't provide built-in route guards; they must be manually implemented via wrapper components or within the component itself. In this codebase, sensitive components must independently verify the user profile (e.g., `profile?.full_name === 'Admin'`) via the `useAuth` hook.
**Prevention:** Always wrap sensitive application routes (like `/admin`, `/account`) in a `ProtectedRoute` component or explicitly implement `useAuth` validation within the view component to prevent Unauthorized Access (Broken Access Control).
