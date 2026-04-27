## 2024-05-24 - Overly Permissive Database RLS Policies and Insecure Admin Checking
**Vulnerability:** The application lacks a robust way to verify administrative access. It currently relies on checking if `profile?.full_name === 'Admin'` in the frontend, which is highly insecure because anyone can register with the name "Admin". Furthermore, the backend `database_schema.sql` lacks an `is_admin` column in the `profiles` table and defines overly permissive Row Level Security (RLS) policies on critical tables like `products` and `orders` that allow `insert`, `update`, and `delete` operations by anyone.

**Learning:** Frontend checks like string comparison on user-controlled fields (`full_name`) do not provide security. Real security must be enforced at the database layer using explicit roles or boolean flags (e.g., `is_admin`) that cannot be modified by the user, combined with strict RLS policies.

**Prevention:**
1.  Add an `is_admin` boolean column to the `profiles` table, defaulting to `false`.
2.  Update the RLS policies in `database_schema.sql` to ensure only users with `is_admin = true` can modify `products` and update `orders`.
3.  Update the frontend admin check to rely on `profile?.is_admin` instead of `profile?.full_name === 'Admin'`.
4.  Implement Route protection for the `/admin` path.
