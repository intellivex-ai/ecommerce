## 2024-05-24 - Client-side Administrative Route Protection
**Vulnerability:** The `/admin` route and `AdminPanel` component lacked access controls, allowing any user to view the admin dashboard.
**Learning:** In this project's architecture, administrative routes are not protected at the router level in `App.jsx`. They require component-level route guards to enforce access control based on user email.
**Prevention:** Always implement component-level route guards using the `useAuth` hook and `<Navigate>` within sensitive components to prevent unauthorized access.
