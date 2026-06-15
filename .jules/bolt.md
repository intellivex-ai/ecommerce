## 2024-06-15 - Memoizing Derived Data for Animation Heavy Components
**Learning:** Passing unmemoized derived arrays (like `filtered` products) to child components that use GSAP animations with dependency arrays (like `[products]` in `ProductGrid.jsx`) causes O(N log N) recalculations and re-triggers layout animations on unrelated state changes (like toggling mobile filters).
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo` to prevent unnecessary re-renders and animation re-triggers.
