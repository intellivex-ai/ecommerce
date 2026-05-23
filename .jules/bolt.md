## 2026-05-23 - Zustand Array Updates Performance
**Learning:** Combining `.find()` and `.map()` for Zustand array updates causes O(2N) complexity. For large arrays, a single-pass O(N) approach using `.findIndex()` and a shallow copy is ~2.3x faster.
**Action:** When updating arrays in Zustand, use `.findIndex()` and directly update the index on a shallow copy instead of chaining array methods.
