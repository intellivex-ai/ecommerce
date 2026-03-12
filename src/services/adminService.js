import { supabase } from './supabaseClient';

export const adminService = {
    // Add new product
    async addProduct(productData) {
        const { data, error } = await supabase
            .from('products')
            .insert(productData)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update product
    async updateProduct(id, updates) {
        const { data, error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete product
    async deleteProduct(id) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // Fetch all orders with details
    async fetchAllOrders() {
        const { data, error } = await supabase
            .from('orders')
            .select(`
        *,
        profiles:user_id ( full_name, email ),
        order_items (
          quantity,
          price_at_time,
          products ( title )
        )
      `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Update order status
    async updateOrderStatus(orderId, status) {
        const { data, error } = await supabase
            .from('orders')
            .update({ order_status: status })
            .eq('id', orderId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
