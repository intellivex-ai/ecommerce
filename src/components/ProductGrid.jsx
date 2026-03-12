import { useRef, useEffect } from 'react';
import ProductCard from './ui/ProductCard';
import { staggerItems } from '../animations/gsapAnimations';

const ProductGrid = ({ products = [], cols = 4 }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) staggerItems(gridRef.current, 'article');
  }, [products]);

  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  }[cols] || 'grid-cols-2 lg:grid-cols-4';

  return (
    <div ref={gridRef} className={`grid ${colClass} gap-x-6 gap-y-12`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;
