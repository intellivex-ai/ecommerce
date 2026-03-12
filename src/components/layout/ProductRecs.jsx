import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { productService } from '../../services/productService';
import ProductCard from '../ui/ProductCard';
import { pageEnter } from '../../animations/gsapAnimations';

const ProductRecs = ({ currentProduct }) => {
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecs = async () => {
            if (!currentProduct || !currentProduct.id || !currentProduct.category_id) {
                setLoading(false);
                return;
            }
            
            setLoading(true);
            try {
                const data = await productService.fetchRelatedProducts(
                    currentProduct.id, 
                    currentProduct.category_id
                );
                setRelated(data || []);
            } catch (err) {
                console.error("Neural Recs Engine Stalled:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecs();
    }, [currentProduct?.id, currentProduct?.category_id]);

    if (!loading && related.length === 0) return null;

    return (
        <section className="mt-32 pt-32 border-t border-brandCharcoal/5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 bg-brand/10 px-4 py-2 rounded-full mb-6">
                        <Sparkles className="w-3 h-3 text-brand" fill="currentColor" />
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-brand">Neural Logic</span>
                    </div>
                    <h2 className="text-5xl font-display font-black tracking-tighter text-brandCharcoal mb-4 italic">
                        Complete your <span className="text-brand">Mission profile.</span>
                    </h2>
                    <p className="text-slate-500 font-medium italic">
                        Selected by our recommendation engine based on your current gear selection and performance parameters.
                    </p>
                </div>
                
                <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-brandCharcoal hover:text-brand transition-colors group">
                    View Gear Library
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="aspect-[4/5] bg-brandOffWhite rounded-[2.5rem] animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {related.map((p, i) => (
                        <div key={p.id} className="reveal-rec">
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            )}

            {/* Bundle Concept (Static for visual impact) */}
            <div className="mt-24 p-12 bg-brandCharcoal rounded-[3rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="max-w-lg">
                        <h3 className="text-3xl font-display font-black text-white italic tracking-tighter mb-4 leading-tight">
                            The Velocity <span className="text-brand">Elite Bundle.</span>
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 italic">
                            Combine the {currentProduct?.title} with our High-Performance Compression kit for ultimate output efficiency.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="text-3xl font-black text-white tracking-tighter italic">
                               <span className="text-sm font-medium mr-1 text-slate-500 line-through">$240</span>
                               $199
                            </div>
                            <button className="px-8 py-4 bg-brand text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                                <ShoppingBag className="w-4 h-4" />
                                Optimize Bundle
                            </button>
                        </div>
                    </div>
                    <div className="flex -space-x-12 opacity-80 group-hover:opacity-100 transition-opacity">
                         <div className="w-48 h-64 rounded-3xl bg-brandOffWhite border-4 border-brandCharcoal shadow-2xl overflow-hidden rotate-[-6deg] group-hover:rotate-[-12deg] transition-transform">
                            <img src={currentProduct?.images[0]} className="w-full h-full object-cover" alt="" />
                         </div>
                         <div className="w-48 h-64 rounded-3xl bg-brandOffWhite border-4 border-brandCharcoal shadow-2xl overflow-hidden rotate-[6deg] group-hover:rotate-[12deg] transition-transform">
                            {related[0] && <img src={related[0].images[0]} className="w-full h-full object-cover" alt="" />}
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductRecs;
