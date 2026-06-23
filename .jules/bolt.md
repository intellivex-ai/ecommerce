## 2024-05-20 - Unmemoized arrays trigger expensive GSAP animations
**Learning:** Passing unmemoized derived arrays (like `filtered` products) from parent components to child components that use GSAP animations (`staggerItems` in `ProductGrid.jsx`) causes O(N log N) recalculations and re-triggers layout animations on unrelated state changes because the dependency array `[products]` receives a new reference every render.
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo` to preserve referential equality and prevent layout thrashing.
