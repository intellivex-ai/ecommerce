import { Star } from 'lucide-react';

const StarRating = ({ rating = 5, max = 5, size = 'w-4 h-4', showCount, count }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`${size} ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'}`}
          strokeWidth={1}
        />
      ))}
      {showCount && count != null && (
        <span className="ml-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">({count})</span>
      )}
    </div>
  );
};

export default StarRating;
