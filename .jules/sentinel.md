## 2024-03-12 - Fix Predictable File Names in User Avatar Uploads
**Vulnerability:** Weak random number generation (`Math.random()`) used for avatar filenames in `src/services/storageService.js`.
**Learning:** `Math.random()` generates predictable values which could potentially allow an attacker to guess file names and overwrite or improperly access other users' files.
**Prevention:** Always use cryptographically secure methods like `crypto.randomUUID()` to generate random strings for filenames or other sensitive identifiers.
