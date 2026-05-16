## 2024-05-16 - Optimize Zustand Store Array Operations
**Learning:** Avoid O(2N) array logic (combining `.find()` and `.map()`) when updating Zustand stores. Using a single-pass O(N) approach with `.findIndex()` and direct index updates on a shallow copy is significantly faster.
**Action:** Use `.findIndex()` and direct index assignment instead of chained array iterations for state updates in stores.
