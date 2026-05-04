## 2024-05-04 - Optimize Zustand array updates
**Learning:** Combining `.find()` and `.map()` for Zustand array updates causes an O(2N) performance bottleneck, as demonstrated by the ~38ms to ~16ms improvement benchmark for large states.
**Action:** Replace `.find()` + `.map()` loops with a single-pass O(N) `.findIndex()` and direct array index update on a shallow copy.
