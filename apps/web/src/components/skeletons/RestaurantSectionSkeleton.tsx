const cardCount = 4

function RestaurantCardSkeleton() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2.5 rounded-2xl p-2.5">
      <div className="aspect-video w-full animate-pulse rounded-xl bg-gray-200" />

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-5 shrink-0 animate-pulse rounded-full bg-gray-200" />
        </div>
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  )
}

export function RestaurantSectionSkeleton() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="h-7 w-56 animate-pulse rounded bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>

      <div className="-mx-1 flex gap-4 px-1 pb-1 lg:mx-0 lg:grid lg:grid-cols-4 lg:px-0">
        {Array.from({ length: cardCount }, (_, index) => (
          <div
            key={index}
            className="w-[calc(50vw-2rem)] shrink-0 sm:w-[calc(40vw-2rem)] lg:w-auto lg:shrink"
          >
            <RestaurantCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  )
}
