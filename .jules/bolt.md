## 2024-05-24 - GSAP Animation Re-trigger Bottleneck
**Learning:** Passing unmemoized derived arrays to components with GSAP animations (like `ProductGrid.jsx` which triggers `staggerItems` on the `[products]` dependency array) causes expensive layout animations to re-trigger on unrelated state changes in the parent component.
**Action:** Always memoize derived collections passed to animation-heavy components using `useMemo` to preserve array references and prevent unnecessary re-calculations and DOM animations.
