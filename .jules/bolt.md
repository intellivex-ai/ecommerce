## 2024-05-24 - Memoize Expensive Derived Lists
**Learning:** In the React architecture of this codebase, unmemoized array calculations (like filtering and sorting products) cause unnecessary recalculations and trigger redundant child component animations (e.g., GSAP stagger effects) when unrelated state updates occur (like toggling mobile menus or color filters).
**Action:** Always wrap expensive derived lists inside `useMemo` hooks, specifying all dependent variables in the dependency array to ensure referential stability and prevent performance degradation.
