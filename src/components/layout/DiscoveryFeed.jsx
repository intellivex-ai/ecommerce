import React, { useEffect, useState } from 'react';
import { ArrowRight, History, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import useDiscoveryStore from '../../store/discoveryStore';
import { productService } from '../../services/productService';
import ProductCard from '../ui/ProductCard';
import { scrollReveal } from '../../animations/gsapAnimations';

const DiscoveryFeed = () => {
    const recentlyViewed = useDiscoveryStore((s) => s.recentlyViewed);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTrending = async () => {
            try {
                const data = await productService.fetchTrendingProducts();
                setTrending(data);
            } catch (err) {
                console.error("Discovery Engine Error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadTrending();
        scrollReveal('.discovery-reveal');
    }, []);

    if (recentlyViewed.length === 0 && trending.length === 0) return null;

    return (
        <section className="py-32 bg-brandOffWhite/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-32">
                
                {/* Recently Viewed: The "Neural Memory" */}
                {recentlyViewed.length > 0 && (
                    <div className="discovery-reveal">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <History className="w-4 h-4 text-brand" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand">Mission History</span>
                                </div>
                                <h2 className="text-5xl font-display font-black tracking-tighter text-brandCharcoal italic">
                                    Resuming <span className="text-brand">Discovery.</span>
                                </h2>
                            </div>
                            <button 
                                onClick={() => useDiscoveryStore.getState().clearHistory()}
                                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
                            >
                                Purge Logs
                            </button>
                        </div>

                        <div className="flex gap-8 overflow-x-auto pb-12 hide-scrollbar -mx-4 px-4 mask-fade-right">
                            {recentlyViewed.map((p) => (
                                <div key={p.id} className="w-[280px] shrink-0 hover:scale-105 transition-transform duration-500">
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Trending Gear: The "Global Pulse" */}
                <div className="discovery-reveal">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="w-4 h-4 text-brand" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand">Velocity Global Pulse</span>
                            </div>
                            <h2 className="text-5xl font-display font-black tracking-tighter text-brandCharcoal italic mb-6">
                                Trending in the <span className="text-brand">Network.</span>
                            </h2>
                            <p className="text-slate-500 font-medium italic">
                                High-activity gear models currently being deployed by the Velocity pilot network globally.
                            </p>
                        </div>
                        <Link to="/shop" className="group flex items-center gap-4 text-sm font-black uppercase tracking-widest text-brandCharcoal hover:text-brand transition-all">
                            Explore Full Catalog
                            <div className="w-12 h-12 rounded-full border border-brandCharcoal/10 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all duration-500">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {loading ? (
                            [1,2,3,4].map(i => <div key={i} className="aspect-[4/5] bg-white rounded-[2.5rem] animate-pulse" />)
                        ) : (
                            trending.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))
                        )}
                    </div>
                </div>

                {/* Neural Call to Action */}
                <div className="discovery-reveal bg-brandCharcoal rounded-[4rem] p-12 md:p-24 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[160px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                             <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
                                <Sparkles className="w-4 h-4 text-brand" fill="currentColor" />
                                <span className="text-[10px] font-black tracking-[0.25em] uppercase text-brandSoftBeige">Velocity Discovery Hub</span>
                             </div>
                             <h3 className="text-5xl md:text-7xl font-display font-black text-white italic tracking-tighter leading-[0.9] mb-8">
                                Your gear, <br/> <span className="text-brand">Optimized.</span>
                             </h3>
                             <p className="text-slate-400 text-lg font-medium italic mb-12 max-w-md">
                                Experience a truly personalized storefront that evolves with your performance needs.
                             </p>
                             <Link to="/shop" className="inline-flex items-center gap-4 px-10 py-5 bg-brand text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all group">
                                Launch Full Discovery
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                             </Link>
                        </div>
                        <div className="hidden lg:block relative">
                            <div className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full" />
                            <div className="relative aspect-square bg-gradient-to-br from-brand/20 to-transparent rounded-[3rem] border border-white/10 flex items-center justify-center group-hover:rotate-6 transition-transform duration-1000">
                                <Zap className="w-48 h-48 text-white/10 group-hover:text-brand/40 transition-colors" fill="currentColor" strokeWidth={0} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default DiscoveryFeed;
