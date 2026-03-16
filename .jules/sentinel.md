## 2024-05-20 - Safe DOM Manipulation for UI Utils
**Vulnerability:** XSS vulnerability through use of `innerHTML` in utility functions like `toastFeedback` (`src/animations/gsapAnimations.js`).
**Learning:** Utility functions constructing dynamic UI components across the application used `innerHTML` string interpolation, which was susceptible to Cross-Site Scripting (XSS) if user input or error messages were eventually passed to it.
**Prevention:** All utility functions manipulating the DOM to create UI components must use safe DOM APIs (e.g., `document.createElement`, `textContent`, `appendChild`) instead of `innerHTML` to ensure untrusted content is safely escaped.
