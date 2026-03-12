import { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { staggerReveal } from '../animations/gsapAnimations';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      staggerReveal(ref.current.querySelectorAll('.news-animate'), {
        start: 'top 80%',
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Premium dark-to-brand gradient background */}
      <div className="absolute inset-0 bg-brandCharcoal" />
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand/20 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="news-animate inline-block px-4 py-2 rounded-full bg-brand/10 border border-brand/20 mb-8">
          <p className="text-brand font-black text-[10px] tracking-[0.3em] uppercase underline decoration-brand/30 underline-offset-4">Join the Inner Circle</p>
        </div>
        
        <h2 className="news-animate text-5xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter">
          Be the first to <br/>
          <span className="text-gradient">Know Everything.</span>
        </h2>
        
        <p className="news-animate text-slate-400 mb-12 text-lg leading-relaxed max-w-2xl mx-auto font-medium">
          Unlock early access to limited drops, exclusive member events, and deep dives into the science of motion.
        </p>

        {submitted ? (
          <div className="news-animate flex flex-col items-center justify-center p-12 glass border-brand/20 rounded-3xl animate-[scale-in_0.5s_ease-out]">
            <CheckCircle2 className="w-16 h-16 text-brand mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">You're in the elite list.</h3>
            <p className="text-slate-400">Welcome to the future of Velocity.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="news-animate flex flex-col sm:flex-row gap-4 max-w-xl mx-auto p-2 glass border-white/10 rounded-2xl group transition-all duration-500 hover:border-brand/30">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-transparent border-none px-6 py-4 text-white placeholder-slate-500 focus:ring-0 text-base font-sans"
            />
            <button
              type="submit"
              className="bg-brand hover:bg-brand-dark text-white font-black px-10 py-4 rounded-xl transition-all duration-300 transform group-hover:scale-[1.02] flex items-center justify-center gap-2 shadow-xl shadow-brand/20"
            >
              SUBSCRIBE
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
        
        <div className="mt-12 flex items-center justify-center gap-8 text-[10px] uppercase font-bold tracking-widest text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand" />
            Weekly Drops
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand" />
            No Spam Policy
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand" />
            Unsubscribe anytime
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
