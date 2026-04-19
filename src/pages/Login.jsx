import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  Chrome, 
  Apple, 
  Eye, 
  EyeOff,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { pageEnter } from '../animations/gsapAnimations';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        pageEnter(ref.current);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/account');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            await loginWithGoogle();
            navigate('/account');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div ref={ref} className="min-h-screen bg-brandOffWhite flex flex-col relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

            {/* Header */}
            <header className="px-8 py-6 flex items-center justify-between relative z-10">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-brandCharcoal rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-500 shadow-lg">
                        <Zap className="w-6 h-6 text-brand" fill="currentColor" />
                    </div>
                    <span className="text-xl font-display font-black tracking-tighter text-brandCharcoal">VELOCITY</span>
                </Link>
                <div className="hidden sm:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    New to Velocity? 
                    <Link to="/register" className="bg-white border border-brandCharcoal/5 px-6 py-2.5 rounded-full text-brandCharcoal hover:bg-brandCharcoal hover:text-white transition-all shadow-sm">
                        Create Account
                    </Link>
                </div>
            </header>

            {/* Main Form Area */}
            <main className="flex-grow flex items-center justify-center p-6 relative z-10">
                <div className="w-full max-w-[480px] bg-white rounded-[40px] shadow-2xl border border-brandCharcoal/5 p-10 md:p-14 mb-16 relative overflow-hidden">
                    {/* Visual Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-display font-extrabold text-brandCharcoal tracking-tighter mb-4">
                           Welcome <span className="text-brand">Back.</span>
                        </h1>
                        <p className="text-sm text-slate-500 font-medium italic">Enter your credentials to access your performance dashboard.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 text-[11px] font-black uppercase tracking-widest border border-red-100 rounded-2xl animate-in fade-in zoom-in duration-300">
                                ! Transmission Error: {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Identity Signal (Email)</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-brand transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@velocity.sys"
                                    className="w-full px-12 py-4 bg-brandOffWhite border border-brandCharcoal/5 rounded-2xl text-sm font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all outline-none text-brandCharcoal placeholder:text-slate-300 placeholder:font-normal"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1 mr-1">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Access Key (Password)</label>
                                <button type="button" className="text-[10px] font-black uppercase tracking-widest text-brand hover:underline">Reset Key?</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-brand transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-12 py-4 bg-brandOffWhite border border-brandCharcoal/5 rounded-2xl text-sm font-bold tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all outline-none text-brandCharcoal placeholder:text-slate-300 placeholder:font-normal"
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-brand transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full py-5 bg-brandCharcoal text-white font-black rounded-2xl transition-all duration-500 shadow-xl shadow-brandCharcoal/20 hover:shadow-brandCharcoal/40 hover:-translate-y-1 overflow-hidden"
                        >
                             <div className="absolute inset-x-0 bottom-0 h-1 bg-brand translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                             <div className="relative flex items-center justify-center gap-3 tracking-[0.3em] text-xs">
                                {loading ? 'SYNCHRONIZING...' : 'AUTHORIZE LOGIN'}
                                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />}
                             </div>
                        </button>
                    </form>

                    <div className="relative mt-12 mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-brandCharcoal/5"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] font-black tracking-[0.4em] uppercase">
                            <span className="px-4 bg-white text-slate-300">Third-Party Protocol</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={handleGoogle}
                            className="flex items-center justify-center gap-3 px-6 py-4 bg-white border border-brandCharcoal/5 rounded-2xl hover:bg-brandOffWhite transition-all font-black text-[10px] tracking-widest uppercase text-brandCharcoal"
                        >
                            <Chrome className="w-4 h-4 text-brand" />
                            Google
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center gap-3 px-6 py-4 bg-white border border-brandCharcoal/5 rounded-2xl hover:bg-brandOffWhite transition-all font-black text-[10px] tracking-widest uppercase text-brandCharcoal"
                        >
                            <Apple className="w-4 h-4" />
                            Apple
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 border-t border-brandCharcoal/5 text-center relative z-10">
                <div className="flex items-center justify-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
                    <Link to="#" className="hover:text-brand transition-colors">Privacy Shield</Link>
                    <Link to="#" className="hover:text-brand transition-colors">Terms of Protocol</Link>
                    <Link to="#" className="hover:text-brand transition-colors">Support Terminal</Link>
                </div>
                <div className="flex items-center justify-center gap-2 text-[9px] text-slate-300 font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3 text-brand" />
                    Secure Transaction Layer Active
                </div>
            </footer>
        </div>
    );
};

export default Login;
