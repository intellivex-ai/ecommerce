import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Truck, 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight,
  Info
} from 'lucide-react';
import useCartStore from '../store/cartStore';
import { useAuth } from '../hooks/useAuth';
import { orderService } from '../services/orderService';
import { pageEnter } from '../animations/gsapAnimations';
import { twMerge } from 'tailwind-merge';

const InputField = ({ label, type = 'text', placeholder, half, required, value, onChange, name }) => (
  <div className={half ? 'col-span-1' : 'col-span-2'}>
    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">{label}</label>
    <div className="relative group">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-brandCharcoal/5 rounded-xl px-5 py-4 text-sm font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand shadow-sm group-hover:shadow-md transition-all outline-none text-brandCharcoal placeholder:text-slate-300 placeholder:font-normal"
      />
    </div>
  </div>
);

const Checkout = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const { user, isAuthenticated } = useAuth();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 150 ? 0 : 12;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shipping + tax;

  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState('card');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    pageEnter(ref.current);
  }, []);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please log in or create an account to finalize your order.");
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      alert("Your bag is currently light. Add some gear first!");
      navigate('/shop');
      return;
    }

    setSubmitting(true);
    try {
      await orderService.createOrder({
        userId: user.id,
        items,
        totalPrice: Number(grandTotal.toFixed(2))
      });
      clearCart();
      navigate('/account');
    } catch (err) {
      console.error(err);
      alert('Transmission Error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={ref} className="min-h-screen bg-brandOffWhite relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <main className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brandCharcoal/5 pb-10">
          <div>
             <Link to="/cart" className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-brand transition-all mb-6">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              BACK TO BAG
            </Link>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter text-brandCharcoal">
              Secure <span className="text-brand">Protocol.</span>
            </h1>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-3">
            {[
              { id: 1, label: 'SHIPPING' },
              { id: 2, label: 'PAYMENT' },
              { id: 3, label: 'ALIENATE' } // Review/Confirm
            ].map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className={twMerge(
                  "w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black transition-all duration-500",
                  step > s.id ? "bg-brand text-white rotate-[360deg] shadow-lg shadow-brand/20" : 
                  step === s.id ? "bg-brandCharcoal text-white shadow-xl" : 
                  "bg-white border border-brandCharcoal/5 text-slate-300"
                )}>
                  {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : s.id}
                </div>
                <span className={twMerge(
                  "text-[9px] font-black tracking-[0.2em] hidden sm:block",
                  step === s.id ? "text-brandCharcoal" : "text-slate-300"
                )}>{s.label}</span>
                {i < 2 && <div className="hidden sm:block w-8 h-px bg-brandCharcoal/5" />}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 items-start">
            <div className="lg:col-span-7 space-y-10">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="bg-white rounded-[40px] shadow-soft border border-brandCharcoal/5 p-8 md:p-12 animate-in fade-in slide-in-from-bottom duration-500">
                  <header className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-black text-brandCharcoal tracking-tighter flex items-center gap-3">
                      <Truck className="w-6 h-6 text-brand" />
                      1. Logistics.
                    </h2>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black uppercase tracking-widest mt-0.5">Encrypted</span>
                    </div>
                  </header>
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                    <InputField label="First Identity" placeholder="Aris" half required />
                    <InputField label="Last Identity" placeholder="Vandermeer" half required />
                    <InputField label="Signal Path (Email)" type="email" placeholder="aris@velocity.sys" required />
                    <InputField label="Vocal Code (Phone)" type="tel" placeholder="+1 (800) VELO-SYS" />
                    <InputField label="Drop Coordinates (Address)" placeholder="Sector 7G, Industrial Way" required />
                    <InputField label="Unit / Deck" placeholder="Deck 4, Level B" half />
                    <InputField label="City Base" placeholder="Neo Tokyo" half required />
                    <div className="col-span-2 flex gap-4">
                       <InputField label="State / Sector" placeholder="JP-TK" half required />
                       <InputField label="ZIP / Pulse" placeholder="100-0010" half required />
                    </div>
                  </div>

                  <div className="mt-12">
                    <button 
                      type="button" 
                      onClick={() => setStep(2)}
                      className="w-full py-5 bg-brandCharcoal text-white font-black rounded-2xl transition-all duration-300 hover:bg-brand flex items-center justify-center gap-3 tracking-[0.3em] text-xs shadow-xl"
                    >
                      PROCEED TO PAYMENT
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="bg-white rounded-[40px] shadow-soft border border-brandCharcoal/5 p-8 md:p-12 animate-in fade-in slide-in-from-right duration-500">
                  <header className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-black text-brandCharcoal tracking-tighter flex items-center gap-3">
                      <Lock className="w-6 h-6 text-brand" />
                      2. Transaction.
                    </h2>
                    <button onClick={() => setStep(1)} className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-brand transition-colors">Adjust Logistics</button>
                  </header>

                  <div className="flex gap-4 mb-10">
                    {[
                      { id: 'card', name: 'CREDIT CARD', icon: CreditCard },
                      { id: 'apple', name: 'APPLE PAY', icon: Smartphone }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPayMethod(m.id)}
                        className={twMerge(
                          "flex-1 p-6 rounded-3xl border-2 transition-all duration-500 flex flex-col items-center gap-4",
                          payMethod === m.id ? "bg-brandCharcoal border-brandCharcoal text-white shadow-2xl scale-105" : "bg-white border-brandCharcoal/5 text-slate-400 hover:border-brand/40"
                        )}
                      >
                        <m.icon className={twMerge("w-8 h-8 transition-colors", payMethod === m.id ? "text-brand" : "text-slate-200")} strokeWidth={1.5} />
                        <span className="text-[10px] font-black tracking-[0.2em]">{m.name}</span>
                      </button>
                    ))}
                  </div>

                  {payMethod === 'card' ? (
                    <div className="grid grid-cols-2 gap-x-6 gap-y-8 animate-in fade-in duration-500">
                      <InputField label="Transmission Code (Card)" placeholder="0000 0000 0000 0000" required />
                      <InputField label="Ownership Name" placeholder="ARIS VANDERMEER" required />
                      <InputField label="Exp Date" placeholder="MM / YY" half required />
                      <InputField label="Security Burst (CVV)" placeholder="***" half required />
                    </div>
                  ) : (
                    <div className="text-center py-12 px-10 bg-brandOffWhite rounded-3xl border border-dashed border-brandCharcoal/5 animate-in zoom-in duration-300">
                      <Smartphone className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-sm font-bold text-brandCharcoal mb-2 italic">Apple Pay Selection Active</p>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed italic">The secure biometric validation terminal will activate after you initiate final checkout.</p>
                    </div>
                  )}

                  <div className="mt-12 flex flex-col gap-4">
                     <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full py-6 bg-brand text-white font-black rounded-2xl transition-all duration-500 shadow-xl shadow-brand/30 hover:shadow-brand/40 hover:-translate-y-1 flex items-center justify-center gap-4 tracking-[0.3em] text-xs disabled:opacity-50"
                    >
                      {submitting ? 'PROCESSING...' : 'INITIALIZE FINAL PURCHASE'}
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-widest">By confirming, you agree to our terms of elite service</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar: Order Summary */}
            <aside className="mt-12 lg:mt-0 lg:col-span-5 sticky top-32">
              <div className="bg-white rounded-[40px] shadow-2xl border border-brandCharcoal/5 p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <h2 className="text-2xl font-black text-brandCharcoal tracking-tighter mb-10 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-brand" />
                  Allocation.
                </h2>

                <ul className="space-y-6 mb-10 pb-10 border-b border-brandCharcoal/5">
                  {items.map((item) => (
                    <li key={`${item.id}-${item.size}`} className="flex gap-4 group">
                      <div className="relative w-20 h-24 bg-brandOffWhite rounded-2xl overflow-hidden shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500">
                        <img src={item.images?.[0] || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute bottom-1 right-1 bg-brandCharcoal text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                          {item.qty}
                        </div>
                      </div>
                      <div className="flex-1 py-1">
                        <p className="text-[10px] font-black text-brand tracking-widest uppercase mb-1">{item.series || 'Elite'}</p>
                        <p className="text-sm font-black text-brandCharcoal tracking-tight truncate mb-1">{item.name}</p>
                        <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          <span>{item.color}</span>
                          <span className="w-px h-2.5 bg-slate-200" />
                          <span>Size {item.size}</span>
                        </div>
                        <p className="text-sm font-black text-brandCharcoal italic mt-2">${(item.price * item.qty).toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4 mb-10 text-sm">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inventory Subtotal</span>
                    <span className="text-lg font-black text-brandCharcoal italic">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Logistics (Shipping)</span>
                    <span className={twMerge("text-lg font-black italic", shipping === 0 ? "text-brand" : "text-brandCharcoal")}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Network Tax (8%)</span>
                    <span className="text-lg font-black text-brandCharcoal italic">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-10 border-t border-brandCharcoal/10">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-brand">Final Allocation</span>
                    <span className="text-5xl font-black text-brandCharcoal tracking-tighter italic scale-110 origin-right transition-transform">
                      <span className="text-xl font-medium mr-1 tracking-normal">$</span>
                      {grandTotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest text-right mt-4 italic">Funds secured via 256-bit AES protocol</p>
                </div>

                <div className="mt-12 p-6 bg-brandOffWhite rounded-[28px] border border-brandCharcoal/5 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Info className="w-4 h-4 text-brand" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-widest italic">
                    Transfers are encrypted and processed by our secure network. Check your signal (email) for immediate confirmation.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Checkout;
