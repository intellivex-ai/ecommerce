## 2023-10-27 - [Missing Authentication on Admin Endpoint]
**Vulnerability:** The `/admin` endpoint lacked route guards and authorization checks, allowing unauthenticated access.
**Learning:** Component-level route guards must explicitly verify both authentication and authorization rules, and early returns must be placed strictly after all React hooks and block-scoped functions to avoid Rules of Hooks violations and Temporal Dead Zone errors.
**Prevention:** Ensure `useAuth` is utilized on sensitive routes with appropriate role or email checks.
