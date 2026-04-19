## 2024-05-14 - Memoize derived product lists to prevent GSAP stagger reruns
**Learning:** Unmemoized array calculations for derived lists (like product filtering and sorting in parent components) cause unnecessary recalculations and trigger redundant child component animations (specifically GSAP stagger effects in `ProductGrid.jsx`) on unrelated state updates.
**Action:** Always wrap expensive derived lists in `useMemo` hooks, especially when child components rely on stable array references for animation entry effects.
