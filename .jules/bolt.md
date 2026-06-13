## 2026-06-13 - Memoization of Derived Arrays for GSAP Animations
**Learning:** Passing unmemoized derived arrays (like filtered products) as props to components that trigger GSAP animations via `useEffect` dependencies causes expensive layout animations to re-trigger on unrelated state changes (e.g., toggling mobile filters).
**Action:** Always memoize derived collections (using `useMemo`) before passing them to animation-heavy components like `ProductGrid` that rely on reference equality for animation triggers.
