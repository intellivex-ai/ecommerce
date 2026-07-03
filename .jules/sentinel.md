## 2024-05-18 - Missing Administrative Route Guard
**Vulnerability:** The client-side admin dashboard (`/admin`) had no route guards, allowing any unauthenticated user to view the UI and its contents.
**Learning:** Client-side routes are entirely accessible unless explicitly guarded at the component level. Relying solely on the absence of links (e.g., hidden in the Account page) is "security by obscurity" and ineffective against direct URL navigation.
**Prevention:** Always implement component-level access controls using hooks like `useAuth` and redirection components like `<Navigate>` for administrative routes, ensuring early returns are placed after all hook and block-scoped declarations to satisfy React rules.
