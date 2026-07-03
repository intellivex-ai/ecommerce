## 2024-05-24 - Unmemoized derived collections trigger GSAP layout animations
**Learning:** GSAP animations (e.g., `staggerItems` in `ProductGrid.jsx`) are triggered on the `[products]` dependency array. Passing unmemoized derived arrays (like `filtered` products) from parent components causes O(N log N) recalculations and re-triggers layout animations on unrelated state changes (like toggling mobile filters).
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo`.
