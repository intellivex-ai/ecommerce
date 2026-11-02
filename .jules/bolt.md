## 2024-11-02 - Memoization for GSAP stagger animations
**Learning:** Passing unmemoized derived arrays (like filtered or sliced arrays) to components with `useEffect` dependency arrays that trigger GSAP layout animations causes unnecessary re-animations on every parent render.
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo` to preserve array identity.
