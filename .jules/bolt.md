## 2024-05-18 - Optimize Zustand Store Array Logic
**Learning:** Using `.find()` followed by `.map()` or `.filter()` to update an item in a Zustand store array results in O(2N) complexity.
**Action:** Use `.findIndex()` to locate the item in O(N) time and directly update or remove the item at that index in a shallow copy, which improves performance for large arrays.
