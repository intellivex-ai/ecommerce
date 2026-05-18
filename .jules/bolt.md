## 2024-05-24 - Zustand Array State Optimization
**Learning:** Combining `.find()` and `.map()` to update an item in an array results in an O(2N) operation. For large arrays in global state, this can become a bottleneck.
**Action:** Use a single-pass O(N) approach with `.findIndex()` and direct index updates on a shallow copy of the array, which benchmarks significantly faster.
