## 2024-05-24 - Unmemoized array calculations and GSAP
**Learning:** Unmemoized array calculations (like derived product filtering and sorting) inside a component cause unnecessary recalculations on unrelated state updates. Crucially, in this codebase, this triggers redundant child component animations (like GSAP stagger effects) because the array reference changes on every render.
**Action:** Always wrap expensive, derived lists inside `useMemo` hooks, especially when child components rely on array identity to determine if animations should run.
