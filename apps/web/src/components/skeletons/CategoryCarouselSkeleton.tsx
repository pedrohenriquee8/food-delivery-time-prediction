const categoryCount = 8;

export function CategoryCarouselSkeleton() {
  return (
    <div className="relative">
      <div className="flex gap-1 overflow-hidden pb-1 pr-12">
        {Array.from({ length: categoryCount }, (_, index) => (
          <div
            key={index}
            className="flex w-20 shrink-0 flex-col items-center gap-2 rounded-xl p-2"
          >
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
            <div className="h-3 w-14 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="absolute right-0 top-1/2 h-9 w-9 -translate-y-1/2 animate-pulse rounded-full bg-gray-200" />
    </div>
  );
}
