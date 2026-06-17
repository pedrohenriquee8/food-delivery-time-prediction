export function PromotionalBannerSkeleton() {
  return (
    <div className="flex h-48 w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-gray-200 lg:flex-row">
      <div className="flex w-full flex-1 flex-col justify-center gap-2 p-4 sm:p-5 lg:w-1/2">
        <div className="h-4 w-16 animate-pulse rounded-md bg-gray-300" />
        <div className="h-5 w-3/4 max-w-xs animate-pulse rounded bg-gray-300" />
        <div className="h-4 w-1/2 max-w-[200px] animate-pulse rounded bg-gray-300" />
        <div className="mt-1 h-8 w-24 animate-pulse rounded-full bg-gray-300" />
      </div>

      <div className="hidden h-full w-1/2 animate-pulse bg-gray-300 lg:block" />
    </div>
  )
}
