-- Velocity Store Database Schema

-- 1. extensions
create extension if not exists "uuid-ossp";

-- 2. profiles (Extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  avatar_url text,
  phone text,
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. categories
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. products
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  description text,
  price numeric(10, 2) not null,
  stock_quantity integer not null default 0,
  images text[] default array[]::text[],
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. addresses
create table public.addresses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  address_line_1 text not null,
  address_line_2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. orders
create type payment_status as enum ('pending', 'paid', 'failed', 'refunded');
create type order_status as enum ('pending', 'processing', 'shipped', 'delivered', 'cancelled');

create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete restrict not null,
  address_id uuid references public.addresses(id) on delete restrict,
  total_price numeric(10, 2) not null,
  payment_status payment_status default 'pending' not null,
  order_status order_status default 'pending' not null,
  stripe_session_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. order_items
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete restrict not null,
  quantity integer not null,
  price_at_time numeric(10, 2) not null, -- The price when the order was placed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. reviews
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  title text,
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(product_id, user_id) -- One review per user per product
);

-- 9. wishlist
create table public.wishlist (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- 10. cart
-- Note: Often carts are managed entirely in local storage/client state for guests, 
-- and only persisted in the DB for logged in users.
create table public.cart_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  quantity integer not null default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);


-- INDEXES for fast lookups
create index idx_products_category on public.products(category_id);
create index idx_orders_user on public.orders(user_id);
create index idx_reviews_product on public.reviews(product_id);
create index idx_cart_items_user on public.cart_items(user_id);


-- ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.reviews enable row level security;
alter table public.wishlist enable row level security;
alter table public.cart_items enable row level security;

-- Profiles: Users can read all (e.g. for review names), but only update their own
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id and is_admin = (select is_admin from public.profiles where id = auth.uid()));

-- Categories: Read-only for public, admin-only for changes (assuming admin role exists or checking service key)
create policy "Categories are viewable by everyone." on public.categories for select using (true);

-- Products: Read-only for public
create policy "Products are viewable by everyone." on public.products for select using (true);
create policy "Products can be inserted by admin." on public.products for insert with check ((select is_admin from public.profiles where id = auth.uid()) = true);
create policy "Products can be updated by admin." on public.products for update using ((select is_admin from public.profiles where id = auth.uid()) = true);
create policy "Products can be deleted by admin." on public.products for delete using ((select is_admin from public.profiles where id = auth.uid()) = true);

-- Addresses: Users can CRUD their own addresses
create policy "Users can view own addresses." on public.addresses for select using (auth.uid() = user_id);
create policy "Users can insert own addresses." on public.addresses for insert with check (auth.uid() = user_id);
create policy "Users can update own addresses." on public.addresses for update using (auth.uid() = user_id);
create policy "Users can delete own addresses." on public.addresses for delete using (auth.uid() = user_id);

-- Orders: Users can view their own orders, insert their own orders. Only backend service/admin should update status.
create policy "Users can view own orders." on public.orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders." on public.orders for insert with check (auth.uid() = user_id);
create policy "Only admin can update orders." on public.orders for update using ((select is_admin from public.profiles where id = auth.uid()) = true);

-- Order Items: Viewable if you own the order
create policy "Users can view own order items." on public.order_items for select using (
  order_id in (select id from public.orders where user_id = auth.uid())
);
create policy "Users can insert own order items." on public.order_items for insert with check (
  order_id in (select id from public.orders where user_id = auth.uid())
);

-- Reviews: Viewable by all, Users can insert/update/delete their own
create policy "Reviews are viewable by everyone." on public.reviews for select using (true);
create policy "Users can insert own reviews." on public.reviews for insert with check (auth.uid() = user_id);
create policy "Users can update own reviews." on public.reviews for update using (auth.uid() = user_id);
create policy "Users can delete own reviews." on public.reviews for delete using (auth.uid() = user_id);

-- Wishlist: Users can CRUD their own
create policy "Users can view own wishlist." on public.wishlist for select using (auth.uid() = user_id);
create policy "Users can insert own wishlist." on public.wishlist for insert with check (auth.uid() = user_id);
create policy "Users can delete own wishlist." on public.wishlist for delete using (auth.uid() = user_id);

-- Cart: Users can CRUD their own
create policy "Users can view own cart." on public.cart_items for select using (auth.uid() = user_id);
create policy "Users can insert own cart items." on public.cart_items for insert with check (auth.uid() = user_id);
create policy "Users can update own cart items." on public.cart_items for update using (auth.uid() = user_id);
create policy "Users can delete own cart items." on public.cart_items for delete using (auth.uid() = user_id);

-- Realtime Setup
alter publication supabase_realtime add table products;
alter publication supabase_realtime add table orders;

-- 11. Auth Triggers
-- Create a function to handle new user signups
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

-- Trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
