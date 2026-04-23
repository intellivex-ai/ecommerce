## 2024-04-23 - Memoize Derived Lists for GSAP Stagger
**Learning:** Unmemoized array calculations for derived lists (e.g., product filtering and sorting) cause unnecessary recalculations and trigger redundant child component animations (specifically GSAP stagger effects in `ProductGrid.jsx`) on unrelated state updates.
**Action:** Always wrap expensive derived lists that are passed to animated child components in `useMemo` hooks to prevent triggering animations redundantly.
