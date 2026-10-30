## 2024-05-24 - Memoize Derived Arrays for GSAP Performance
**Learning:** Passing unmemoized derived arrays to components with `useEffect` dependency arrays that trigger GSAP layout animations (like `ProductGrid`) causes unnecessary O(N log N) recalculations and layout re-animations on unrelated state changes.
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo`.
