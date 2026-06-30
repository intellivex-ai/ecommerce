## 2024-05-18 - GSAP Animation Triggers with Unmemoized Arrays
**Learning:** In this codebase, GSAP animations (e.g., `staggerItems` in `ProductGrid.jsx`) use dependency arrays based on collections. Passing unmemoized derived arrays (like `filtered` products) from parent components causes O(N log N) recalculations and needlessly re-triggers layout animations on unrelated state changes.
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo` to prevent redundant recalculations and animation glitches.
