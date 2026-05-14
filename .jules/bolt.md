## 2024-05-14 - Zustand O(2N) Array Logic

**Learning:** Combining `.find()` and `.map()` for array updates in Zustand stores creates an O(2N) operation, which is a performance bottleneck for large arrays.
**Action:** Use a single-pass O(N) approach with `.findIndex()` and direct index updates on a shallow copy of the array for faster updates.
