import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, Zap } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import { cartBounce, pageEnter } from '../../animations/gsapAnimations';
import { twMerge } from 'tailwind-merge';
import SearchPulse from './SearchPulse';

const Navbar = () => {
    const items = useCartStore((s) => s.items);
    const cartCount = items.reduce((sum, i) => sum + i.qty, 0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const badgeRef = useRef(null);
    const navRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (navRef.current) pageEnter(navRef.current);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
            if (e.key === 'Escape') setIsSearchOpen(false);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleCartClick = () => {
        if (badgeRef.current && cartCount > 0) cartBounce(badgeRef.current);
        navigate('/cart');
    };

    const NAV_LINKS = [
        { name: 'Shop', path: '/shop' },
        { name: 'Men', path: '/shop?cat=men' },
        { name: 'Women', path: '/shop?cat=women' },
        { name: 'New Arrivals', path: '/shop?new=true' },
    ];

    return (
        <>
            {/* Announcement bar */}
            <div className="bg-brandCharcoal text-brandSoftBeige text-[10px] md:text-xs uppercase tracking-[0.2em] py-2.5 text-center font-semibold relative overflow-hidden z-[60]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_3s_infinite]" />
                Free Shipping on orders over $150 &amp; 30-day Free Returns
            </div>

            <header 
                ref={navRef} 
                className={twMerge(
                    "sticky top-0 z-50 transition-all duration-500 border-b",
                    isScrolled 
                        ? "glass shadow-sm border-white/10 py-0" 
                        : "bg-transparent border-transparent py-2"
                )}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
                    {/* Left: Mobile Menu & Search */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(true)}
                            className="p-2 hover:bg-black/5 rounded-full transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu className="w-6 h-6 text-brandCharcoal" strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Logo + Nav links */}
                    <div className="flex items-center gap-10">
                        <Link to="/" className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-brandCharcoal hover:opacity-80 transition-opacity flex items-center gap-2">
                            <Zap className="w-6 h-6 text-brand lg:hidden" fill="currentColor" />
                            <span className="hidden sm:inline">VELOCITY</span><span className="text-brand hidden sm:inline">.</span>
                            <span className="sm:hidden">VELOCITY</span>
                        </Link>

                        <div className="hidden lg:flex gap-8 text-[13px] font-bold tracking-widest uppercase">
                            {NAV_LINKS.map(link => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `relative overflow-hidden group py-2 hover:text-brand transition-colors duration-300 ${isActive ? 'text-brand' : 'text-brandCharcoal/80'}`
                                    }
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Right icons */}
                    <div className="flex items-center gap-1 sm:gap-3">
                        <button 
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 sm:p-2.5 hover:bg-black/5 rounded-full transition-colors group relative"
                            aria-label="Open search"
                        >
                            <Search className="w-5 h-5 text-brandCharcoal group-hover:text-brand transition-colors" strokeWidth={1.5} />
                            <span aria-hidden="true" className="hidden xl:inline-flex absolute left-full ml-4 top-1/2 -translate-y-1/2 items-center gap-1 px-2 py-1 bg-brandOffWhite border border-brandCharcoal/5 rounded-lg text-[9px] font-black text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-[7px]">CTRL</span> K
                            </span>
                        </button>
                        <Link to="/account" aria-label="Go to account" className="p-2 sm:p-2.5 hover:bg-black/5 rounded-full transition-colors hidden sm:flex group">
                            <User className="w-5 h-5 text-brandCharcoal group-hover:text-brand transition-colors" strokeWidth={1.5} />
                        </Link>
                        <button
                            onClick={handleCartClick}
                            className="p-2 sm:p-2.5 hover:bg-black/5 rounded-full transition-colors relative group"
                            aria-label={cartCount > 0 ? `Shopping cart with ${cartCount} items` : "Shopping cart"}
                        >
                            <ShoppingBag className="w-5 h-5 text-brandCharcoal group-hover:text-brand transition-colors" strokeWidth={1.5} />
                            {cartCount > 0 && (
                                <span
                                    ref={badgeRef}
                                    aria-hidden="true"
                                    className="absolute top-0 right-0 bg-brand text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold shadow-soft ring-2 ring-white"
                                >
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Search Pulse Overlay */}
            <SearchPulse isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* Premium Mobile Menu Overlay */}
            <div 
              className={twMerge(
                "fixed inset-0 z-[100] transition-all duration-500",
                isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
              )}
            >
                {/* Backdrop */}
                <div 
                  className={twMerge(
                    "absolute inset-0 bg-brandCharcoal/40 backdrop-blur-md transition-opacity duration-500",
                    isMenuOpen ? "opacity-100" : "opacity-0"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                />

                {/* Sidebar */}
                <aside 
                    className={twMerge(
                      "absolute top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col p-8",
                      isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <div className="flex items-center justify-between mb-12">
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black tracking-tighter text-brandCharcoal">
                            VELOCITY<span className="text-brand">.</span>
                        </Link>
                        <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="p-2 hover:bg-black/5 rounded-full transition-colors">
                            <X className="w-6 h-6 text-brandCharcoal" />
                        </button>
                    </div>

                    <nav className="flex-1 space-y-6">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block text-2xl font-display font-black tracking-tighter transition-all duration-300 ${isActive ? 'text-brand italic translate-x-2' : 'text-brandCharcoal hover:text-brand hover:translate-x-2'}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="pt-8 border-t border-brandCharcoal/5 space-y-6">
                        <Link 
                            to="/account" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-brandCharcoal"
                        >
                            <User className="w-5 h-5 text-brand" />
                            Command Center
                        </Link>
                        <div className="p-6 bg-brandOffWhite rounded-[2rem] border border-brandCharcoal/5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand mb-2">Exclusive Offer</p>
                            <p className="text-sm font-bold text-brandCharcoal italic mb-4 leading-tight">Join Velocity Elite for 15% off your first gear drop.</p>
                            <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-brandCharcoal underline decoration-brand/30">Join the movement</Link>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default Navbar;
