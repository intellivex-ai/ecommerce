import { supabase } from './supabaseClient';

export const reviewService = {
    // Fetch reviews for a product
    async fetchProductReviews(productId) {
        // Try to fetch with profiles, fallback to just reviews if join fails or relationship is missing
        const { data, error } = await supabase
            .from('reviews')
            .select(`
                *,
                profiles (
                   full_name,
                   avatar_url
                )
            `)
            .eq('product_id', productId)
            .order('created_at', { ascending: false });

        if (error) {
            console.warn("Join with profiles failed, fetching raw reviews:", error);
            const { data: rawData, error: rawError } = await supabase
                .from('reviews')
                .select('*')
                .eq('product_id', productId)
                .order('created_at', { ascending: false });
            
            if (rawError) throw rawError;
            return rawData;
        }
        return data;
    },

    // Submit a review
    async submitReview({ productId, userId, rating, title, comment }) {
        if (rating < 1 || rating > 5) throw new Error('Rating must be between 1 and 5');

        // Check if user already reviewed this product
        const { data: existingReview } = await supabase
            .from('reviews')
            .select('id')
            .eq('user_id', userId)
            .eq('product_id', productId)
            .single();

        if (existingReview) {
            // Update existing review
            const { data, error } = await supabase
                .from('reviews')
                .update({ rating, title, comment })
                .eq('id', existingReview.id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } else {
            // Insert new review
            const { data, error } = await supabase
                .from('reviews')
                .insert({
                    product_id: productId,
                    user_id: userId,
                    rating,
                    title,
                    comment
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        }
    },

    // Get Average Rating
    async getProductStats(productId) {
        const { data, error } = await supabase
            .from('reviews')
            .select('rating')
            .eq('product_id', productId);

        if (error) throw error;

        if (!data.length) return { average: 0, count: 0 };

        const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
        return {
            average: (sum / data.length).toFixed(1),
            count: data.length
        };
    },

    // Subscribe to review changes
    subscribeToReviews(productId, callback) {
        return supabase
            .channel(`reviews-${productId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'reviews',
                    filter: `product_id=eq.${productId}`,
                },
                (payload) => callback(payload)
            )
            .subscribe();
    }
};
