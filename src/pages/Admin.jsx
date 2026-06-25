import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  adminService } from '../services/adminService';
import { useProducts } from '../hooks/useProducts';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Trash2, 
  Search, 
  Download,
  MoreVertical,
  Zap,
  Box,
  ChevronRight,
  X,
  Image as ImageIcon,
  BarChart3
} from 'lucide-react';
import { pageEnter, staggerItems } from '../animations/gsapAnimations';
import { twMerge } from 'tailwind-merge';

const STATUS_COLORS = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  processing: 'bg-blue-100 text-blue-700 border-blue-200',
  shipped: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

const AdminPanel = () => {
    const { user, loading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const { products, loading: productsLoading, refresh: refreshProducts } = useProducts();
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const mainRef = useRef(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '', image: '', category: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Stats
    const [stats, setStats] = useState({
        revenue: 0,
        totalOrders: 0,
        totalUsers: 8492 // Mocked for now
    });

    useEffect(() => {
        fetchOrders();
        if (mainRef.current) pageEnter(mainRef.current);
    }, []);

    const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
            const data = await adminService.fetchAllOrders();
            setOrders(data || []);

            const rev = (data || []).reduce((acc, order) => acc + Number(order.total_price || 0), 0);
            setStats(prev => ({ ...prev, revenue: rev, totalOrders: data?.length || 0 }));
        } catch (err) {
            console.error('Failed to load orders', err);
        } finally {
            setOrdersLoading(false);
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await adminService.updateOrderStatus(orderId, newStatus);
            fetchOrders();
        } catch (err) {
            alert('Failed to update status: ' + err.message);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await adminService.deleteProduct(id);
            if (refreshProducts) refreshProducts();
        } catch (err) {
            alert('Failed to delete: ' + err.message);
        }
    };

    const handleAddProductSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const productData = {
                title: newProduct.title,
                slug: newProduct.title.toLowerCase().replace(/ /g, '-'),
                description: newProduct.description,
                price: Number(newProduct.price),
                stock_quantity: 100,
                images: newProduct.image ? [newProduct.image] : [],
                is_active: true,
            };
            await adminService.addProduct(productData);
            setIsModalOpen(false);
            setNewProduct({ title: '', price: '', description: '', image: '', category: '' });
            if (refreshProducts) refreshProducts();
        } catch (err) {
            alert('Failed to add product: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const NAV_ITEMS = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'orders', label: 'Mission Log', icon: ShoppingBag },
      { id: 'products', label: 'Gear Lab', icon: Box },
      { id: 'inventory', label: 'Inventory', icon: Package },
      { id: 'users', label: 'Pilots', icon: Users },
    ];

    // Sentinel Security Update: Restrict access to admin route
    if (authLoading) return null;
    if (!user || user?.email !== 'admin@velocity.io') return <Navigate to="/login" replace />;

    return (
        <div className="flex bg-brandOffWhite min-h-screen relative overflow-hidden">
            {/* Decorative BG elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            {/* Sidebar */}
            <aside className="w-80 bg-white border-r border-brandCharcoal/5 flex flex-col pt-12 relative z-20 shadow-xl">
                <div className="px-10 mb-12 flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-brandCharcoal text-brand flex items-center justify-center transition-transform group-hover:rotate-12 duration-500 shadow-lg">
                        <Zap className="w-7 h-7" fill="currentColor" />
                    </div>
                    <span className="font-display font-black text-2xl tracking-tighter text-brandCharcoal">VELOCITY<span className="text-brand">.OS</span></span>
                </div>

                <nav className="flex-1 px-6 space-y-3">
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={twMerge(
                                "w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300",
                                activeTab === item.id 
                                ? 'bg-brandCharcoal text-white shadow-xl translate-x-1' 
                                : 'text-slate-400 hover:text-brandCharcoal hover:bg-brandOffWhite'
                            )}
                        >
                            <item.icon className={twMerge("w-5 h-5", activeTab === item.id ? "text-brand" : "text-slate-300")} strokeWidth={1.5} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-8 border-t border-brandCharcoal/5 flex items-center gap-4 bg-brandOffWhite/50">
                    <div className="relative">
                      <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-12 h-12 rounded-2xl grayscale hover:grayscale-0 transition-all cursor-pointer border border-brand/20 shadow-sm" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                        <p className="font-black text-xs text-brandCharcoal tracking-tight">Alex Rivera</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Chief Engineer</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main ref={mainRef} className="flex-1 p-12 max-h-screen overflow-y-auto relative z-10">
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-brandCharcoal/5 pb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-white border border-brandCharcoal/5 px-4 py-2 rounded-full mb-6">
                           <span className="text-[10px] font-black tracking-[0.3em] uppercase text-brand">System Integrity: OK</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter text-brandCharcoal italic lowercase">
                           Control <span className="text-brand">Suite.</span>
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-brandCharcoal/5 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-brandCharcoal transition-all shadow-sm">
                           <Download className="w-4 h-4" />
                           Export Log
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-brandCharcoal text-white font-black text-[10px] uppercase tracking-widest hover:bg-brand transition-all shadow-xl shadow-brandCharcoal/20"
                        >
                            <Plus className="w-5 h-5 text-brand" strokeWidth={3} />
                            Initiate Gear
                        </button>
                    </div>
                </header>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-10 rounded-[40px] border border-brandCharcoal/5 shadow-soft group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-brand/10 text-brand flex items-center justify-center">
                                <DollarSign className="w-7 h-7" strokeWidth={1.5} />
                            </div>
                            <span className="bg-emerald-50 text-emerald-600 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">+12.5%</span>
                        </div>
                        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2 italic">Total Revenue Stream</p>
                        <p className="text-4xl font-display font-black text-brandCharcoal tracking-tighter italic">
                           ${stats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-[40px] border border-brandCharcoal/5 shadow-soft group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                                <ShoppingBag className="w-7 h-7" strokeWidth={1.5} />
                            </div>
                            <span className="bg-emerald-50 text-emerald-600 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">+8.2%</span>
                        </div>
                        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2 italic">Active Acquisitions</p>
                        <p className="text-4xl font-display font-black text-brandCharcoal tracking-tighter italic">
                           {stats.totalOrders.toLocaleString()}
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-[40px] border border-brandCharcoal/5 shadow-soft group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
                                <Users className="w-7 h-7" strokeWidth={1.5} />
                            </div>
                            <span className="bg-emerald-50 text-emerald-600 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">+3.1%</span>
                        </div>
                        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2 italic">Authorized Pilots</p>
                        <p className="text-4xl font-display font-black text-brandCharcoal tracking-tighter italic">
                           {stats.totalUsers.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'dashboard' || activeTab === 'orders' ? (
                    <div className="bg-white rounded-[40px] border border-brandCharcoal/5 shadow-soft overflow-hidden">
                        <div className="px-10 py-8 border-b border-brandCharcoal/5 flex justify-between items-center bg-brandOffWhite/30">
                            <div>
                               <h2 className="text-xl font-black text-brandCharcoal tracking-tighter italic">Mission Log (Recent Orders)</h2>
                               <p className="text-[10px] font-medium text-slate-400 mt-1 italic">Real-time telemetry from acquisition channels.</p>
                            </div>
                            <div className="flex items-center gap-4">
                               <div className="relative">
                                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                  <input type="text" placeholder="Trace ID..." className="pl-11 pr-6 py-2.5 bg-white border border-brandCharcoal/5 rounded-xl text-[10px] uppercase font-black tracking-widest outline-none focus:ring-1 focus:ring-brand" />
                               </div>
                               <button className="text-brand font-black text-[10px] uppercase tracking-[0.3em] hover:underline">View All</button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-brandOffWhite/50 text-slate-300 text-[10px] font-black uppercase tracking-widest border-b border-brandCharcoal/5">
                                        <th className="px-10 py-6 italic">Protocol ID</th>
                                        <th className="px-10 py-6 italic">Authorized Pilot</th>
                                        <th className="px-10 py-6 italic">Timestamp</th>
                                        <th className="px-10 py-6 italic">Allocation</th>
                                        <th className="px-10 py-6 italic">Phase</th>
                                        <th className="px-10 py-6 text-right italic">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brandCharcoal/5 text-sm">
                                    {ordersLoading ? (
                                        <tr><td colSpan="6" className="text-center py-20">
                                            <div className="w-10 h-10 border-4 border-brand/20 border-t-brand rounded-full animate-spin mx-auto"></div>
                                        </td></tr>
                                    ) : orders.slice(0, 8).map(order => (
                                        <tr key={order.id} className="group hover:bg-brandOffWhite/30 transition-colors">
                                            <td className="px-10 py-6 font-black text-xs text-brandCharcoal tracking-widest italic group-hover:text-brand transition-colors cursor-pointer">#{order.id.slice(0, 8)}</td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-3">
                                                   <div className="w-10 h-10 rounded-xl bg-brandCharcoal text-brand flex items-center justify-center text-xs font-black shadow-lg">
                                                       {order.profiles?.full_name?.charAt(0) || 'U'}
                                                   </div>
                                                   <div>
                                                       <span className="font-black text-xs text-brandCharcoal italic">{order.profiles?.full_name || 'Guest User'}</span>
                                                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Authorized</p>
                                                   </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-[11px] font-semibold text-slate-400">
                                                {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="px-10 py-6 font-black text-brandCharcoal italic">
                                                ${Number(order.total_price).toFixed(2)}
                                            </td>
                                            <td className="px-10 py-6">
                                                <span className={twMerge(
                                                    "px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase border border-white/50",
                                                    STATUS_COLORS[order.order_status] || 'bg-slate-50 text-slate-500 border-slate-100'
                                                )}>
                                                    {order.order_status || 'System Pending'}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                   <select
                                                       className="bg-white border border-brandCharcoal/5 rounded-xl text-[10px] font-black uppercase tracking-widest py-2 px-3 outline-none focus:ring-1 focus:ring-brand shadow-sm"
                                                       value={order.order_status}
                                                       onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                   >
                                                       <option value="pending">Pending</option>
                                                       <option value="processing">Processing</option>
                                                       <option value="shipped">Shipped</option>
                                                       <option value="delivered">Delivered</option>
                                                       <option value="cancelled">Cancelled</option>
                                                   </select>
                                                   <button className="p-2.5 bg-brandOffWhite rounded-xl hover:bg-brand hover:text-white transition-all">
                                                       <MoreVertical className="w-4 h-4" />
                                                   </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {!ordersLoading && orders.length === 0 && (
                                        <tr><td colSpan="6" className="text-center py-20 text-slate-400 italic font-medium">No telemetry detected.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : activeTab === 'products' ? (
                    <div className="bg-white rounded-[40px] border border-brandCharcoal/5 shadow-soft p-12">
                        <div className="flex items-center justify-between mb-12">
                           <div>
                               <h2 className="text-2xl font-black text-brandCharcoal tracking-tighter italic">Gear Lab (Inventory)</h2>
                               <p className="text-[10px] font-medium text-slate-400 mt-1 italic">Active product SKU management and status.</p>
                           </div>
                           <div className="flex items-center gap-4">
                              <div className="relative">
                                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                 <input type="text" placeholder="Search SKU..." className="pl-11 pr-8 py-3 bg-brandOffWhite border border-brandCharcoal/5 rounded-2xl text-[10px] uppercase font-black tracking-widest outline-none focus:ring-1 focus:ring-brand" />
                              </div>
                           </div>
                        </div>

                        {productsLoading ? (
                             <div className="flex justify-center py-20">
                               <div className="w-10 h-10 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
                             </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {products.map(p => (
                                    <div key={p.id} className="group bg-brandOffWhite/50 rounded-[32px] border border-brandCharcoal/5 p-6 flex flex-col hover:bg-white hover:shadow-xl hover:border-brand/20 transition-all duration-500 relative overflow-hidden">
                                        <div className="w-full h-40 bg-white rounded-2xl mb-6 relative overflow-hidden shadow-inner border border-brandCharcoal/5">
                                            <img
                                                src={p.images?.[0] || 'https://via.placeholder.com/150'}
                                                alt={p.title || 'Product'}
                                                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-1 italic">{p.category || 'Elite Class'}</p>
                                        <h3 className="font-black text-sm text-brandCharcoal mb-2 line-clamp-1 italic tracking-tight">{p.title || 'Untitled Gear'}</h3>
                                        <p className="text-xl font-black text-brandCharcoal mb-6 italic">${Number(p.price || 0).toFixed(2)}</p>
                                        
                                        <div className="flex items-center gap-3 mt-auto">
                                           <button className="flex-1 py-3 bg-white border border-brandCharcoal/5 text-brandCharcoal rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-brandCharcoal hover:text-white transition-all shadow-sm">
                                               Edit SKU
                                           </button>
                                           <button 
                                              onClick={() => handleDeleteProduct(p.id)} 
                                              className="p-3 border border-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                           >
                                               <Trash2 className="w-4 h-4" />
                                           </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white p-24 rounded-[40px] text-center border border-dashed border-brandCharcoal/10">
                        <BarChart3 className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                        <h3 className="text-xl font-black text-brandCharcoal tracking-tighter mb-2 italic">Terminal Expansion.</h3>
                        <p className="text-sm text-slate-400 italic">Content for {activeTab?.toUpperCase()} module is currently in synchronization.</p>
                    </div>
                )}

            </main>

            {/* Add Product Modal (Velocity Edition) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-brandCharcoal/20 backdrop-blur-xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[48px] w-full max-w-2xl shadow-2xl p-12 relative overflow-hidden animate-in slide-in-from-bottom-10 duration-500 border border-brand/10">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-brand/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <div>
                               <h2 className="text-3xl font-black text-brandCharcoal tracking-tighter italic">Initiate Gear Protocol.</h2>
                               <p className="text-xs text-slate-400 italic mt-1 font-medium">Establish a new product signal in the Velocity repository.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-brandOffWhite transition-all text-slate-400 hover:text-brand">
                               <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleAddProductSubmit} className="space-y-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Gear Designation</label>
                                    <input
                                        type="text"
                                        required
                                        value={newProduct.title}
                                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                                        className="w-full bg-brandOffWhite border border-brandCharcoal/5 rounded-[24px] px-6 py-4 text-sm font-bold tracking-tight outline-none focus:ring-2 focus:ring-brand transition-all shadow-inner"
                                        placeholder="e.g. Apex Nitro V2"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Price Allocation ($)</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="0.01"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                        className="w-full bg-brandOffWhite border border-brandCharcoal/5 rounded-[24px] px-6 py-4 text-sm font-bold tracking-tight outline-none focus:ring-2 focus:ring-brand transition-all shadow-inner"
                                        placeholder="00.00"
                                    />
                                </div>

                                <div className="space-y-3 col-span-1 md:col-span-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Visual Protocol URL</label>
                                    <div className="relative">
                                       <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                       <input
                                          type="url"
                                          value={newProduct.image}
                                          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                          className="w-full pl-14 pr-6 py-4 bg-brandOffWhite border border-brandCharcoal/5 rounded-[24px] text-sm font-bold tracking-tight outline-none focus:ring-2 focus:ring-brand transition-all shadow-inner"
                                          placeholder="https://cdn.velocity.io/assets/gear-alpha.png"
                                       />
                                    </div>
                                </div>

                                <div className="space-y-3 col-span-1 md:col-span-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Tech Specs / Description</label>
                                    <textarea
                                        rows="4"
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        className="w-full bg-brandOffWhite border border-brandCharcoal/5 rounded-[32px] px-8 py-6 text-sm font-medium tracking-tight outline-none focus:ring-2 focus:ring-brand transition-all shadow-inner resize-none"
                                        placeholder="Describe the aerodynamic capabilities and material composition..."
                                    />
                                </div>
                            </div>

                            <div className="pt-8 flex gap-4 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-10 py-5 rounded-[24px] border border-brandCharcoal/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brandCharcoal hover:bg-brandOffWhite transition-all"
                                >
                                    ABORT
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={twMerge(
                                        "px-12 py-5 rounded-[24px] bg-brand text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-brand/20",
                                        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:bg-brandCharcoal active:scale-95'
                                    )}
                                >
                                    {isSubmitting ? 'ESTABLISHING...' : 'SAVE GEAR'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
