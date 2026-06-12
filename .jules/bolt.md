
## 2025-02-19 - GSAP Animation Thrashing from Unmemoized Props
**Learning:** Passing unmemoized derived collections (like filtered arrays) to components with `useEffect`-based GSAP animations causes layout thrashing. The new array reference on every render triggers the effect dependency array, re-running expensive animations even when the data hasn't logically changed.
**Action:** Always memoize derived arrays passed to animation-heavy components using `useMemo` to maintain stable references.
