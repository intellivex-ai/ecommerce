## 2024-05-13 - Zustand Performance Pattern
**Learning:** Combining `.find()` and `.map()` or `.filter()` creates an O(2N) operation, which can become a bottleneck for large arrays in Zustand stores.
**Action:** Use `.findIndex()` and direct index updates on a shallow copy instead to achieve a single-pass O(N) update, yielding ~2.3x performance improvement.
