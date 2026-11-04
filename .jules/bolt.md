## 2024-05-24 - Memoize arrays triggering GSAP animations
**Learning:** Passing unmemoized derived arrays to components with `useEffect` dependency arrays that trigger GSAP layout animations (e.g., `ProductGrid`) causes unnecessary recalculations and layout re-animations.
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo`.