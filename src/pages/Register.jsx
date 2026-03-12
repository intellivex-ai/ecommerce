import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Chrome, 
  Apple,
  Eye,
  EyeOff,
  Globe,
  Leaf,
  Users
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { pageEnter } from '../animations/gsapAnimations';
import { twMerge } from 'tailwind-merge';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { signUp, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        pageEnter(ref.current);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreed) {
            setError("Protocol Error: You must authorize the Terms & Privacy terms.");
            return;
        }
        setError('');
        setLoading(true);
        try {
            await signUp(email, password, fullName);
            alert('Transmission Success: Identity Created. Please sign in.');
            navigate('/login');
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
            {/* Decorative Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            {/* Header */}
            <header className="px-8 py-6 flex items-center justify-between relative z-10">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-brandCharcoal rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-500 shadow-lg">
                        <Zap className="w-6 h-6 text-brand" fill="currentColor" />
                    </div>
                    <span className="text-xl font-display font-black tracking-tighter text-brandCharcoal">VELOCITY</span>
                </Link>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Existing Pilot? <Link to="/login" className="text-brand hover:underline font-black ml-2">Login Terminal</Link>
                </div>
            </header>

            {/* Main Form Area */}
            <main className="flex-grow flex items-center justify-center p-6 relative z-10">
                <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-16">

                    {/* Left Hero Section: The 'Why Velocity' */}
                    <div className="flex-1 max-w-lg w-full">
                        <div className="inline-flex items-center gap-2 bg-brand/10 px-4 py-2 rounded-full mb-8">
                            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-brand">V-Access Terminal</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-brandCharcoal leading-none tracking-tighter mb-8 italic">
                            Join the <br />
                            <span className="text-gradient">Future.</span>
                        </h1>
                        <p className="text-slate-500 font-medium leading-relaxed italic text-lg mb-12">
                           Become part of a global movement defining the next generation of performance footwear. Sustainable, fast, and engineered for you.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center text-brand">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h3 className="font-black text-xs tracking-widest uppercase text-brandCharcoal">Global Supply</h3>
                                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Access to worldwide exclusive collections and early drops.</p>
                            </div>

                            <div className="space-y-3">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center text-emerald-500">
                                    <Leaf className="w-6 h-6" />
                                </div>
                                <h3 className="font-black text-xs tracking-widest uppercase text-brandCharcoal">Eco-Protocol</h3>
                                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Every pair you own tracks a reduction in your carbon footprint.</p>
                            </div>

                            <div className="space-y-3">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center text-blue-500">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="font-black text-xs tracking-widest uppercase text-brandCharcoal">Elite Network</h3>
                                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Connect with millions of athletes and sustainability pioneers.</p>
                            </div>

                            <div className="space-y-3">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center text-brand">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="font-black text-xs tracking-widest uppercase text-brandCharcoal">System Secure</h3>
                                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Your data is encrypted using military-grade AES-256 protocols.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Card */}
                    <div className="flex-1 max-w-[500px] w-full">
                        <div className="bg-white rounded-[40px] shadow-2xl border border-brandCharcoal/5 p-10 md:p-14 relative overflow-hidden">
                             {/* Visual Accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            
                            <h2 className="text-2xl font-black text-brandCharcoal tracking-tighter mb-2">Create Identity.</h2>
                            <p className="text-sm text-slate-500 font-medium italic mb-10">Initialize your Velocity account protocol.</p>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="p-4 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest border border-red-100 rounded-2xl animate-in fade-in zoom-in">
                                        ! {error}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Universal Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-brand transition-colors" />
                                        <input
                                            type="text"
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Aris Vandermeer"
                                            className="w-full px-12 py-4 bg-brandOffWhite border border-brandCharcoal/5 rounded-2xl text-sm font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all outline-none text-brandCharcoal placeholder:text-slate-300"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Signal Path (Email)</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-brand transition-colors" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="aris@velocity.sys"
                                            className="w-full px-12 py-4 bg-brandOffWhite border border-brandCharcoal/5 rounded-2xl text-sm font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all outline-none text-brandCharcoal placeholder:text-slate-300"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Access Key (Password)</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-brand transition-colors" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full px-12 py-4 bg-brandOffWhite border border-brandCharcoal/5 rounded-2xl text-sm font-bold tracking-[0.4em] focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all outline-none text-brandCharcoal placeholder:text-slate-300"
                                        />
                                         <button 
                                            type="button" 
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-brand transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest mt-2 ml-1 italic">Entropy: 8+ character burst recommended</p>
                                </div>

                                <div className="pt-2">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="flex items-center h-5">
                                            <input
                                                type="checkbox"
                                                checked={agreed}
                                                onChange={(e) => setAgreed(e.target.checked)}
                                                className="w-4 h-4 text-brand border-brandCharcoal/5 rounded focus:ring-brand shadow-sm transition-colors"
                                            />
                                        </div>
                                        <div className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-widest italic group-hover:text-brandCharcoal transition-colors">
                                            I authorize the <Link to="#" className="text-brand hover:underline">Terms of Protocol</Link> and <Link to="#" className="text-brand hover:underline">Privacy Shield</Link>.
                                        </div>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full py-5 bg-brand text-white font-black rounded-2xl transition-all duration-500 shadow-xl shadow-brand/20 hover:shadow-brand/40 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-brandCharcoal translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <div className="relative flex items-center justify-center gap-4 tracking-[0.3em] text-xs">
                                        {loading ? 'INITIALIZING...' : 'CREATE IDENTITY'}
                                        <CheckCircle2 className="w-5 h-5 group-hover:animate-bounce" />
                                    </div>
                                </button>
                            </form>

                            <div className="relative mt-12 mb-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-brandCharcoal/5"></div>
                                </div>
                                <div className="relative flex justify-center text-[10px] font-black tracking-[0.4em] uppercase">
                                    <span className="px-4 bg-white text-slate-300">Alternate Sync</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={handleGoogle}
                                    className="flex items-center justify-center gap-3 px-6 py-4 bg-white border border-brandCharcoal/5 rounded-2xl hover:bg-brandOffWhite transition-all font-black text-[10px] tracking-widest uppercase text-brandCharcoal shadow-sm"
                                >
                                    <Chrome className="w-4 h-4 text-brand" />
                                    Google
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-3 px-6 py-4 bg-white border border-brandCharcoal/5 rounded-2xl hover:bg-brandOffWhite transition-all font-black text-[10px] tracking-widest uppercase text-brandCharcoal shadow-sm"
                                >
                                    <Apple className="w-4 h-4" />
                                    Apple
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 border-t border-brandCharcoal/5 text-center relative z-10">
                <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.4em]">© 2024 VELOCITY INC. Future-proof performance.</p>
            </footer>
        </div>
    );
};

export default Register;
