import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  MinusCircle, 
  PlusCircle, 
  ShoppingBag, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Truck,
  Ticket,
  Lock
} from 'lucide-react';
import useCartStore from '../store/cartStore';
import { pageEnter } from '../animations/gsapAnimations';
import { twMerge } from 'tailwind-merge';

const Cart = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);
  
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shippingThreshold = 150;
  const shipping = subtotal > shippingThreshold ? 0 : 12;
  const total = subtotal + shipping;
  const progress = Math.min((subtotal / shippingThreshold) * 100, 100);

  useEffect(() => {
    window.scrollTo(0, 0);
    pageEnter(ref.current);
  }, []);

  return (
    <div ref={ref} className="min-h-screen bg-brandOffWhite relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <main className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12 relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brandCharcoal/5 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand/10 px-4 py-2 rounded-full mb-6">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-brand">Your Gear Bag</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-extrabold tracking-tighter text-brandCharcoal">
               Cart <span className="text-brand">Review.</span>
            </h1>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest italic">
            {items.length === 0 ? "Empty bag" : `${items.reduce((s, i) => s + i.qty, 0)} Items Selected`}
          </p>
        </header>

        {items.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-24 bg-white rounded-[40px] shadow-soft border border-brandCharcoal/5 px-8">
            <div className="w-24 h-24 bg-brandOffWhite rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <ShoppingBag className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-brandCharcoal mb-4">Your bag is light.</h2>
            <p className="text-slate-500 mb-10 font-medium italic">It looks like you haven't added any gear to your cart yet. Let's find your perfect pair of performance footwear.</p>
            <Link
              to="/shop"
              className="group bg-brandCharcoal text-white font-black px-10 py-5 rounded-2xl hover:bg-brand transition-all flex items-center justify-center gap-3 tracking-[0.2em] text-xs shadow-xl shadow-brandCharcoal/20"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              START EXPLORING
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 lg:items-start">
            {/* Cart Items List */}
            <section className="lg:col-span-7 space-y-6">
              {/* Shipping Progress */}
              <div className="bg-white p-6 rounded-3xl border border-brandCharcoal/5 shadow-sm mb-10">
                 <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2">
                     <Truck className="w-4 h-4 text-brand" />
                     <span className="text-xs font-black uppercase tracking-widest text-brandCharcoal">
                       {shipping === 0 ? "Free Shipping Unlocked" : "Standard Shipping"}
                     </span>
                   </div>
                   {shipping > 0 && <span className="text-[10px] font-black text-brand italic">Add ${(shippingThreshold - subtotal).toFixed(2)} more for free delivery</span>}
                 </div>
                 <div className="h-2 w-full bg-brandOffWhite rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-brand transition-all duration-1000 ease-out" 
                     style={{ width: `${progress}%` }} 
                   />
                 </div>
              </div>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="group relative bg-white p-6 md:p-8 rounded-[32px] border border-brandCharcoal/5 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-32 md:w-36 md:h-44 bg-brandOffWhite rounded-2xl overflow-hidden shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={item.images?.[0] || 'https://via.placeholder.com/300'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 py-2">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand mb-2">{item.categories?.name || 'Exclusive'}</p>
                            <Link to={`/product/${item.id}`} className="text-xl md:text-2xl font-black text-brandCharcoal tracking-tighter hover:text-brand transition-colors">
                              {item.name}
                            </Link>
                            <div className="mt-3 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                              <span className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: item.colorHex || '#eee' }} />
                                {item.color}
                              </span>
                              <span className="w-px h-3 bg-slate-200" />
                              <span>Size US {item.size}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-xl font-black text-brandCharcoal italic tracking-tight">${item.price.toFixed(2)}</p>
                            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter mt-1">Unit Price</p>
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                          {/* Premium Qty control */}
                          <div className="flex items-center bg-brandOffWhite p-1 rounded-xl border border-brandCharcoal/5">
                            <button
                              onClick={() => updateQty(item.id, item.size, item.color, Math.max(0, item.qty - 1))}
                              className="p-2 text-slate-400 hover:text-brand transition-colors"
                            >
                              <MinusCircle className="w-5 h-5" />
                            </button>
                            <span className="w-10 text-center text-sm font-black italic text-brandCharcoal">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.size, item.color, item.qty + 1)}
                              className="p-2 text-slate-400 hover:text-brand transition-colors"
                            >
                              <PlusCircle className="w-5 h-5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id, item.size, item.color)}
                            className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group/trash"
                          >
                            <Trash2 className="w-5 h-5 transition-transform group-hover/trash:rotate-12" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10">
                <Link to="/shop" className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-brand transition-all">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  RETURN TO CATALOG
                </Link>
              </div>
            </section>

            {/* Order Summary Sidebar */}
            <aside className="mt-16 lg:col-span-5 lg:mt-0 sticky top-32">
              <div className="bg-white rounded-[40px] shadow-xl border border-brandCharcoal/5 p-10 overflow-hidden relative">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <h2 className="text-2xl font-black text-brandCharcoal tracking-tighter mb-10 flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-brand" />
                  Summary.
                </h2>
                
                <div className="space-y-6 pb-8 border-b border-brandCharcoal/5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Inventory Total</span>
                    <span className="text-lg font-black text-brandCharcoal italic">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Elite Logistics</span>
                    <span className={twMerge(
                      "text-lg font-black italic",
                      shipping === 0 ? "text-brand" : "text-brandCharcoal"
                    )}>
                      {shipping === 0 ? 'COMPLIMENTARY' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {/* Promo Input */}
                  <div className="relative pt-4">
                    <Ticket className="absolute left-4 top-[calc(1rem+1rem+0.8rem)] w-4 h-4 text-slate-400" />
                    <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 mb-3 ml-1">Access Protocol / Promo</label>
                    <div className="flex gap-2">
                       <input
                        type="text"
                        placeholder="SUMMER-24"
                        className="flex-1 bg-brandOffWhite border border-brandCharcoal/5 rounded-xl py-3 pl-12 pr-4 text-sm font-bold tracking-widest uppercase focus:ring-2 focus:ring-brand focus:border-brand shadow-inner outline-none placeholder:text-slate-300"
                      />
                      <button className="bg-brandCharcoal text-white font-black text-[10px] px-6 py-3 rounded-xl hover:bg-brand transition-all uppercase tracking-widest">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-10 mb-10">
                   <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-brand">Total Allocation</span>
                    <span className="text-4xl font-black text-brandCharcoal tracking-tighter italic">
                      <span className="text-lg font-medium mr-1 tracking-normal italic">$</span>
                      {total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest text-right italic">VAT & TAX included at checkout</p>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="group relative w-full py-6 bg-brand text-white font-black rounded-2xl transition-all duration-500 shadow-xl shadow-brand/30 hover:shadow-brand/40 overflow-hidden mb-8"
                >
                  <div className="absolute inset-0 bg-brandCharcoal translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <div className="relative flex items-center justify-center gap-4 tracking-[0.3em] text-xs">
                    INITIATE CHECKOUT
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </button>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-brandOffWhite rounded-2xl border border-brandCharcoal/5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">256-Bit SSL Secured Protocol</p>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-brandOffWhite rounded-2xl border border-brandCharcoal/5">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Elite Satisfaction Guarantee</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
