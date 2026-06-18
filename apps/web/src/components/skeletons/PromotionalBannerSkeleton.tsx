export function PromotionalBannerSkeleton() {
  return (
    <div className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-gray-100">
      <div className="flex flex-1 flex-col justify-center gap-2 p-5">
        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="mt-1 h-8 w-28 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  )
}
