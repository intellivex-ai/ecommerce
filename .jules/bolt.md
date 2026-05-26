## 2026-05-26 - Zustand O(2N) Array Updates
**Learning:** Combining `.find()` with `.map()` in Zustand state updates creates O(2N) array traversals, which is a performance bottleneck for large arrays.
**Action:** Use a single-pass O(N) approach with `.findIndex()` and direct index updates on a shallow copy instead.
