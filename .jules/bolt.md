## 2024-05-24 - N+1 query pattern using `!inner`
**Learning:** To prevent N+1 queries in Supabase when filtering by relation fields, use PostgREST `!inner` join syntax (e.g., `categories!inner(id, name, slug)`) instead of making multiple queries.
**Action:** Always prefer `!inner` syntax for related table filters instead of separate queries or nested fetching loops.

## 2024-05-24 - Unmemoized derived arrays trigger redundant child animations
**Learning:** Unmemoized array calculations (e.g. `products.filter(...)`) in `src/pages/Shop.jsx` cause unnecessary recalculations and redundant child component animations (e.g., GSAP stagger effects) on unrelated state updates.
**Action:** Wrap expensive, derived lists inside `useMemo` hooks.
