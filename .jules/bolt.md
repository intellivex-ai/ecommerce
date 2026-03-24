
## 2023-10-24 - Unmemoized Lists and GSAP Animations
**Learning:** In this codebase, recalculating expensive array filtering operations (like those inside Shop.jsx) does not just hurt CPU performance—it causes the component to supply a brand-new array reference to child components (like ProductGrid). This inadvertently re-triggers heavy GSAP stagger animations on unrelated state updates, significantly degrading perceived performance.
**Action:** Always wrap dynamically filtered and sorted lists in `useMemo` when they are passed down to UI components that utilize GSAP lifecycle animations.
