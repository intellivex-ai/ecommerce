## 2024-05-17 - Redundant GSAP Stagger Animations
**Learning:** Unmemoized array calculations for derived lists (e.g., product filtering and sorting in parent components) cause unnecessary recalculations and trigger redundant child component animations (specifically GSAP stagger effects in `ProductGrid.jsx`) on unrelated state updates.
**Action:** Always wrap expensive derived lists in `useMemo` hooks, especially when passed as props to components with animation side effects depending on the array reference.
