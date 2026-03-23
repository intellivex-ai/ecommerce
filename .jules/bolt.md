## 2025-02-20 - Memoizing derived lists to prevent GSAP stagger re-triggers
**Learning:** In this codebase, GSAP animations (especially stagger effects) attached to list items can be inadvertently re-triggered by unrelated state changes (like toggling a mobile menu) if the array they render from is recalculated on every render.
**Action:** Always wrap expensive or derived array computations (like filtering or sorting products) inside `useMemo` hooks to preserve referential equality when dependencies haven't changed.
