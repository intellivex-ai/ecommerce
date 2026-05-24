## 2026-05-24 - Zustand Performance Pattern
**Learning:** Avoid O(2N) array logic (combining `.find()` and `.map()`) in Zustand actions.
**Action:** Use a single-pass O(N) approach with `.findIndex()` and direct index updates on a shallow copy, which benchmarks ~2.3x faster for large arrays.