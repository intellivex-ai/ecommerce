## 2024-06-09 - Missing Authentication on Admin Route
**Vulnerability:** The `/admin` endpoint was completely unprotected on the frontend, allowing any visitor to view the admin dashboard and potentially interact with administrative functions.
**Learning:** Frontend routing must always be explicitly protected by an authorization wrapper when handling sensitive or privileged views.
**Prevention:** Implement an `AdminRoute` higher-order component or wrapper for all administrative routes in `App.jsx` and ensure backend RLS policies enforce corresponding checks.