## 2024-05-24 - Memoizing GSAP Animation Dependencies
**Learning:** Passing unmemoized derived arrays to components with `useEffect` dependency arrays that trigger GSAP layout animations (like `ProductGrid`) causes unnecessary O(N log N) recalculations and expensive layout re-animations upon unrelated state changes.
**Action:** Always wrap derived collections passed to animation-heavy components using `useMemo` to preserve array references between renders.
