import { useRef, useEffect, useState, useMemo } from 'react';
import { Filter, ChevronDown, SlidersHorizontal, Grid, List, Search, X } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { ProductSkeleton } from '../components/ui/Skeleton';
import { pageEnter } from '../animations/gsapAnimations';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const CATEGORIES = ['All', 'Running', 'Trail', 'Racing', 'Training', 'Recovery'];
const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Popularity', value: 'popular' },
];

const Shop = () => {
  const ref = useRef(null);
  const [selectedCat, setSelectedCat] = useState('All');
  const [sort, setSort] = useState('newest');
  const [priceMax, setPriceMax] = useState(300);
  const [selectedColors, setSelectedColors] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { products, loading } = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
    pageEnter(ref.current);
  }, []);

  // Memoize filtered products to prevent O(N) recalculations and redundant child component animations (GSAP stagger) on unrelated state updates
  const filtered = useMemo(() => {
    return products
      .filter((p) => selectedCat === 'All' || p.category_id === selectedCat || p.categories?.name === selectedCat)
      .filter((p) => p.price <= priceMax)
      .sort((a, b) => {
        if (sort === 'price-low') return a.price - b.price;
        if (sort === 'price-high') return b.price - a.price;
        if (sort === 'popular') return (b.reviewCount || 0) - (a.reviewCount || 0);
        return new Date(b.created_at) - new Date(a.created_at);
      });
  }, [products, selectedCat, priceMax, sort]);

  return (
    <div ref={ref} className="bg-brandOffWhite min-h-screen relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 relative z-10">
        {/* Page Header */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-brandCharcoal/5 pb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand/10 px-4 py-2 rounded-full mb-6">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-brand">Explore Velocity</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-extrabold tracking-tighter text-brandCharcoal mb-6">
              Shop <span className="text-brand">All.</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed font-medium italic">
              Experience the pinnacle of sustainable performance. Engineered for every terrain, designed for the future.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort By</span>
              <div className="relative group">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-white border border-brandCharcoal/10 rounded-xl text-sm font-bold focus:ring-2 focus:ring-brand focus:border-brand py-3 pl-5 pr-12 cursor-pointer shadow-sm group-hover:shadow-md transition-all outline-none text-brandCharcoal"
                >
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-brand transition-colors" />
              </div>
            </div>
            
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden p-3 bg-white rounded-xl shadow-sm border border-brandCharcoal/5 text-brandCharcoal hover:bg-brand hover:text-white transition-all"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-32 space-y-10">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Find a model..." 
                className="w-full bg-white border border-brandCharcoal/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand focus:border-brand shadow-sm transition-shadow outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand">Category</h3>
                <div className="h-px flex-grow ml-4 bg-brand/10" />
              </div>
              <ul className="space-y-4">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCat(cat)}
                      className={twMerge(
                        "group flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300",
                        selectedCat === cat 
                          ? "bg-brandCharcoal text-white shadow-xl translate-x-1" 
                          : "hover:bg-white text-slate-500 hover:text-brandCharcoal hover:translate-x-1"
                      )}
                    >
                      <span className="text-sm font-bold uppercase tracking-widest">{cat}</span>
                      <span className={clsx(
                        "text-[10px] font-black px-2 py-0.5 rounded-full",
                        selectedCat === cat ? "bg-white/10 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-brand/10 group-hover:text-brand"
                      )}>
                        {cat === 'All' ? products.length : products.filter((p) => p.categories?.name === cat || p.series === cat).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-brandCharcoal/5">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand">Price Range</h3>
                <SlidersHorizontal className="w-4 h-4 text-slate-300" />
              </div>
              <input
                type="range"
                min={0}
                max={300}
                step={10}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full h-1.5 bg-brandOffWhite rounded-lg appearance-none cursor-pointer accent-brand mb-6"
              />
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Maximum</span>
                <span className="text-2xl font-black text-brandCharcoal tracking-tighter">
                  <span className="text-sm font-medium mr-0.5">$</span>{priceMax}
                </span>
              </div>
            </div>

            {/* Colors */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand">Colorway</h3>
                <div className="h-px flex-grow ml-4 bg-brand/10" />
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'White', hex: '#ffffff' },
                  { name: 'Black', hex: '#111827' },
                  { name: 'Green', hex: '#a3e635' },
                  { name: 'Gray', hex: '#9ca3af' },
                  { name: 'Beige', hex: '#fef3c7' },
                  { name: 'Red', hex: '#dc2626' },
                ].map((c) => (
                  <button
                    key={c.name}
                    title={c.name}
                    onClick={() =>
                      setSelectedColors((prev) =>
                        prev.includes(c.name) ? prev.filter((x) => x !== c.name) : [...prev, c.name]
                      )
                    }
                    className={twMerge(
                      "w-9 h-9 rounded-full border-2 transition-all p-0.5",
                      selectedColors.includes(c.name)
                        ? "border-brand ring-2 ring-brand/20 scale-110"
                        : "border-transparent hover:border-brand/40"
                      )}
                  >
                    <div 
                      className="w-full h-full rounded-full shadow-inner" 
                      style={{ backgroundColor: c.hex }} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => { setSelectedCat('All'); setPriceMax(300); setSelectedColors([]); }}
              className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand transition-colors flex items-center justify-center gap-2"
            >
              Reset Filters
            </button>
          </aside>

          {/* Product Grid Area */}
          <section className="flex-grow">
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-brandCharcoal/5">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Displaying {filtered.length} products
              </p>
              <div className="flex gap-2">
                <button className="p-2 text-brand transition-colors"><Grid className="w-4 h-4" /></button>
                <button className="p-2 text-slate-300 hover:text-brand transition-colors"><List className="w-4 h-4" /></button>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : filtered.length > 0 ? (
              <ProductGrid products={filtered} cols={3} />
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-brandCharcoal/10">
                <p className="text-xl font-bold text-brandCharcoal mb-2">No matches found.</p>
                <p className="text-sm text-slate-500 mb-8">Try adjusting your filters to find your perfect fit.</p>
                <button 
                  onClick={() => { setSelectedCat('All'); setPriceMax(300); setSelectedColors([]); }}
                  className="bg-brandCharcoal text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand transition-all shadow-lg"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] lg:hidden animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-brandCharcoal/40 backdrop-blur-md"
            onClick={() => setShowMobileFilters(false)}
          />
          <aside className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-white p-8 flex flex-col shadow-2xl animate-in slide-in-from-right duration-500">
            <div className="flex items-center justify-between mb-10 shrink-0">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-brandCharcoal text-brand flex items-center justify-center shadow-lg">
                    <Filter className="w-5 h-5" />
                 </div>
                 <h2 className="text-2xl font-black tracking-tighter uppercase italic">Filters</h2>
              </div>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-12 hide-scrollbar">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search gear..." 
                    className="w-full bg-brandOffWhite border border-brandCharcoal/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold tracking-tight outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>

                {/* Mobile Category */}
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand mb-6 border-l-4 border-brand pl-3">Gear Class</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCat(cat)}
                        className={twMerge(
                          "px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                          selectedCat === cat 
                            ? "bg-brandCharcoal text-white shadow-xl" 
                            : "bg-brandOffWhite text-slate-400"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Price */}
                <div>
                   <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand mb-6 border-l-4 border-brand pl-3">Allocation Limit</h3>
                   <div className="bg-brandOffWhite p-6 rounded-3xl border border-brandCharcoal/5 mb-4 text-center">
                      <span className="text-4xl font-display font-black text-brandCharcoal tracking-tighter italic">
                         <span className="text-lg font-medium mr-1">$</span>{priceMax}
                      </span>
                   </div>
                   <input
                    type="range"
                    min={0}
                    max={300}
                    step={10}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand"
                  />
                </div>

                {/* Mobile Reset */}
                <button
                  onClick={() => { setSelectedCat('All'); setPriceMax(300); setSelectedColors([]); setShowMobileFilters(false); }}
                  className="w-full py-5 bg-brandOffWhite rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-brand transition-all border border-brandCharcoal/5"
                >
                  Factory Reset
                </button>
            </div>

            <div className="pt-8 mt-auto shrink-0">
               <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-5 bg-brand text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-brand/20 active:scale-95 transition-transform"
               >
                  Show {filtered.length} Results
               </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Shop;
