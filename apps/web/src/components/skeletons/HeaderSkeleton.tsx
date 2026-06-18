export function HeaderSkeleton() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex h-16 items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 lg:px-6">
      <div className="flex shrink-0 items-center gap-2">
        <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />
        <div className="hidden h-6 w-24 animate-pulse rounded-md bg-gray-200 sm:block" />
      </div>

      <div className="flex items-center justify-end">
        <div className="h-11 w-24 animate-pulse rounded-full bg-gray-200" />
      </div>
    </header>
  )
}
