## 2024-03-24 - Zustand array performance
**Learning:** In Zustand stores, combining `.find()` to check existence and `.map()` to update an array creates an O(2N) operation.
**Action:** Use `.findIndex()` to locate the item in a single O(N) pass, then create a shallow copy and update the item directly at that index. Benchmarks show this is ~2.3x faster for large arrays in state management.