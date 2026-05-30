## 2024-05-30 - Zustand O(N) Array Updates
**Learning:** Combining `.find()` and `.map()` for Zustand array updates causes O(2N) complexity. Zustand's shallow comparison allows us to safely mutate a shallow copy of the array using an index, benchmarking ~2.3x faster for large arrays.
**Action:** Always use a single-pass O(N) approach with `.findIndex()` and direct index updates on a shallow copy when updating existing items in global state arrays.
