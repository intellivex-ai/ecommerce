## 2024-05-24 - Unmemoized derived arrays cause GSAP stagger animation triggers
**Learning:** In this codebase, unmemoized array calculations cause redundant child component recalculations, inadvertently triggering GSAP stagger effects on unrelated state updates.
**Action:** Wrap expensive, derived lists (like product filtering and sorting) inside useMemo hooks.
