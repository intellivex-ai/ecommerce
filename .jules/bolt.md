## 2024-06-18 - Prevent Unrelated Re-renders Causing Redundant Animations
**Learning:** Unmemoized array calculations (like derived filtering) cause redundant GSAP stagger effects in child components upon unrelated state updates (e.g. toggling mobile filters).
**Action:** Use `useMemo` for derived lists like product filtering/sorting.
