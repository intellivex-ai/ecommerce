## 2024-05-24 - Memoize Derived Arrays for GSAP Elements
**Learning:** Passing unmemoized derived arrays to components with `useEffect` dependency arrays that trigger GSAP layout animations (like `ProductGrid`) causes unnecessary layout re-animations and O(N log N) recalculations on unrelated component renders.
**Action:** Always memoize derived collections with `useMemo` before passing them to animation-heavy components to maintain a stable object reference across renders.
