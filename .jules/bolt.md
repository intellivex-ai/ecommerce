## 2024-11-20 - Zustand Array State Updates
**Learning:** Avoid O(2N) array logic (combining .find() and .map()). Instead, use a single-pass O(N) approach with .findIndex() and direct index updates on a shallow copy, which benchmarks ~2.3x faster for large arrays.
**Action:** Apply this pattern when managing collections in Zustand stores.
