import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';
import { scrollReveal, toastFeedback } from '../../animations/gsapAnimations';

const Footer = () => {
  const [email, setEmail] = useState('');
  const footerRef = useRef(null);

  useEffect(() => {
    if (footerRef.current) {
      scrollReveal(footerRef.current.querySelectorAll('.reveal-footer'), { start: 'top 95%' });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toastFeedback('Infiltrated: You are on the list');
    setEmail('');
  };

  return (
    <footer ref={footerRef} className="bg-brandCharcoal text-white mt-40 py-24 relative overflow-hidden border-t border-white/5">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand blur-[150px] animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand/30 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid md:grid-cols-12 gap-16 lg:gap-8">
          {/* Brand & Mission */}
          <div className="col-span-12 lg:col-span-5 reveal-footer">
            <Link to="/" className="text-4xl font-black tracking-tighter text-white mb-8 block hover:opacity-80 transition-opacity">
              VELOCITY<span className="text-brand">.</span>
            </Link>
            <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10 max-w-sm">
              We define the cutting edge of athletic performance. Our mission is to move the world forward, one sustainable step at a time.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-brand hover:text-white transition-all duration-500 hover:-translate-y-1 text-slate-300 border-white/10 group">
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-6 lg:col-span-2 lg:col-start-7 reveal-footer">
            <h5 className="font-black mb-8 text-[10px] uppercase tracking-[0.2em] text-brand">Discovery</h5>
            <ul className="space-y-5 text-slate-400 text-sm font-bold uppercase tracking-widest">
              <li><Link to="/shop" className="hover:text-brand transition-colors inline-block">The Grid</Link></li>
              <li><Link to="/shop?cat=men" className="hover:text-brand transition-colors inline-block text-white/90">Elite Performance</Link></li>
              <li><Link to="/shop?cat=women" className="hover:text-brand transition-colors inline-block">Trail Blazers</Link></li>
              <li><Link to="/shop?sale=true" className="hover:text-brand transition-colors inline-block italic">The Vault</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-12 lg:col-span-4 reveal-footer">
            <h5 className="font-black mb-8 text-[10px] uppercase tracking-[0.2em] text-brand">Access Portal</h5>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
              Join the Velocity Elite. Be the first to receive intel on new gear drops and performance breakthroughs.
            </p>
            <form onSubmit={handleSubmit} className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 pr-14 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand text-sm text-white placeholder-slate-500 transition-all font-sans font-medium"
                required
              />
              <button
                type="submit"
                className="absolute right-3 top-3 bottom-3 bg-brand text-white px-4 rounded-xl flex items-center justify-center hover:bg-white hover:text-brandCharcoal transition-all shadow-lg active:scale-95"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 mt-24 pt-10 flex flex-col md:flex-row items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 gap-6 reveal-footer">
          <p>© {new Date().getFullYear()} Velocity Labs. All systems go.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Intel</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Op</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Auth</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
