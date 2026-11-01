import { useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import FeatureSection from '../components/FeatureSection';
import StorySection from '../components/StorySection';
import ReviewSection from '../components/ReviewSection';
import Newsletter from '../components/Newsletter';
import DiscoveryFeed from '../components/layout/DiscoveryFeed';
import { useProducts } from '../hooks/useProducts';
import { pageEnter } from '../animations/gsapAnimations';
import { ProductSkeleton } from '../components/ui/Skeleton';

const Home = () => {
  const ref = useRef(null);
  const { products, loading } = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
    pageEnter(ref.current);
  }, []);

  // ⚡ Bolt: Memoize derived collections passed to animation-heavy components (like ProductGrid) to prevent layout re-animations
  const featured = useMemo(() => products.slice(0, 4), [products]);

  return (
    <div ref={ref} className="bg-brandOffWhite noise mesh-gradient">
      <HeroSection />
      <ReviewSection />

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary font-bold text-xs tracking-widest uppercase mb-2">New & Featured</p>
              <h2 className="text-4xl font-bold text-slate-900">Bestsellers</h2>
            </div>
            <Link
              to="/shop"
              className="text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors"
            >
              Shop All →
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : featured.length > 0 ? (
            <ProductGrid products={featured} cols={4} />
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="font-medium">No featured products yet.</p>
            </div>
          )}
        </div>
      </section>

      <FeatureSection />
      
      {/* Personalized Discovery Engine */}
      <DiscoveryFeed />

      <StorySection />
      <Newsletter />
    </div>
  );
};

export default Home;
