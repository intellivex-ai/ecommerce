## 2024-10-24 - Authorization Bypass via Mutable Fields
**Vulnerability:** Administrative routing and access components were granting privileges based on `profile.full_name === 'Admin'`. Since `full_name` is user-controlled, any user could mutate their display name to 'Admin' to bypass client-side administrative protections.
**Learning:** Checking user-editable fields for security boundaries introduces severe privilege escalation risks on the client side. Authoritative identity (like `user.email`) must be used for routing constraints.
**Prevention:** Always restrict role-based access to immutable, authoritative claims (e.g. `user.email` or strict database roles) and implement rigorous route guards using `useAuth` and `Navigate`.
