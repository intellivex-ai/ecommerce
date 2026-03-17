## 2024-05-20 - Prevent DOM-based XSS in Dynamic UI Utilities
**Vulnerability:** DOM-based Cross-Site Scripting (XSS) via `innerHTML` usage in `toastFeedback` utility (`src/animations/gsapAnimations.js`).
**Learning:** Utility functions handling dynamic UI components across the application used `innerHTML` to interpolate messages directly into the DOM, making them susceptible to XSS if messages contained unsanitized user input.
**Prevention:** Use safe DOM APIs (`document.createElement`, `textContent`) rather than `innerHTML` when creating dynamic elements, especially when handling arbitrary string input.
