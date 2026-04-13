## 2024-04-13 - [useMemo Optimization for GSAP Animations]
**Learning:** Unmemoized array calculations for derived lists (e.g., product filtering and sorting) in parent components cause unnecessary recalculations and trigger redundant child component animations (specifically GSAP stagger effects in `ProductGrid.jsx`) on completely unrelated state updates.
**Action:** Always wrap expensive derived lists that are passed down to animating child components (like `ProductGrid`) inside a `useMemo` hook to maintain referential equality and avoid unnecessary re-triggers of GSAP effects.
