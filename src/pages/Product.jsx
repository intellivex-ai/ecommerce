import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Star,
  Leaf
} from 'lucide-react';
import { productService } from '../services/productService';
import { reviewService } from '../services/reviewService';
import { useProducts } from '../hooks/useProducts';
import useCartStore from '../store/cartStore';
import useDiscoveryStore from '../store/discoveryStore';
import StarRating from '../components/ui/StarRating';
import ProductGrid from '../components/ProductGrid';
import ProductRecs from '../components/layout/ProductRecs';
import { pageEnter, scrollReveal } from '../animations/gsapAnimations';
import { twMerge } from 'tailwind-merge';

const Accordion = ({ title, icon: Icon, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="group py-6 border-b border-brandCharcoal/5 transition-all duration-300">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-brand" strokeWidth={1.5} />}
          <span className="text-sm font-black uppercase tracking-widest text-brandCharcoal">{title}</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      <div className={twMerge(
        "grid transition-all duration-300 ease-in-out",
        open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden text-sm text-slate-500 leading-relaxed font-medium pl-8 italic">
          {children}
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loadProductById, loading: globalLoading } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [stockLevel, setStockLevel] = useState(0);

  // Memoize related products to prevent redundant calculations
  // and unnecessary GSAP stagger animations in the ProductRecs component on every render
  const related = useMemo(() => {
    return products.filter(p => String(p.id) !== String(id)).slice(0, 4);
  }, [products, id]);

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isWishlisted = useCartStore((s) => s.isWishlisted(product?.id));
  const addRecentlyViewed = useDiscoveryStore((s) => s.addRecentlyViewed);
  const ref = useRef(null);
  const reviewsRef = useRef(null);

  const fetchReviews = async () => {
    try {
      const data = await reviewService.fetchProductReviews(id);
      setReviews(data || []);
    } catch (e) {
      console.error("Failed to load reviews", e);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (ref.current) pageEnter(ref.current);

    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await loadProductById(id);
        setProduct(data || null);
        if (data) {
          addRecentlyViewed(data);
          setStockLevel(data.stock_quantity || 0);
          setSelectedColor(data.colors?.[0] || null);
          setSelectedSize(null);
          // Fetch reviews separately to not block main content
          reviewService.fetchProductReviews(id)
            .then(data => setReviews(data || []))
            .catch(e => console.error("Failed to load reviews", e));
        }
      } catch (e) {
        console.error("Failed to load product", e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();

    // Real-time Subscriptions
    const productSub = productService.subscribeToProduct(id, (updatedProduct) => {
      setProduct(prev => prev ? ({ ...prev, ...updatedProduct }) : updatedProduct);
      if (updatedProduct.stock_quantity !== undefined) {
        setStockLevel(updatedProduct.stock_quantity);
      }
    });

    const reviewSub = reviewService.subscribeToReviews(id, () => {
      reviewService.fetchProductReviews(id)
        .then(data => setReviews(data || []))
        .catch(e => console.error("Failed to load reviews", e));
    });

    return () => {
      productSub.unsubscribe();
      reviewSub.unsubscribe();
    };
  }, [id, loadProductById, addRecentlyViewed]);

  useEffect(() => {
    if (product && reviewsRef.current) {
      const reviewCards = reviewsRef.current.querySelectorAll('.review-card');
      if (reviewCards.length > 0) scrollReveal(reviewCards);
    }
  }, [product, reviews.length]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-brandOffWhite">
        <div className="w-16 h-16 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-brandOffWhite p-6 text-center">
        <div className="bg-white p-12 rounded-3xl shadow-soft max-w-md w-full">
          <h2 className="text-3xl font-black tracking-tighter text-brandCharcoal mb-4">Product Not Found.</h2>
          <p className="text-slate-500 mb-8 font-medium italic">The item you're looking for might have been moved or is no longer available.</p>
          <Link to="/shop" className="bg-brandCharcoal text-white px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-brand transition-all flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      alert('Please select a size to proceed.');
      return;
    }
    addItem({ ...product, size: selectedSize, color: selectedColor?.name });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    if (selectedSize || !product.sizes || product.sizes.length === 0) navigate('/checkout');
  };

  return (
    <div ref={ref} className="bg-brandOffWhite min-h-screen relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 relative z-10">
        {/* Breadcrumb & Navigation */}
        <nav className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Link to="/" className="hover:text-brand transition-colors">Home</Link>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <Link to="/shop" className="hover:text-brand transition-colors">Shop</Link>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-brandCharcoal">{product.title || product.name}</span>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand transition-colors">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </nav>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 items-start">
          {/* Left: Immersive Gallery */}
          <section className="lg:col-span-7 mb-16 lg:mb-0">
            <div className="flex flex-col-reverse md:flex-row gap-6">
              {/* Vertical Thumbnails */}
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto hide-scrollbar md:max-h-[600px] shrink-0 pb-2 md:pb-0">
                {(product.images || []).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={twMerge(
                      "w-20 h-24 md:w-28 md:h-36 flex-shrink-0 bg-white rounded-2xl border-2 overflow-hidden transition-all duration-500 relative group",
                      selectedImg === i ? 'border-brand shadow-lg ring-4 ring-brand/10' : 'border-transparent hover:border-brand/30 grayscale hover:grayscale-0'
                    )}
                  >
                    <img src={img} alt={`Angle ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              
              {/* Main Immersive Image */}
              <div className="flex-1 aspect-[4/5] bg-white rounded-3xl overflow-hidden relative shadow-soft group">
                <div className="absolute inset-0 bg-gradient-to-tr from-brandCharcoal/5 via-transparent to-transparent pointer-events-none z-10" />
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImg]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 italic">No Imagery Available</div>
                )}
                
                {/* Wishlist Toggle Image-Overlay */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={twMerge(
                    "absolute top-6 right-6 z-20 w-12 h-12 rounded-full glass border-white/40 flex items-center justify-center transition-all duration-500",
                    isWishlisted ? "bg-red-50 text-red-500 shadow-lg scale-110 border-red-100" : "text-brandCharcoal hover:bg-white"
                  )}
                >
                  <Heart className={twMerge("w-5 h-5", isWishlisted && "fill-current")} />
                </button>
                
                {/* Technical Overlay */}
                <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-2">
                   <div className="bg-brandCharcoal/80 backdrop-blur-md px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
                     <ShieldCheck className="w-3.5 h-3.5 text-brand" />
                     Authenticity Guaranteed
                   </div>
                   <div className="bg-brand/90 backdrop-blur-md px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
                     <Zap className="w-3.5 h-3.5" />
                     Performance Built
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right: Premium Product Info */}
          <aside className="lg:col-span-5 lg:sticky top-32">
            <div className="space-y-8">
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 bg-brand/10 px-3 py-1.5 rounded-full">
                    <span className="text-[10px] font-black tracking-widest uppercase text-brand">
                      {product.categories?.name || product.series || 'Elite Collection'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <StarRating rating={product.rating || 5} />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">({reviews.length || product.reviewCount || 0} reviews)</span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-display font-extrabold text-brandCharcoal tracking-tighter leading-none">
                  {product.title || product.name}
                </h1>
                
                <div className="space-y-4">
                  <div className="flex items-baseline gap-3">
                    <p className="text-4xl font-black text-brandCharcoal tracking-tighter italic">
                      <span className="text-xl font-medium mr-1 select-none">$</span>
                      {Number(product.price).toFixed(2)}
                    </p>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest line-through select-none opacity-50">$240.00</span>
                  </div>

                  {/* Live Stock Pulse */}
                  <div className="flex items-center gap-3 bg-brandOffWhite px-4 py-2 rounded-xl w-fit border border-brandCharcoal/5">
                    <div className={twMerge(
                      "w-2 h-2 rounded-full animate-pulse",
                      stockLevel > 20 ? "bg-emerald-500" : stockLevel > 0 ? "bg-amber-500" : "bg-red-500"
                    )} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {stockLevel > 20 ? "Live Stock Terminal: Operational" : stockLevel > 0 ? `Critical Stock: ${stockLevel} Units Left` : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Color Selection */}
              {(product.colors?.length > 0) && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-brandCharcoal/40">Exclusive Colorways</h3>
                    <span className="text-[10px] font-bold text-brand uppercase tracking-widest">{selectedColor?.name}</span>
                  </div>
                  <div className="flex gap-4">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={twMerge(
                          "w-12 h-12 rounded-2xl border-2 transition-all p-1 flex items-center justify-center relative group",
                          selectedColor?.name === c.name ? "border-brand shadow-lg ring-4 ring-brand/10" : "border-transparent hover:border-brand/40"
                        )}
                        style={{ backgroundColor: c.hex }}
                      >
                         <div className={twMerge(
                           "absolute inset-0 rounded-2xl border-2 border-white/30 pointer-events-none transition-opacity",
                           selectedColor?.name === c.name ? "opacity-100" : "opacity-0"
                         )} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {(product.sizes?.length > 0) && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-brandCharcoal/40">Technical Sizing (US)</h3>
                    <button className="text-[10px] font-black text-brand border-b border-brand/20 uppercase tracking-widest hover:border-brand transition-colors">Size Guide</button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-3">
                    {product.sizes.map((s) => {
                      const soldOut = (product.soldOut || []).includes(s);
                      return (
                        <button
                          key={s}
                          disabled={soldOut}
                          onClick={() => setSelectedSize(s)}
                          className={twMerge(
                            "h-14 flex items-center justify-center rounded-2xl border transition-all duration-300 relative overflow-hidden group",
                            selectedSize === s
                              ? "bg-brandCharcoal border-brandCharcoal text-white shadow-xl z-10"
                              : soldOut
                                ? "bg-slate-50 border-slate-100 text-slate-300 opacity-40 cursor-not-allowed"
                                : "bg-white border-brandCharcoal/5 text-brandCharcoal hover:border-brand/40 hover:text-brand"
                          )}
                        >
                          <span className="text-sm font-black italic">{s}</span>
                          {!soldOut && selectedSize !== s && (
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTA Actions */}
              <div className="flex flex-col gap-4 pt-6">
                <button
                  onClick={handleAddToCart}
                  className="group relative w-full py-5 bg-brand text-white font-black rounded-2xl transition-all duration-500 shadow-xl shadow-brand/30 hover:shadow-brand/40 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <div className="relative flex items-center justify-center gap-3 tracking-[0.2em] text-xs">
                    <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
                    ADD TO CART
                  </div>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full py-5 bg-white border border-brandCharcoal text-brandCharcoal font-black rounded-2xl transition-all duration-300 hover:bg-brandCharcoal hover:text-white flex items-center justify-center gap-3 tracking-[0.2em] text-xs"
                >
                  <Zap className="w-5 h-5" />
                  INSTANT CHECKOUT
                </button>
              </div>

              {/* Product Trust Features */}
              <div className="grid grid-cols-2 gap-4 py-8 border-y border-brandCharcoal/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-brandCharcoal">Free Delivery</p>
                    <p className="text-[9px] text-slate-400 uppercase font-bold">Orders over $150</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <RotateCcw className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-brandCharcoal">Elite Returns</p>
                    <p className="text-[9px] text-slate-400 uppercase font-bold">30-day trial window</p>
                  </div>
                </div>
              </div>

              {/* Technical Accordions */}
              <div className="space-y-1">
                <Accordion title="Technical Description" icon={Zap}>
                  <p className="font-medium text-slate-500 italic mb-4">{product.description || 'Precision engineered for high-performance motion.'}</p>
                  <div className="flex flex-wrap gap-2">
                    {['Zero-Drop', 'Ultra-Response', 'Bio-Traction'].map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-brand/5 border border-brand/10 rounded-lg text-[9px] font-black uppercase text-brand">#{tag}</span>
                    ))}
                  </div>
                </Accordion>
                <Accordion title="Bio-Materials" icon={Leaf}>
                  <ul className="grid grid-cols-1 gap-3">
                    {(product.materials || ['100% Recycled Ocean Plastic', 'Sustainable Eucalyptus Fibers', 'Sugarcane SweetFoam®']).map((m) => (
                      <li key={m} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </Accordion>
                <Accordion title="Sustainability Footprint" icon={ShieldCheck}>
                   <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                     <p className="text-emerald-800 text-xs font-bold mb-2 flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4" />
                       Carbon Score: A+
                     </p>
                     <p className="text-[11px] text-emerald-600 font-medium italic">
                       {product.sustainability || 'This product is fully offset and produced in 100% renewable energy facilities.'}
                     </p>
                   </div>
                </Accordion>
              </div>
            </div>
          </aside>
        </div>

        {/* Dynamic Reviews Section */}
        <section className="mt-32 relative" ref={reviewsRef}>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brandCharcoal/10 to-transparent" />
          
          <div className="max-w-4xl mx-auto pt-24 text-center mb-20 review-card">
            <h2 className="text-[11px] font-black tracking-[0.4em] uppercase text-brand mb-6">Verified Performance</h2>
            <h3 className="text-4xl md:text-5xl font-display font-extrabold text-brandCharcoal tracking-tighter italic">
              What the <span className="text-gradient">Athletes say.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(reviews.length > 0 ? reviews.map((r, i) => (
              <div key={r.id || i} className="review-card bg-white p-10 rounded-3xl shadow-soft border border-brandCharcoal/5 group hover:-translate-y-2 transition-all duration-500">
                <div className="flex justify-between items-center mb-6">
                  <StarRating rating={r.rating} size="w-4 h-4" />
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Verified Buyer</span>
                </div>
                <h4 className="font-bold text-brandCharcoal text-lg mb-4 group-hover:text-brand transition-colors">{r.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed italic mb-8">"{r.comment || r.body}"</p>
                <div className="flex items-center gap-3 pt-6 border-t border-brandCharcoal/5">
                  <div className="w-8 h-8 rounded-full bg-brandOffWhite flex items-center justify-center text-[10px] font-black text-brand">
                    {(r.profiles?.full_name || r.author || 'Anonymous').charAt(0)}
                  </div>
                  <p className="text-[10px] font-black text-brandCharcoal uppercase tracking-[0.2em]">{r.profiles?.full_name || r.author || 'Anonymous'}</p>
                </div>
              </div>
            )) : [
              { rating: 5, title: 'Revolutionary Comfort', body: 'The cushioning is like nothing I have ever felt. Perfect for long distance.', author: 'Alex M.' },
              { rating: 5, title: 'Sustainable & Fast', body: 'Finally a performance shoe that doesn\'t kill the planet. Highly recommended.', author: 'Jordan S.' },
              { rating: 4, title: 'Great Trail Grip', body: 'Took these into the mountains and they performed brilliantly.', author: 'Taylor W.' }
            ].map((r, i) => (
              <div key={i} className="review-card bg-white p-10 rounded-3xl shadow-soft border border-brandCharcoal/5 group hover:-translate-y-2 transition-all duration-500">
                <div className="flex justify-between items-center mb-6">
                  <StarRating rating={r.rating} size="w-4 h-4" />
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Verified Buyer</span>
                </div>
                <h4 className="font-bold text-brandCharcoal text-lg mb-4 group-hover:text-brand transition-colors">{r.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed italic mb-8">"{r.body}"</p>
                <div className="flex items-center gap-3 pt-6 border-t border-brandCharcoal/5">
                  <div className="w-8 h-8 rounded-full bg-brandOffWhite flex items-center justify-center text-[10px] font-black text-brand">
                    {r.author.charAt(0)}
                  </div>
                  <p className="text-[10px] font-black text-brandCharcoal uppercase tracking-[0.2em]">{r.author}</p>
                </div>
              </div>
            )))}
          </div>

          <div className="mt-20 text-center">
            <button className="bg-white border border-brandCharcoal/10 px-12 py-5 rounded-2xl font-black text-xs tracking-widest text-brandCharcoal uppercase hover:bg-brandCharcoal hover:text-white transition-all shadow-xl shadow-brand/5">
              LOAD MORE REVIEWS (24)
            </button>
          </div>
        </section>

        {/* Neural Recommendations Section */}
        <ProductRecs currentProduct={product} />
      </main>
    </div>
  );
};

export default Product;
