import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import { scrollReveal } from '../animations/gsapAnimations';
import StarRating from './ui/StarRating';

const reviews = [
  { rating: 5, body: 'The most sustainable shoe that actually feels like a high-performance runner. I\'m converted.', author: 'Sarah L., Marathon Runner' },
  { rating: 5, body: 'Beautifully designed and incredibly comfortable. These are my go-to for daily wear.', author: 'David K., Architect' },
  { rating: 5, body: 'Finally, a brand that takes carbon neutrality as seriously as they take style.', author: 'Mia R., Sustainability Consultant' },
];

const ReviewSection = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) scrollReveal(ref.current.querySelectorAll('.review-card'));
  }, []);

  return (
    <section className="py-24 bg-white border-y border-brandOffWhite overflow-hidden relative" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-20 review-card">
          <div className="flex justify-center mb-4">
            <StarRating rating={5} size="w-6 h-6" />
          </div>
          <h2 className="text-sm font-black tracking-[0.3em] uppercase text-brandCharcoal/40 mb-2">
            The Velocity Experience
          </h2>
          <p className="text-2xl md:text-3xl font-display font-bold text-brandCharcoal max-w-2xl mx-auto">
            Trusted by <span className="text-brand">500,000+</span> athletes and earth-lovers worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {reviews.map((r, i) => (
            <div key={i} className="review-card flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-2xl bg-brandOffWhite flex items-center justify-center mb-8 group-hover:bg-brand group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                <Quote className="w-5 h-5" />
              </div>
              <p className="text-brandCharcoal/70 text-lg leading-relaxed mb-8 font-medium">
                "{r.body}"
              </p>
              <div className="mt-auto">
                <p className="font-black text-[10px] tracking-widest uppercase text-brand">
                  {r.author.split(',')[0]}
                </p>
                <p className="text-[10px] tracking-[0.15em] uppercase text-slate-400 mt-1 font-bold">
                  {r.author.split(',')[1]?.trim()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
