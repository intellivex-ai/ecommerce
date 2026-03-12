import { supabase } from './supabaseClient';

export const orderService = {
    // Fetch user orders
    async fetchUserOrders(userId) {
        const { data, error } = await supabase
            .from('orders')
            .select(`
        *,
        order_items (
          id,
          quantity,
          price_at_time,
          products (id, title, images)
        )
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Create order and order items transactionally-like
    async createOrder({ userId, addressId, items, totalPrice }) {
        // 1. Create the order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: userId,
                address_id: addressId, // optional
                total_price: totalPrice,
                payment_status: 'pending',
                order_status: 'pending'
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Prepare order items
        const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.id || item.product_id, // depends on whether it's from backend cart or local cart
            quantity: item.qty,
            price_at_time: item.price
        }));

        // 3. Insert order items
        const { data: savedItems, error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)
            .select();

        if (itemsError) throw itemsError;

        // 4. Update the cart - clear the cart items for the user
        await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', userId);

        return { order, items: savedItems };
    }
};
