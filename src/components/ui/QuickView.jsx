import { useRef, useEffect } from 'react';
import { X, ShoppingCart, Heart, Shield, Truck, RotateCcw } from 'lucide-react';
import StarRating from './StarRating';
import useCartStore from '../../store/cartStore';
import { modalEntrance, toastFeedback } from '../../animations/gsapAnimations';

const QuickView = ({ product, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isWishlisted = useCartStore((s) => s.isWishlisted(product.id));

  useEffect(() => {
    if (modalRef.current && overlayRef.current) {
      modalEntrance(modalRef.current, overlayRef.current);
    }
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleAddToCart = () => {
    addItem({ 
      ...product, 
      size: product.sizes?.[0] || 'Default', 
      color: product.colors?.[0]?.name || 'Default' 
    });
    toastFeedback('Added to collection');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Overlay */}
      <div 
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-brandCharcoal/80 backdrop-blur-md"
      />

      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-6 right-6 z-20 p-2 rounded-full glass-dark text-white hover:bg-brand transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="md:w-1/2 bg-brandOffWhite relative group overflow-hidden">
          <img 
            src={product.images?.[0]} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {product.badge && (
             <span className="absolute top-6 left-6 bg-brand text-white text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg">
                {product.badge}
             </span>
          )}
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
               <span className="text-[10px] font-black text-brand tracking-[0.2em] uppercase">{product.series || 'Elite Series'}</span>
               <StarRating rating={product.rating || 5} showCount count={product.reviews_count} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-brandCharcoal tracking-tighter mb-4">
              {product.title}
            </h2>
            <p className="text-2xl font-black text-brand tracking-tighter">
              <span className="text-sm font-medium text-slate-400 mr-1">$</span>
              {Number(product.price).toFixed(2)}
            </p>
          </div>

          <p className="text-slate-500 mb-8 leading-relaxed font-medium">
            {product.description || 'Experience the future of performance with Velocity. Engineered for elite athletes and trail blazers who demand more from every step.'}
          </p>

          {/* Sizing & Colors Placeholder */}
          <div className="flex gap-4 mb-10">
            <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Core Colors</p>
                <div className="flex gap-2">
                    {(product.colors || [{hex: '#E2E8F0'}, {hex: '#0F172A'}]).map((c, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-100 p-0.5 group/color cursor-pointer transition-transform hover:scale-110">
                            <div className="w-full h-full rounded-full" style={{ backgroundColor: c.hex }} />
                        </div>
                    ))}
                </div>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <button 
              onClick={handleAddToCart}
              className="flex-[2] bg-brandCharcoal text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-brand transition-all shadow-xl shadow-brandCharcoal/20 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
              Add to Collection
            </button>
            <button 
              onClick={() => { toggleWishlist(product); toastFeedback(isWishlisted ? 'Removed from vault' : 'Added to vault'); }}
              aria-label={isWishlisted ? 'Remove from vault' : 'Add to vault'}
              className={`flex-1 flex items-center justify-center rounded-2xl border transition-all focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                isWishlisted ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-slate-200 text-brandCharcoal hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-brand" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">2-Year Warranty</span>
            </div>
            <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-brand" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Free Express</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
