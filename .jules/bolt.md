## 2024-10-24 - GSAP Animation Trigger Optimization
**Learning:** GSAP animations in `ProductGrid.jsx` are triggered on the `[products]` dependency array. Passing unmemoized derived arrays (like `filtered` products) from parent components causes O(N log N) recalculations and re-triggers layout animations on unrelated state changes.
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo` to preserve reference equality and prevent unnecessary animation cycles.
