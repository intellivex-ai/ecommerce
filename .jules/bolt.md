## 2024-08-30 - Prevent GSAP Layout Re-animations
**Learning:** Passing unmemoized derived arrays to components with `useEffect` dependency arrays that trigger GSAP layout animations (like `ProductGrid`) causes unnecessary O(N log N) recalculations and layout re-animations.
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo` to prevent these expensive DOM/animation operations.
