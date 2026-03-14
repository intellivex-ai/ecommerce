import { supabase } from './supabaseClient';

export const productService = {
    // Fetch all products with their categories
    async fetchProducts(filters = {}) {
        // ⚡ Bolt Optimization: Use !inner join to prevent N+1 queries when filtering by category
        // This eliminates the need for a separate query to fetch the category ID first.
        const categoryJoin = filters.categorySlug ? 'categories!inner' : 'categories';

        let query = supabase.from('products').select(`
      *,
      ${categoryJoin} (
        id,
        name,
        slug
      )
    `);

        // Basic filtering
        if (filters.categorySlug) {
            query = query.eq('categories.slug', filters.categorySlug);
        }

        if (filters.search) {
            query = query.ilike('title', `%${filters.search}%`);
        }

        // Only active products
        query = query.eq('is_active', true);

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    // Fetch a single product by ID
    async fetchProductById(id) {
        const { data, error } = await supabase
            .from('products')
            .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    // Fetch all categories
    async fetchCategories() {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (error) throw error;
        return data;
    },

    // Subscribe to product changes (Real-time stock, etc.)
    subscribeToProduct(id, callback) {
        return supabase
            .channel(`product-${id}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'products',
                    filter: `id=eq.${id}`,
                },
                (payload) => callback(payload.new)
            )
            .subscribe();
    },

    // NEW: Search Suggestions (Predictions)
    async searchSuggestions(query) {
        if (!query || query.length < 2) return [];
        const { data, error } = await supabase
            .from('products')
            .select('id, title, slug, price, images, category_id')
            .ilike('title', `%${query}%`)
            .limit(5);
        
        if (error) throw error;
        return data;
    },

    // NEW: Neural Recommendations (Related Items)
    async fetchRelatedProducts(productId, categoryId) {
        const { data, error } = await supabase
            .from('products')
            .select(`
                *,
                categories (id, name, slug)
            `)
            .eq('category_id', categoryId)
            .neq('id', productId)
            .limit(4);

        if (error) throw error;
        return data;
    },

    // NEW: Trending Gear (Most reviewed / Highest rated)
    async fetchTrendingProducts() {
        const { data, error } = await supabase
            .from('products')
            .select(`
                *,
                categories (id, name, slug)
            `)
            .limit(8); // Future: Sort by review count/rating once logic is in DB
        
        if (error) throw error;
        return data;
    }
};
