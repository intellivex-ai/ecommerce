## 2024-05-21 - [Fix XSS Vulnerability in toastFeedback]
**Vulnerability:** XSS vulnerability through unsanitized user input dynamically loaded into the DOM via `innerHTML` within `toastFeedback` in `src/animations/gsapAnimations.js`.
**Learning:** `innerHTML` executes HTML code inherently, risking XSS if combined with directly-interpolated user input (like error/status messages).
**Prevention:** Avoid `innerHTML` for dynamically creating or updating UI elements handling external content. Use safer DOM APIs like `document.createElement` to render structural tags, followed by `.textContent` to safely assign dynamic text.
