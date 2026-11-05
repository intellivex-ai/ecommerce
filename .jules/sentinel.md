## 2024-11-06 - Component-level Route Guards
**Vulnerability:** Admin panel missing client-side route guards, allowing unauthorized access.
**Learning:** Must enforce component-level route guards using the useAuth hook to prevent authorization bypass. Also need to ensure early returns comply with the React Rules of Hooks and Temporal Dead Zone by placing them after hook and referenced function declarations.
**Prevention:** Always implement `user` condition checks with `<Navigate>` on sensitive routes and test unauthenticated access.
