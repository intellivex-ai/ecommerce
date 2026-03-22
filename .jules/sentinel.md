## 2024-03-22 - [HIGH] XSS Mitigation in GSAP Toast Notifications
**Vulnerability:** The `toastFeedback` function in `src/animations/gsapAnimations.js` was using `innerHTML` to inject a toast message. A potential XSS vulnerability existed if user input was ever passed to the `toastFeedback` message argument.
**Learning:** Even internal utility functions used for animations or notifications must use safe DOM manipulation methods (e.g. `document.createElement`, `textContent`) instead of string interpolation to prevent XSS.
**Prevention:** Always construct UI elements dynamically using safe DOM APIs. Enforce linting rules if possible to flag `innerHTML` usage.
