## 2024-10-24 - Unmemoized Arrays Triggering GSAP Layout Re-animations
**Learning:** Passing unmemoized derived arrays to components with `useEffect` dependency arrays that trigger GSAP layout animations (e.g., `ProductGrid`) causes unnecessary O(N log N) recalculations and layout re-animations.
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo` to preserve array reference equality between renders and prevent triggering expensive animation dependencies.
