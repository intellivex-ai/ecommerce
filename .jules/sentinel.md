## 2024-03-05 - Admin Role Authorization Bypass
**Vulnerability:** Client-side admin routes were unprotected and admin UI access was based on the mutable `profile.full_name` field.
**Learning:** Relying solely on UI-level checks without component-level route guards allows users to bypass authorization by directly navigating to the URL or manipulating their profile.
**Prevention:** Always enforce authorization at the route/component level using immutable user identifiers (like email or verified roles) and never trust user-controlled fields.
