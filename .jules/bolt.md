## 2023-10-26 - Memoize GSAP Dependencies
**Learning:** Passing unmemoized derived arrays (like filtered/sorted products) to components like ProductGrid that use them in `useEffect` dependency arrays for GSAP animations causes unnecessary O(N log N) recalculations and triggers expensive layout re-animations on every parent render.
**Action:** Always wrap derived collections passed to animation-heavy components with `useMemo` to preserve referential equality and prevent redundant GSAP triggers.
