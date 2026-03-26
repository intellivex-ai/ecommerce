## 2024-05-24 - Unmemoized arrays trigger redundant GSAP staggers
**Learning:** In this codebase, unmemoized array calculations (like filtering products) in parent components (like `Shop.jsx`) cause unnecessary recalculations and redundant child component animations (e.g., GSAP stagger effects in `ProductGrid.jsx`) on unrelated state updates.
**Action:** Always wrap expensive, derived lists (like product filtering and sorting) inside `useMemo` hooks.
