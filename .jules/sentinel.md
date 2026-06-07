## 2024-06-07 - Missing Authorization on Admin Route
**Vulnerability:** The `/admin` route lacked proper frontend authentication and authorization checks, relying purely on UI obscurity (hiding the link).
**Learning:** React Router routes must be explicitly protected. Do not rely solely on hiding navigation links to prevent access to privileged views.
**Prevention:** Always implement route guards (e.g., using `Navigate` based on `useAuth` state) for sensitive routes.
