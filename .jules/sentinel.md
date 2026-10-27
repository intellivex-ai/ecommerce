## 2024-05-20 - Authorization Bypass via User-Controlled Fields
**Vulnerability:** The UI check for the admin panel relied on `profile.full_name === 'Admin'` rather than an authoritative, non-mutable claim, and the route itself lacked a guard.
**Learning:** Checking authorization against user-mutable profile fields (like names) creates trivial privilege escalation paths. Component-level routes also need independent guards; UI hiding is not security.
**Prevention:** Always base authorization on verified server-side claims (like constrained roles or verified emails). Protect client routes fundamentally, separate from UI conditional rendering.
