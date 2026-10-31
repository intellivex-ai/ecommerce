## 2024-10-31 - GSAP Animation Cascading Re-renders
**Learning:** Passing unmemoized derived arrays to components with `useEffect` dependency arrays that trigger GSAP layout animations (like `ProductGrid`) causes unnecessary O(N log N) recalculations and layout re-animations on every render.
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo`.
