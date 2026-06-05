## 2024-05-18 - DOM XSS in Toast Utility
**Vulnerability:** DOM-based Cross-Site Scripting (XSS) vulnerability was found in the `toastFeedback` utility function located in `src/animations/gsapAnimations.js`. The `message` parameter was directly interpolated into an HTML string and assigned via `toast.innerHTML`.
**Learning:** Using `innerHTML` with unsanitized dynamic input, even for simple UI feedback elements like toasts, creates an XSS vector. While toasts often show static messages, they can sometimes display API error messages or user-provided data.
**Prevention:** Always use safe DOM APIs like `.textContent` to inject dynamic data, or safely construct DOM elements programmatically rather than using string concatenation with `innerHTML`.
