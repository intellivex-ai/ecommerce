import { useEffect, useRef } from 'react';
import { ArrowRight, Leaf, Zap, Users } from 'lucide-react';
import { scrollReveal, gsap } from '../animations/gsapAnimations';

const StorySection = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      scrollReveal(ref.current.querySelectorAll('.story-item'));
      
      // Parallax for images
      gsap.to(ref.current.querySelector('.parallax-up'), {
        y: -100,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
      
      gsap.to(ref.current.querySelector('.parallax-down'), {
        y: 100,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }, []);

  return (
    <section className="py-32 bg-brandOffWhite overflow-hidden relative" ref={ref}>
      {/* Abstract Background Element */}
      <div className="absolute -right-20 top-20 w-96 h-96 bg-brand/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="story-item">
            <div className="inline-flex items-center gap-2 bg-brand/10 px-4 py-2 rounded-full mb-6">
              <Leaf className="w-4 h-4 text-brand" />
              <span className="text-[10px] font-black tracking-widest uppercase text-brand">The Velocity Mission</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-display font-extrabold text-brandCharcoal leading-[1.1] mb-8 tracking-tighter">
              Performance and planet, <br />
              <span className="text-brand">In Perfect Balance.</span>
            </h2>
            
            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl font-medium">
              Born from the idea that performance gear shouldn't cost the earth. Since 2018, we've
              proven that the highest-performing athletic shoes can also be the most sustainable.
            </p>
            
            <p className="text-slate-500 leading-relaxed mb-12 max-w-lg">
              Every material is chosen with purpose. Every process is scrutinized for its
              environmental impact. This isn't just a business — it's a movement towards a better future.
            </p>
            
            <div className="grid grid-cols-3 gap-8 p-8 bg-white rounded-3xl shadow-premium border border-brand/5 mb-10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rotate-45 translate-x-16 -translate-y-16" />
              {[
                { value: '40%', label: 'Bio-materials', icon: <Leaf className="w-4 h-4" /> },
                { value: '100%', label: 'Neutralized', icon: <Zap className="w-4 h-4" /> },
                { value: '500K+', label: 'Athletes', icon: <Users className="w-4 h-4" /> },
              ].map((stat) => (
                <div key={stat.label} className="text-center group/stat">
                  <div className="flex justify-center text-brand/30 group-hover/stat:text-brand transition-colors mb-2">
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-extrabold text-brandCharcoal group-hover/stat:scale-110 transition-transform duration-300">{stat.value}</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1 font-black">{stat.label}</p>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-3 text-brandCharcoal font-black text-xs tracking-[0.2em] uppercase group">
              Read our transparency report
              <div className="w-10 h-10 rounded-full border border-brandCharcoal/10 flex items-center justify-center group-hover:bg-brandCharcoal group-hover:text-white transition-all duration-500">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          <div className="story-item relative">
            <div className="grid grid-cols-2 gap-5">
              <div className="overflow-hidden rounded-3xl h-[550px] shadow-2xl parallax-up">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfunLqtTitRXaaaB2N8VcrWAam231SfPhbd_Mv2-e6P7PsbY-FTuFFh1MLMekhvSLfZ5jBR1HNC-pA1Vurgs9XuGusbXHkUFEWz5IlzEruUPpCpK1SzSjoFFqpB0gGgtZRHtvNCYK_TUeXnwo1YPK_s86mthmxAf6NZUbA9aeJXjupSLnnG580IwU1C8PwMnqtIr5nMwdNRNi2TCl8csx30Qifwy6Lusa9CUaSL9ct-_w0HnpKoXqWYt71jzIc9r7ygS_-uB7SpnY"
                  alt="Craftsmanship"
                  className="object-cover w-full h-full scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-3xl h-[550px] shadow-2xl translate-y-20 parallax-down">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEw_jAGFe3oMeO9lFlOMZ-ScYCjc8bGRz_ani3OiPu90NTZ9ks-16IQDSbro9X6a-Djg-pqi5KNTWyde3fdnTa8rqwtbabGvMqkBfztJRaRywErHopyl1Lr4E4x8czNhbWDmndiGoe02wnXi1lqNVbdfD0v3zdMUJORhF9mQzAU0h-o554JgcpFX6Sqb0_Gwo257JzZyB0igveGnfGN_V1hAgR8-a84GF0iGkXOjqWk2sR2f13h8x0N6xNp3aNQFAOvyFaBtuBuhU"
                  alt="Sustainability"
                  className="object-cover w-full h-full scale-110"
                />
              </div>
            </div>
            
            {/* Floating brand badge with its own floating animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full glass flex items-center justify-center border-white/50 shadow-2xl z-10 animate-float">
              <div className="text-center">
                  <Zap className="w-5 h-5 text-brand mx-auto mb-2" fill="currentColor" />
                  <span className="text-[10px] font-black tracking-widest uppercase text-brandCharcoal leading-tight block">Velocity<br/>Crafted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
