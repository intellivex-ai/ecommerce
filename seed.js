import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { products } from './src/data/products.js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// You need the SERVICE_ROLE_KEY to bypass RLS for seeding, or just allow Anon insert temporarily.
// Since we don't have service role key in .env, we'll use ANON_KEY assuming RLS is disabled or allows anon insert for now,
// or we advise the user to run this from SQL editor if it fails.
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedProducts() {
    console.log('Starting seed...');

    // 1. Create categories
    const categoriesToCreate = [...new Set(products.map(p => p.category))];
    console.log('Categories to create:', categoriesToCreate);

    for (const cat of categoriesToCreate) {
        const { error } = await supabase.from('categories').upsert({
            name: cat,
            slug: cat.toLowerCase(),
            description: `All ${cat} products`
        }, { onConflict: 'slug' });

        if (error) {
            console.error('Error creating category:', cat, error);
        }
    }

    // Fetch created categories to map IDs
    const { data: dbCategories } = await supabase.from('categories').select('*');

    // 2. Insert Products
    for (const prod of products) {
        const category = dbCategories.find(c => c.name === prod.category);

        const productData = {
            title: prod.name,
            slug: prod.name.toLowerCase().replace(/ /g, '-'),
            description: prod.description,
            price: prod.price,
            stock_quantity: 100, // example
            images: prod.images,
            is_active: true,
            category_id: category?.id
        };

        const { error } = await supabase.from('products').upsert(productData, { onConflict: 'slug' });
        if (error) {
            console.error('Error inserting product:', prod.name, error);
        } else {
            console.log('Inserted:', prod.name);
        }
    }

    console.log('Seed completed!');
}

seedProducts();
