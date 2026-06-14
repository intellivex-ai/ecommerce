## 2024-06-14 - GSAP Animation Layout Thrashing
**Learning:** Passing unmemoized derived arrays (like `filtered` products) into components with GSAP animations (e.g., `ProductGrid`) causes O(N log N) recalculations and triggers expensive layout animations on every unrelated state change.
**Action:** Always wrap derived collections passed to animation-heavy components in `useMemo` to preserve reference equality and isolate expensive calculations.
