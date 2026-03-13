## 2024-05-15 - [Supabase N+1 Queries]
**Learning:** Filtering by relation fields in Supabase using multiple queries causes N+1 problems and slows down performance.
**Action:** Use PostgREST's `!inner` join syntax (e.g., `categories!inner(id, name, slug)`) to filter by a joined table's column in a single query.
