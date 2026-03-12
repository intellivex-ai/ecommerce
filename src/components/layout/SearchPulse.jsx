import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, ArrowRight, Clock, TrendingUp, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import useDiscoveryStore from '../../store/discoveryStore';
import { formatPrice } from '../../utils/formatPrice';
import gsap from 'gsap';

const SearchPulse = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchHistory = useDiscoveryStore((s) => s.searchHistory);
    const addSearchTerm = useDiscoveryStore((s) => s.addSearchTerm);
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            gsap.fromTo(containerRef.current, 
                { opacity: 0, scale: 1.02, y: -20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power4.out" }
            );
        }
    }, [isOpen]);

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setLoading(true);
                try {
                    const data = await productService.searchSuggestions(query);
                    setSuggestions(data);
                } catch (err) {
                    console.error("Pulse Engine Failure:", err);
                } finally {
                    setLoading(false);
                }
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleSearch = (e) => {
        e?.preventDefault();
        if (query.trim()) {
            addSearchTerm(query);
            navigate(`/shop?search=${encodeURIComponent(query)}`);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 sm:px-6">
            {/* High-fidelity blur backdrop */}
            <div 
                className="absolute inset-0 bg-brandCharcoal/20 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            <div 
                ref={containerRef}
                className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.15)] border border-brandCharcoal/5 overflow-hidden flex flex-col max-h-[70vh]"
            >
                {/* Search Header */}
                <form onSubmit={handleSearch} className="relative p-6 border-b border-brandCharcoal/5 shrink-0 bg-white z-10">
                    <div className="relative group">
                        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${loading ? 'text-brand' : 'text-slate-400 group-focus-within:text-brand'}`} />
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search Velocity Gear..."
                            className="w-full bg-brandOffWhite rounded-2xl py-5 pl-14 pr-14 text-lg font-bold tracking-tight text-brandCharcoal placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand/20 transition-all italic"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                           {loading && <Loader2 className="w-5 h-5 text-brand animate-spin" />}
                           {query && (
                               <button 
                                 type="button"
                                 onClick={() => setQuery('')}
                                 className="p-1 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
                               >
                                 <X className="w-4 h-4" />
                               </button>
                           )}
                           <kbd className="hidden sm:inline-flex px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-400 shadow-sm uppercase tracking-widest leading-none">ESC</kbd>
                        </div>
                    </div>
                </form>

                {/* Suggestions Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-10 hide-scrollbar">
                    {query.trim().length >= 2 ? (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand flex items-center gap-2 italic">
                                   <Zap className="w-3 h-3" fill="currentColor" />
                                   Neural Suggestions
                                </h3>
                                <div className="h-px flex-grow ml-4 bg-brand/10" />
                            </div>
                            
                            {suggestions.length > 0 ? (
                                <div className="grid gap-3">
                                    {suggestions.map((p) => (
                                        <Link 
                                            key={p.id}
                                            to={`/product/${p.id}`}
                                            onClick={onClose}
                                            className="group flex items-center gap-4 p-4 hover:bg-brandOffWhite rounded-3xl transition-all border border-transparent hover:border-brandCharcoal/5"
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-brandOffWhite overflow-hidden relative shrink-0 border border-brandCharcoal/5 shadow-sm group-hover:scale-105 transition-transform">
                                                <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0 text-left">
                                                <h4 className="font-display font-black text-brandCharcoal group-hover:text-brand transition-colors truncate italic italic">{p.title}</h4>
                                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{formatPrice(p.price)}</p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-brand group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                                        </Link>
                                    ))}
                                </div>
                            ) : !loading && (
                                <div className="text-center py-12 bg-brandOffWhite rounded-3xl border border-dashed border-brandCharcoal/5">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] italic leading-relaxed">No direct pulse matches.<br/>Try broadening your gear parameters.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-10">
                            {/* History */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <Clock className="w-4 h-4 text-brand" />
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand">Mission History</h3>
                                </div>
                                {searchHistory.length > 0 ? (
                                    <div className="grid gap-2">
                                        {searchHistory.map((term, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => { setQuery(term); inputRef.current?.focus(); }}
                                                className="text-left w-full p-4 hover:bg-brandOffWhite rounded-2xl text-sm font-bold text-slate-500 hover:text-brandCharcoal transition-colors flex items-center justify-between group"
                                            >
                                                {term}
                                                <TrendingUp className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs font-medium text-slate-400 italic">No recent trajectory data.</p>
                                )}
                            </div>

                            {/* Trending / Directives */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <TrendingUp className="w-4 h-4 text-brand" />
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand">Popular Directives</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['Apex Runners', 'Carbon Plate', 'Trail Elite', 'Velocity V2', 'Sustainable Gear'].map(tag => (
                                        <button 
                                            key={tag}
                                            onClick={() => { setQuery(tag); inputRef.current?.focus(); }}
                                            className="px-4 py-2 bg-brandOffWhite text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-brand hover:text-white rounded-full transition-all border border-brandCharcoal/5"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Pulse Footer */}
                <div className="p-6 bg-brandOffWhite mt-auto shrink-0 flex items-center justify-between border-t border-brandCharcoal/5">
                   <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Velocity Suggestion Engine v1.4</p>
                   {query && (
                       <button 
                         onClick={handleSearch}
                         className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand group"
                       >
                         Execute Full Search
                         <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                       </button>
                   )}
                </div>
            </div>
        </div>
    );
};

export default SearchPulse;
