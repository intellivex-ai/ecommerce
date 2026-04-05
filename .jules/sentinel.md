## 2024-04-05 - Insecure DOM API usage
**Vulnerability:** XSS vulnerability in toastFeedback due to using innerHTML.
**Learning:** Using innerHTML with potentially user-controlled data can lead to Cross-Site Scripting (XSS).
**Prevention:** Use safe DOM APIs like textContent or create text nodes when dynamically inserting content.
