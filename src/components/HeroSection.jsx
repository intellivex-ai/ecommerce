import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Globe } from 'lucide-react';
import { heroReveal, magneticButton, parallaxBackground } from '../animations/gsapAnimations';

const HeroSection = () => {
  const containerRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    heroReveal(containerRef.current);
    magneticButton(btn1Ref.current);
    magneticButton(btn2Ref.current);
    parallaxBackground(imgRef.current);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-brandSoftBeige">
      {/* Premium Background Image with better overlay */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imgRef}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPXZamh7Y0S0z4HgJgKFVdHJ0j68EiFJS_ZDXNc10DGberOeecZdNB7yhPYBBsqIQhM7TFZY_4156V_-cgmUZqsgqkRwoz1Qe-0Kw-zTQf2CT2i3k1YCqPUVrCeFhsxETQmxX3qyFgrlf8MDObU4I-XK8g-A0pVGrVVVUy6HYBuhF2_4U4BGS-slDsNZUYdfno-DLP4I7Z3VKCYaqRnKicnro8DvBH8ax6hz9xfyGLzN1fr5whkUwjOzPFQSlcqM095UNg2yEExwQ"
          alt="Premium sustainable footwear"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brandCharcoal/80 via-brandCharcoal/40 to-transparent z-10" />
      </div>

      <div
        ref={containerRef}
        className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center items-start text-white"
      >
        {/* Floating badge */}
        <div className="hero-animate mb-6 flex items-center gap-2 bg-brand/20 backdrop-blur-md border border-brand/30 px-4 py-2 rounded-full">
          <Globe className="w-4 h-4 text-brand" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand">Carbon Neutral Since 2018</span>
        </div>

        <h1 className="hero-animate text-6xl md:text-8xl font-display font-extrabold mb-8 tracking-tighter leading-[0.9] max-w-2xl">
          Move with <br />
          <span className="text-brand">Velocity.</span>
        </h1>
        
        <p className="hero-animate text-lg md:text-xl mb-12 max-w-md font-light text-slate-200 leading-relaxed italic">
          High-performance gear engineered for the planet. Experience the next generation of sustainable motion.
        </p>

        <div className="hero-animate flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link
            ref={btn1Ref}
            to="/shop?cat=men"
            className="group bg-brand text-white px-10 py-5 rounded-xl font-bold hover:bg-white hover:text-brandCharcoal transition-colors duration-500 text-center tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-brand/20"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            SHOP MEN'S
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Link>
          <Link
            ref={btn2Ref}
            to="/shop?cat=women"
            className="group bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-xl font-bold hover:bg-white hover:text-brandCharcoal transition-colors duration-500 text-center tracking-widest text-xs flex items-center justify-center gap-3"
          >
            SHOP WOMEN'S
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Hero Bottom Stats */}
        <div className="hero-animate mt-20 grid grid-cols-3 gap-12 border-l border-white/20 pl-8 pointer-events-none hidden md:grid">
          <div>
            <p className="text-2xl font-bold text-white">40%</p>
            <p className="text-[10px] uppercase tracking-widest text-slate-400">Bio materials</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">0%</p>
            <p className="text-[10px] uppercase tracking-widest text-slate-400">Carbon debt</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-[10px] uppercase tracking-widest text-slate-400">Performance</p>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20">
        <span className="text-[10px] font-bold tracking-widest uppercase text-white rotate-90 mb-8 origin-center">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
