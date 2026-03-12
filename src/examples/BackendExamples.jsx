import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import useCartStore from '../store/cartStore';
import { orderService } from '../services/orderService';
import { reviewService } from '../services/reviewService';

// This is an example component to demonstrate how to use the backend integrations.
// Do not use this directly in production without styling, it's just for reference!

export const BackendExamples = () => {
    const { user, profile, login, signUp, logout, isAuthenticated } = useAuth();
    const { products, categories, loading: productsLoading } = useProducts();

    // Zustand Cart
    const { items, addItem, removeItem, fetchCart, cartCount, subtotal } = useCartStore();

    useEffect(() => {
        // If authenticated, we might want to fetch their cart from Supabase.
        // userStore handles session persistence, cartStore's fetchCart loads it.
        if (isAuthenticated) {
            fetchCart();
        }
    }, [isAuthenticated, fetchCart]);

    const handleLogin = async () => {
        try {
            await login('test@example.com', 'password123');
            alert('Logged in!');
        } catch (err) {
            alert(err.message);
        }
    };

    const handleCheckout = async () => {
        if (!isAuthenticated) return alert('Please login first');
        try {
            await orderService.createOrder({
                userId: user.id,
                items,
                totalPrice: subtotal
            });
            alert('Order Placed! Cart is now empty.');
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSubmitReview = async (productId) => {
        if (!isAuthenticated) return alert('Please login first');
        try {
            await reviewService.submitReview({
                productId,
                userId: user.id,
                rating: 5,
                title: 'Great Product!',
                comment: 'I really enjoyed this product.'
            });
            alert('Review submitted!');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Backend Integration Examples</h1>

            <section>
                <h2>Auth Example</h2>
                {isAuthenticated ? (
                    <div>
                        <p>Welcome, {profile?.full_name || user.email}</p>
                        <button onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <button onClick={handleLogin}>Login as Test User</button>
                )}
            </section>

            <section>
                <h2>Products Example</h2>
                {productsLoading ? <p>Loading products...</p> : (
                    <ul>
                        {products.slice(0, 3).map(p => (
                            <li key={p.id}>
                                {p.title} - ${p.price}
                                <button onClick={() => addItem(p)}>Add to Cart</button>
                                <button onClick={() => handleSubmitReview(p.id)}>Leave 5-star Review</button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h2>Cart Example</h2>
                <p>Items in cart: {cartCount}</p>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.title} (x{item.qty})
                            <button onClick={() => removeItem(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
                {items.length > 0 && (
                    <button onClick={handleCheckout}>Checkout</button>
                )}
            </section>
        </div>
    );
};
