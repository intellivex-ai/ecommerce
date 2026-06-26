## 2024-05-24 - Unmemoized derived state breaking GSAP animations
**Learning:** Passing unmemoized derived arrays to components that trigger GSAP animations on array changes (like `ProductGrid` with `[products]`) causes expensive layout recalculations and animation jank on every render, even for unrelated state changes like toggling a mobile menu.
**Action:** Always wrap derived collections passed to animation-heavy components with `useMemo` to preserve referential equality when dependencies haven't changed.
