import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import { supabase } from '../services/supabaseClient';

export const useProducts = (filters = {}) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [prods, cats] = await Promise.all([
                productService.fetchProducts(filters),
                productService.fetchCategories()
            ]);
            setProducts(prods);
            setCategories(cats);
        } catch (err) {
            console.error('Error fetching products', err);
            setError(err.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(filters)]);

    useEffect(() => {
        const initData = async () => {
            await fetchAll();
        };
        initData();

        // Setup Realtime Subscription for products
        const channel = supabase
            .channel('public:products')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'products' },
                (payload) => {
                    console.log('Realtime Update:', payload);
                    fetchAll(); // Simply re-fetch all for simplicity, or manually update state
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchAll]);



    const loadProductById = useCallback(async (id) => {
        try {
            return await productService.fetchProductById(id);
        } catch (err) {
            console.error('Error fetching product', err);
            throw err;
        }
    }, []);

    return {
        products,
        categories,
        loading,
        error,
        refresh: fetchAll,
        loadProductById
    };
};
