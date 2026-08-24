## YYYY-MM-DD - Missing Route Guards on Admin
**Vulnerability:** Missing authorization checks on the `/admin` route.
**Learning:** Client-side routing in React requires explicit component-level guards.
**Prevention:** Always use an auth hook with `<Navigate>` to protect sensitive routes based on user role or email.
