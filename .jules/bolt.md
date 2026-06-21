## 2024-06-21 - Memoizing Derived Arrays for Animation Components
**Learning:** Passing unmemoized derived arrays (like `filtered` products) from parent components causes O(N log N) recalculations and re-triggers layout animations (like GSAP `staggerItems`) on unrelated state changes because the reference is always new.
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo` to maintain stable references and prevent performance regressions.
