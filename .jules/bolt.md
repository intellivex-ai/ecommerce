## 2024-10-24 - Unmemoized Derived Arrays Triggering GSAP Layout Animations
**Learning:** Passing unmemoized derived arrays to components with useEffect dependency arrays that trigger GSAP layout animations (e.g., ProductGrid) causes unnecessary O(N log N) recalculations and layout re-animations.
**Action:** Always memoize derived collections passed to animation-heavy components using useMemo.