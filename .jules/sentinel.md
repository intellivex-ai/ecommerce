## 2024-03-20 - Unprotected Admin Routes
**Vulnerability:** The client-side admin route (`/admin`) lacked component-level route guards. Any user could access administrative functionalities and sensitive endpoints by navigating directly to the URL.
**Learning:** Even if API endpoints might be protected, client-side route guards (like `Navigate`) are necessary to prevent UI access and information disclosure.
**Prevention:** Always wrap administrative components or routes in an authentication/authorization check using the `useAuth` hook and verify role or email before rendering content.