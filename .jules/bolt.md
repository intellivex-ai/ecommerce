## 2026-07-06 - GSAP Animation Thrashing from Unmemoized Props
**Learning:** Passing unmemoized derived arrays (like filtered/sorted product lists) to components with `useEffect` dependency arrays that trigger GSAP animations (e.g., `ProductGrid`) causes severe layout re-animation thrashing and O(N log N) recalculations on every render, even when the underlying data hasn't changed.
**Action:** Always wrap derived collections passed to animation-heavy components with `useMemo` to preserve referential equality and prevent unnecessary GSAP re-triggers.
