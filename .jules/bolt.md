
## 2024-05-28 - Unmemoized arrays trigger redundant GSAP stagger animations
**Learning:** Expensive derived lists (like product filtering and sorting) that are left unmemoized cause unnecessary recalculations on every render. More critically for this codebase, this triggers redundant GSAP stagger animations on child components for completely unrelated state updates, leading to jarring visual re-renders and poor performance.
**Action:** Always wrap derived list calculations in `useMemo` hooks to maintain referential stability and prevent redundant DOM animation resets.
