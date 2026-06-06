## 2024-06-06 - Missing Admin Endpoint Authentication
**Vulnerability:** The `/admin` route lacked any authentication or authorization checks, allowing any user to access the Admin Panel.
**Learning:** Client-side routing must explicitly enforce authorization checks using route guards or hook-based redirects; otherwise, sensitive UI and administrative functions are exposed to the public.
**Prevention:** Always wrap sensitive routes with a protected route component or include authentication and role verification checks at the top of the component before rendering.