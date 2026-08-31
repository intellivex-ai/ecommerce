import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { 
  Package, 
  Heart, 
  Settings, 
  LayoutDashboard, 
  LogOut, 
  ShieldCheck, 
  Zap, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  CreditCard,
  MapPin,
  Bell,
  Smartphone
} from 'lucide-react';
import useCartStore from '../store/cartStore';
import { useAuth } from '../hooks/useAuth';
import { orderService } from '../services/orderService';
import { pageEnter, scrollReveal } from '../animations/gsapAnimations';
import { twMerge } from 'tailwind-merge';

const STATUS_COLORS = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  processing: 'bg-blue-100 text-blue-700 border-blue-200',
  shipped: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Orders', icon: Package },
  { label: 'Wishlist', icon: Heart },
  { label: 'Security', icon: ShieldCheck },
];

const Account = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const wishlist = useCartStore((s) => s.wishlist);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const { user, profile, isAuthenticated, loading: authLoading, logout } = useAuth();

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (ref.current) pageEnter(ref.current);
  }, []);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const data = await orderService.fetchUserOrders(user.id);
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      const initData = async () => { await fetchOrders(); };
      initData();
    }
  }, [isAuthenticated, user]);

  if (authLoading) return (
    <div className="min-h-screen bg-brandOffWhite flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
    </div>
  );

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const userInitial = profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U';

  return (
    <div ref={ref} className="min-h-screen bg-brandOffWhite relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <main className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
          
          {/* Left Sidebar: Control Panel */}
          <aside className="lg:col-span-3 mb-10 lg:mb-0 space-y-8">
            {/* User Profile Card */}
            <div className="bg-white rounded-[32px] shadow-soft border border-brandCharcoal/5 p-8 text-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
               
               <div className="relative inline-block mb-6">
                 <div className="w-24 h-24 bg-brandCharcoal rounded-[24px] flex items-center justify-center mx-auto shadow-xl transition-transform group-hover:rotate-6 duration-700">
                    <span className="text-4xl font-display font-black text-brand uppercase">{userInitial}</span>
                 </div>
                 <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-brand/10">
                    <Zap className="w-4 h-4 text-brand" fill="currentColor" />
                 </div>
               </div>
               
               <h2 className="text-xl font-display font-black text-brandCharcoal tracking-tight mb-1">{profile?.full_name || 'Pilot Unknown'}</h2>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">{user?.email}</p>
               
               {/* 🛡️ Sentinel Security Note: Use immutable email for admin check, avoiding user-controlled full_name privilege escalation */}
               {user?.email === 'admin@velocity.io' && (
                <Link to="/admin" className="inline-flex items-center gap-2 bg-brandCharcoal text-white text-[9px] font-black px-5 py-2.5 rounded-xl uppercase tracking-widest hover:bg-brand transition-all shadow-lg shadow-brandCharcoal/20">
                   System Access
                </Link>
               )}
            </div>

            {/* Navigation Menu */}
            <nav className="bg-white rounded-[32px] shadow-sm border border-brandCharcoal/5 p-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={twMerge(
                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 group",
                    activeTab === item.label 
                      ? "bg-brandCharcoal text-white shadow-xl translate-x-1" 
                      : "text-slate-400 hover:text-brandCharcoal hover:bg-brandOffWhite"
                  )}
                >
                  <item.icon className={twMerge("w-5 h-5 transition-colors", activeTab === item.label ? "text-brand" : "text-slate-300 group-hover:text-brand")} strokeWidth={1.5} />
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-brandCharcoal/5 mt-4">
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-500 hover:bg-red-50 transition-all transition-colors group"
                >
                  <LogOut className="w-5 h-5 text-red-400 group-hover:rotate-12 transition-transform" />
                  EJECT PROTOCOL
                </button>
              </div>
            </nav>

            {/* Loyalty Widget */}
            <div className="bg-brandCharcoal p-8 rounded-[32px] shadow-xl relative overflow-hidden">
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />
               <p className="text-brand font-black text-[9px] tracking-[0.3em] uppercase mb-4">Loyalty Status</p>
               <h3 className="text-white text-2xl font-display font-extrabold tracking-tight mb-2 italic">Elite Tier.</h3>
               <div className="flex items-center gap-1 mb-6">
                 {[1,2,3,4,5].map(i => <TrendingUp key={i} className="w-3 h-3 text-brand" />)}
               </div>
               <p className="text-slate-400 text-[10px] font-medium leading-relaxed italic">You are in the top 5% of Velocity athletes. Keep moving.</p>
            </div>
          </aside>

          {/* Right Content: Terminal Views */}
          <div className="lg:col-span-9 space-y-10">
            {/* View Title */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brandCharcoal/5 pb-10">
              <div>
                 <div className="inline-flex items-center gap-2 bg-white border border-brandCharcoal/5 px-4 py-2 rounded-full mb-6">
                   <span className="text-[10px] font-black tracking-[0.3em] uppercase text-brand">Dashboard Terminal</span>
                 </div>
                 <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter text-brandCharcoal">
                    {activeTab} <span className="text-brand">Protocol.</span>
                 </h1>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-brandCharcoal/5 flex items-center justify-center text-slate-400 hover:text-brand transition-colors cursor-pointer shadow-sm">
                   <Bell className="w-5 h-5" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-brandCharcoal/5 flex items-center justify-center text-slate-400 hover:text-brand transition-colors cursor-pointer shadow-sm">
                   <Settings className="w-5 h-5" />
                </div>
              </div>
            </header>

            {/* Overview View */}
            {activeTab === 'Overview' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {[
                    { label: 'Fleet Acquisitions', value: orders.length, icon: Package, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                    { label: 'Archived Wishlist', value: wishlist.length, icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
                    { label: 'Kinetix Points', value: '1,240', icon: Zap, color: 'text-brand', bg: 'bg-brand/10' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-[32px] border border-brandCharcoal/5 p-8 shadow-sm group hover:-translate-y-1 transition-all duration-300">
                      <div className={twMerge("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", stat.bg)}>
                          <stat.icon className={twMerge("w-7 h-7", stat.color)} strokeWidth={1.5} />
                      </div>
                      <p className="text-3xl font-display font-extrabold text-brandCharcoal tracking-tighter mb-1 italic">{stat.value}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-[40px] border border-brandCharcoal/5 p-10 shadow-soft">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-brandCharcoal tracking-tighter">Mission Log (Recent Orders)</h3>
                    <button onClick={() => setActiveTab('Orders')} className="text-[10px] font-black text-brand uppercase tracking-widest hover:underline">Full History</button>
                  </div>
                  
                  <div className="space-y-4">
                    {ordersLoading ? (
                      <div className="flex justify-center py-12">
                        <div className="w-8 h-8 border-2 border-brand/20 border-t-brand rounded-full animate-spin"></div>
                      </div>
                    ) : orders.length === 0 ? (
                      <p className="text-sm text-slate-400 italic">No missions accomplished yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-[9px] font-black uppercase tracking-widest text-slate-300 border-b border-brandCharcoal/5">
                              <th className="text-left pb-4">Codename</th>
                              <th className="text-left pb-4">Timestamp</th>
                              <th className="text-left pb-4">Status</th>
                              <th className="text-right pb-4">Allocation</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-brandCharcoal/5">
                            {orders.slice(0, 3).map((order) => (
                              <tr key={order.id} className="group transition-colors">
                                <td className="py-5 font-black text-xs text-brandCharcoal tracking-widest italic group-hover:text-brand transition-colors cursor-pointer">#{order.id.slice(0, 8)}</td>
                                <td className="py-5 text-[11px] font-medium text-slate-400">{new Date(order.created_at).toLocaleDateString()}</td>
                                <td className="py-5">
                                  <span className={twMerge(
                                    "text-[9px] font-black px-3 py-1 rounded-full border tracking-widest uppercase",
                                    STATUS_COLORS[order.order_status] || 'bg-slate-50 text-slate-500 border-slate-100'
                                  )}>
                                    {order.order_status || 'System Pending'}
                                  </span>
                                </td>
                                <td className="py-5 text-right font-black text-brandCharcoal italic">${order.total_price?.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Full History View */}
            {activeTab === 'Orders' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
                {ordersLoading ? (
                    <div className="flex justify-center py-20">
                      <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[40px] border border-brandCharcoal/5 border-dashed">
                      <Package className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                      <p className="text-xl font-black text-brandCharcoal tracking-tighter mb-2 italic">Clean Slate.</p>
                      <p className="text-sm text-slate-400 italic mb-8">You haven't initiated any acquisition protocols.</p>
                      <Link to="/shop" className="bg-brandCharcoal text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand transition-all shadow-xl">
                        Explore Catalog
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-white border border-brandCharcoal/5 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:border-brand/20 transition-all duration-500 group">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-brandCharcoal/5 pb-8">
                            <div className="flex items-center gap-4">
                               <div className="w-14 h-14 bg-brandOffWhite rounded-2xl flex items-center justify-center text-brand">
                                  <Package className="w-6 h-6" />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-brand uppercase tracking-[0.2em] mb-1 italic">Order Protocol Active</p>
                                  <h4 className="text-xl font-black text-brandCharcoal tracking-widest italic group-hover:text-brand transition-colors">#{order.id.slice(0, 12)}</h4>
                               </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={twMerge(
                                "text-[10px] font-black px-4 py-1.5 rounded-full border tracking-[0.2em] uppercase",
                                STATUS_COLORS[order.order_status] || 'bg-slate-50 text-slate-500 border-slate-100'
                              )}>
                                {order.order_status || 'System Pending'}
                              </span>
                              <div className="w-px h-6 bg-brandCharcoal/5 hidden md:block" />
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex -space-x-3">
                               {/* Mockup item circles if items aren't directly available in standard order brief */}
                               {[1, 2].map(i => (
                                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-brandOffWhite shadow-sm" />
                               ))}
                               <div className="w-10 h-10 rounded-full border-2 border-white bg-brand/10 flex items-center justify-center text-[10px] font-black text-brand">
                                 +{order.order_items?.length || 'X'}
                               </div>
                            </div>
                            <div className="flex items-baseline gap-4">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Total Allocation</span>
                              <p className="text-2xl font-black text-brandCharcoal tracking-tighter italic">${order.total_price?.toFixed(2)}</p>
                              <button className="p-3 bg-brandOffWhite rounded-xl hover:bg-brand hover:text-white transition-all">
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            )}

            {/* Wishlist View */}
            {activeTab === 'Wishlist' && (
              <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                {wishlist.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-[40px] border border-brandCharcoal/5 border-dashed">
                    <Heart className="w-16 h-16 text-rose-100 mx-auto mb-6" />
                    <p className="text-xl font-black text-brandCharcoal tracking-tighter mb-2 italic">Archive Empty.</p>
                    <p className="text-sm text-slate-400 italic mb-8">You haven't archived any gear for future acquisition.</p>
                    <Link to="/shop" className="bg-brandCharcoal text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand transition-all shadow-xl">
                      Explore Design Lab
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {wishlist.map((p) => (
                      <div key={p.id} className="group bg-white rounded-[32px] border border-brandCharcoal/5 p-6 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                        <div className="aspect-[4/5] bg-brandOffWhite rounded-2xl overflow-hidden mb-6 relative">
                          <img src={p.images?.[0] || 'https://via.placeholder.com/150'} alt={p.name || p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <button
                            onClick={() => toggleWishlist(p)}
                            className="absolute top-4 right-4 z-20 w-10 h-10 glass rounded-full shadow-lg text-rose-500 flex items-center justify-center border-white/40 hover:scale-110 transition-transform"
                          >
                            <Heart className="w-5 h-5 fill-current" />
                          </button>
                        </div>
                        <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-1 italic">{p.series || 'Elite Series'}</p>
                        <Link to={`/product/${p.id}`} className="text-lg font-black text-brandCharcoal hover:text-brand transition-colors tracking-tight line-clamp-1 italic">
                          {p.title || p.name}
                        </Link>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-xl font-black text-brandCharcoal tracking-tighter italic">
                             <span className="text-sm font-medium italic mr-0.5">$</span>
                             {Number(p.price).toFixed(2)}
                          </p>
                          <Link to={`/product/${p.id}`} className="p-3 bg-brandOffWhite rounded-xl hover:bg-brandCharcoal hover:text-white transition-all group-hover:bg-brand group-hover:text-white">
                             <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Security Settings View */}
            {activeTab === 'Security' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-top duration-500">
                <div className="bg-white rounded-[40px] border border-brandCharcoal/5 p-10 md:p-14 shadow-soft">
                  <header className="flex items-center justify-between mb-12">
                    <div>
                      <h3 className="text-2xl font-black text-brandCharcoal tracking-tighter mb-2">Account Protocols.</h3>
                      <p className="text-sm text-slate-400 italic font-medium leading-relaxed">Modify your identity signals and authorization keys.</p>
                    </div>
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                       <ShieldCheck className="w-8 h-8" />
                    </div>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                    <div className="space-y-4 col-span-2">
                       <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Universal Identity Name</label>
                       <input
                          type="text"
                          defaultValue={profile?.full_name || ''}
                          className="w-full bg-brandOffWhite border border-brandCharcoal/5 rounded-2xl px-6 py-4 text-sm font-bold tracking-tight focus:ring-2 focus:ring-brand outline-none transition-all shadow-inner"
                        />
                    </div>
                    <div className="space-y-4 col-span-2 opacity-60">
                       <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Identity Signal (Immutable)</label>
                       <input
                          type="text"
                          defaultValue={user?.email || ''}
                          disabled
                          className="w-full bg-brandOffWhite border border-brandCharcoal/10 rounded-2xl px-6 py-4 text-sm font-bold tracking-tight cursor-not-allowed"
                        />
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-10 border-t border-brandCharcoal/5 flex flex-col md:flex-row gap-4">
                    <button className="bg-brandCharcoal text-white font-black px-12 py-5 rounded-2xl text-[10px] tracking-widest uppercase hover:bg-brand transition-all shadow-xl shadow-brandCharcoal/20">
                      UPDATE PROTOCOLS
                    </button>
                    <button className="bg-white border border-brandCharcoal/5 text-slate-400 font-black px-12 py-5 rounded-2xl text-[10px] tracking-widest uppercase hover:text-brand transition-all">
                      CHANGE ACCESS KEY
                    </button>
                  </div>
                </div>

                {/* Additional Security Modules */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-white p-10 rounded-[40px] border border-brandCharcoal/5 shadow-sm">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-black text-brandCharcoal tracking-tighter mb-2">Two-Factor Burst.</h4>
                      <p className="text-xs text-slate-400 italic font-medium leading-relaxed mb-8">Add an extra layer of security to your terminal login.</p>
                      <button className="text-[9px] font-black text-brand uppercase tracking-widest hover:underline">ENABLE 2FA</button>
                   </div>
                   <div className="bg-white p-10 rounded-[40px] border border-brandCharcoal/5 shadow-sm">
                      <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-6">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-black text-brandCharcoal tracking-tighter mb-2">Stored Allocations.</h4>
                      <p className="text-xs text-slate-400 italic font-medium leading-relaxed mb-8">Manage your saved transaction methods and shipping bases.</p>
                      <button className="text-[9px] font-black text-brand uppercase tracking-widest hover:underline">MANAGE BILLING</button>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
