## 2024-05-18 - Zustand Array Optimization
**Learning:** Found a common performance pattern when modifying arrays within Zustand store methods (`src/store/cartStore.js`). Combining `.find()` and `.map()` to update a single item creates an O(2N) complexity.
**Action:** Always replace `.find()` followed by `.map()` with a single `.findIndex()`, cloning the array, and directly updating the specific index for O(N) single-pass modifications.
