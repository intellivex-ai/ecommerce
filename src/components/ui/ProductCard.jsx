import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import StarRating from './StarRating';
import useCartStore from '../../store/cartStore';
import { productHover, cartBounce, toastFeedback } from '../../animations/gsapAnimations';
import QuickView from './QuickView';
import { useState } from 'react';

const ProductCard = ({ product, className = '' }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isWishlisted = useCartStore((s) => s.isWishlisted(product.id));

  useEffect(() => {
    if (cardRef.current && imgRef.current) {
      productHover(cardRef.current, imgRef.current);
    }
  }, []);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ 
      ...product, 
      size: product.sizes?.[0] || 'Default', 
      color: product.colors?.[0]?.name || 'Default' 
    });
    // Optimistic feedback
    toastFeedback('Added to collection');
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.nextSibling;
    if (fallback) fallback.style.display = 'flex';
  };

  return (
    <article
      ref={cardRef}
      className={`group relative flex flex-col cursor-pointer bg-white rounded-2xl p-3 border border-transparent hover:border-brand/10 transition-all duration-500 hover:shadow-premium product-card ${className}`}
    >
      {/* Wishlist Button */}
      <button
        onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            toggleWishlist(product); 
            toastFeedback(isWishlisted ? 'Removed from vault' : 'Added to vault');
        }}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`absolute top-6 right-6 z-10 p-2.5 rounded-full glass transition-all duration-300 transform scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 focus-visible:scale-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
          isWishlisted ? 'bg-red-50 text-red-500 opacity-100 scale-100' : 'text-brandCharcoal hover:bg-white'
        }`}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} strokeWidth={1.5} />
      </button>

      {/* Image Container */}
      <div className="aspect-[4/5] overflow-hidden bg-brandOffWhite rounded-xl relative mb-5">
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
          {product.images && product.images.length > 0 ? (
            <>
              <img
                ref={imgRef}
                src={product.images[0]}
                alt={product.title || product.name}
                onError={handleImageError}
                className="object-cover w-full h-full transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 min-h-[300px]">
              No Image
            </div>
          )}
        </Link>

        {/* Action Overlay */}
        <div className="absolute bottom-4 inset-x-4 flex gap-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100 transition-all duration-500 ease-out">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowQuickView(true); }}
            className="flex-1 bg-white text-brandCharcoal py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-lg hover:bg-brandCharcoal hover:text-white transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <Eye className="w-4 h-4" strokeWidth={1.5} />
            View
          </button>
          <button
            onClick={handleQuickAdd}
            aria-label="Add to cart"
            className="flex-none bg-brandCharcoal text-white p-3 rounded-xl shadow-lg hover:bg-brand transition-all group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" strokeWidth={1.5} />
          </button>
        </div>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-brand text-white text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-[0.15em] shadow-sm z-10">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-grow px-1">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] text-brand/70 font-bold uppercase tracking-widest">{product.series || product.categories?.name || 'Collection'}</p>
          <StarRating rating={product.rating || 5} />
        </div>
        
        <h3 className="text-brandCharcoal text-base font-bold leading-tight mb-2 group-hover:text-brand transition-colors">
          <Link to={`/product/${product.id}`}>
            {product.title || product.name}
          </Link>
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-brandOffWhite">
          <p className="text-xl font-black text-brandCharcoal tracking-tight">
            <span className="text-sm font-medium text-slate-400 mr-0.5">$</span>
            {Number(product.price).toFixed(2)}
          </p>
          
          <div className="flex gap-1">
            {(product.colors || []).slice(0, 3).map((c) => (
              <span
                key={c.name}
                className="w-2.5 h-2.5 rounded-full border border-white shadow-sm ring-1 ring-slate-100"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {showQuickView && (
        <QuickView product={product} onClose={() => setShowQuickView(false)} />
      )}
    </article>
  );
};

export default ProductCard;
