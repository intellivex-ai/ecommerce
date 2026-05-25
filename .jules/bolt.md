## 2025-05-25 - Zustand Array Operations Performance
**Learning:** Avoid combining .find() and .map() for updating items in Zustand stores. This results in O(2N) array logic which degrades performance on large lists.
**Action:** Use a single-pass O(N) approach with .findIndex() and direct index updates on a shallow copy. This benchmarks ~2.3x faster for large arrays.