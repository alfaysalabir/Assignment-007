export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-base-300 bg-base-100 p-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-base-300" />
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-base-300" />
          <div className="h-3 w-16 rounded bg-base-300" />
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-3 w-16 rounded bg-base-300" />
          <div className="h-5 w-20 rounded bg-base-300" />
        </div>
        <div className="h-6 w-14 rounded-full bg-base-300" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="লোড হচ্ছে">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BlockSkeleton({ className = "h-24" }) {
  return <div className={`animate-pulse rounded-2xl bg-base-300 ${className}`} />;
}
