## 2024-05-24 - DOM-based XSS in GSAP Animations
**Vulnerability:** Unescaped `innerHTML` usage in `src/animations/gsapAnimations.js` for `toastFeedback` messages. An attacker could potentially pass a payload via dynamic input (e.g., product names or user input) resulting in DOM-based XSS.
**Learning:** Even internal utility functions used for UI animations can be a vector for XSS if they construct DOM elements using template literals and `innerHTML` with unsanitized data.
**Prevention:** Always use safe DOM APIs like `document.createElement` and `textContent` for dynamic text content, or utilize a DOM sanitization library if HTML rendering is strictly required. Avoid `innerHTML` whenever possible.
