## 2024-05-19 - Avoid O(2N) Array Logic in Zustand Stores
**Learning:** Combining `.find()` and `.map()` for array updates in Zustand stores results in O(2N) time complexity, which can become a performance bottleneck for large arrays.
**Action:** Use a single-pass O(N) approach with `.findIndex()` and direct index updates on a shallow copy, which benchmarks significantly faster for large arrays.