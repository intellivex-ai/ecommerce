import { useEffect, useRef } from 'react';
import { Cloud, ShieldCheck, RefreshCw, Truck, Cpu, Activity, Globe, Zap } from 'lucide-react';
import { staggerReveal, magneticButton, tiltEffect } from '../animations/gsapAnimations';

const features = [
  {
    icon: <Cloud className="w-8 h-8" />,
    title: 'Carbon Neutral',
    desc: 'Every pair is offset through certified reforestation projects worldwide.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: 'Performance Pro',
    desc: 'Tested by elite athletes in the most demanding trail conditions.',
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: 'Circular Tech',
    desc: 'Trade in old pairs for credit. We recycle every single component.',
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Express Delivery',
    desc: 'Free shipping on orders over $150 & 30-day no-hassle returns.',
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: 'Neural Fit AI',
    desc: 'Predictive sizing engine built on 1M+ foot scans for a perfect lock.',
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: 'Velocity Pulse',
    desc: 'Real-time biometrics & impact tracking integrated into every fiber.',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Global Network',
    desc: 'Join 50k+ athletes in exclusive local running & recovery hubs.',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Instant Eco-Vault',
    desc: 'Track your carbon savings & unlock rewards through our digital ledger.',
  },
];

const FeatureSection = () => {
  const ref = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (ref.current) {
      staggerReveal(ref.current.querySelectorAll('.feature-item'), {
        start: 'top 85%',
        stagger: 0.1,
      });
    }
    cardRefs.current.forEach(card => {
        if (card) {
            tiltEffect(card, 10);
            magneticButton(card.querySelector('.icon-container'), 0.3);
        }
    });
  }, []);

  return (
    <section className="py-24 bg-brandOffWhite relative overflow-hidden noise" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-brandCharcoal mb-6">
                Redefining the <span className="text-brand italic">Edge.</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                Our ecosystem is engineered for those who demand more. Sustainable, high-performance, and infinitely connected.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div 
              key={f.title} 
              ref={el => cardRefs.current[i] = el}
              className="feature-item group glass p-8 rounded-3xl transition-all duration-500 hover:shadow-premium border-white/40 ring-1 ring-black/5"
            >
              <div className="icon-container flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 text-brand mb-8 group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-sm border border-brand/20">
                {f.icon}
              </div>
              <h4 className="font-display font-bold text-lg text-brandCharcoal mb-3 group-hover:text-brand transition-colors">
                {f.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold italic opacity-80 group-hover:opacity-100 transition-opacity">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
