## 2024-05-28 - Authorization Bypass via User-Controlled Field
**Vulnerability:** Administrative privileges and route access were based on `profile?.full_name === 'Admin'`, a user-editable field, and the `/admin` route lacked frontend guards entirely.
**Learning:** Relying on mutable profile data for authorization introduces immediate privilege escalation vulnerabilities. Furthermore, hiding a link does not secure the underlying route.
**Prevention:** Always use immutable identity tokens (like `user.email` or verified server-side roles) for role-based access control, and enforce strict route guards on all sensitive views.
