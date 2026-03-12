const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-200 rounded-md ${className}`} />
);

export const ProductSkeleton = () => (
  <div className="flex flex-col gap-4 p-3 bg-white rounded-2xl border border-slate-100">
    <Skeleton className="aspect-[4/5] rounded-xl w-full" />
    <div className="space-y-2 px-1">
      <div className="flex justify-between">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-5 w-3/4" />
      <div className="flex justify-between pt-2 border-t border-slate-50 mt-2">
        <Skeleton className="h-6 w-1/4" />
        <div className="flex gap-1">
          <Skeleton className="w-2.5 h-2.5 rounded-full" />
          <Skeleton className="w-2.5 h-2.5 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

export default Skeleton;
