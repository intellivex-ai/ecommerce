## 2024-05-23 - Unmemoized Derived State Triggers Redundant Animations
**Learning:** In `Shop.jsx`, deriving a filtered/sorted array (`filtered`) inline without memoization causes the array reference to change on every render (e.g. when `showMobileFilters` toggles). This forces child components (like `ProductGrid`) to re-render, re-triggering GSAP stagger animations unintentionally.
**Action:** Always wrap expensive derived lists (filtering/sorting products) in a `useMemo` hook to preserve reference equality and avoid unnecessary downstream re-renders and animation resets.
