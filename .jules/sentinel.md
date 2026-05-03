## 2024-05-03 - [Fix innerHTML DOM XSS in toastFeedback]
**Vulnerability:** The `toastFeedback` function in `src/animations/gsapAnimations.js` uses `innerHTML` to render user-controlled messages.
**Learning:** Using `innerHTML` with unescaped dynamic or user-controlled data can lead to DOM-based Cross-Site Scripting (XSS).
**Prevention:** Construct elements using `document.createElement()` and assign text content via the `textContent` property to ensure inputs are not parsed or executed as code.
