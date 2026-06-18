function RestaurantCardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-gray-200" />
      <div className="space-y-2 px-1">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  )
}

export function RestaurantSectionSkeleton() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="w-[calc(50vw-2rem)] shrink-0 sm:w-[calc(40vw-2rem)] lg:w-auto lg:flex-1"
          >
            <RestaurantCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  )
}
