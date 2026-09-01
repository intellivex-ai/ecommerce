## 2025-03-05 - Privilege Escalation via User-Controlled Fields
**Vulnerability:** The application authorized admin access by checking if a user's full name was 'Admin' (`profile?.full_name === 'Admin'`) and completely lacked route protection on the `/admin` component.
**Learning:** Basing security rules on user-controllable fields (like names or basic profile data) allows easy privilege escalation since any user can manipulate these values to bypass UI boundaries.
**Prevention:** Always implement strict authorization checks using verified fields like `user?.email` (or backend roles), and structurally enforce them using component-level route guards (e.g., `<Navigate>`) instead of just hiding links.
