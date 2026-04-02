## 2026-04-02 - Memoizing derived state for GSAP

**Learning:** Unmemoized derived state arrays (like filtered product lists) cause GSAP stagger animations in child components to unnecessarily restart/re-render on every unrelated state change, significantly impacting perceived UI performance.

**Action:** Always wrap expensive, derived lists that are passed as props to animated child components in `useMemo` hooks.
