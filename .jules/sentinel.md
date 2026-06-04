## 2024-05-24 - Fix XSS in toastFeedback
**Vulnerability:** DOM-based XSS via `innerHTML` template literals.
**Learning:** Custom UI implementations using `innerHTML` are susceptible to XSS if user-controlled input like `message` is rendered without sanitization.
**Prevention:** Use DOM manipulation to construct elements safely and use `textContent` to inject user-provided text.
