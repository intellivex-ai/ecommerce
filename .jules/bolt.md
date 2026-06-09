## 2024-05-24 - Unmemoized Derived Arrays Triggering GSAP Layout Animations
**Learning:** Passing unmemoized derived collections (like filtered products) to components heavy with GSAP animations (e.g., `ProductGrid`) causes O(N log N) recalculations and unintentionally re-triggers layout animations on every parent re-render (like unrelated state changes such as toggling mobile filters).
**Action:** Always memoize derived collections with `useMemo` when passing them down to components where animations depend on the array reference.
