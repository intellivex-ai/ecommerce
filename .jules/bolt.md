## 2024-10-29 - Memoizing derived arrays for GSAP animations
**Learning:** Passing unmemoized derived arrays to components with useEffect dependency arrays that trigger GSAP layout animations (like ProductGrid) causes O(N log N) recalculations and unnecessary layout re-animations.
**Action:** Always memoize derived collections passed to animation-heavy components using useMemo to prevent performance degradation and visual glitches.
