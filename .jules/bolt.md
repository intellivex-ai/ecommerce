## 2024-06-17 - GSAP Animations and Unmemoized Arrays
**Learning:** Passing unmemoized derived arrays (like `filtered` products) from parent components causes O(N log N) recalculations and re-triggers layout animations (like `staggerItems` in `ProductGrid.jsx`) on unrelated state changes due to array reference inequality.
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo`.
