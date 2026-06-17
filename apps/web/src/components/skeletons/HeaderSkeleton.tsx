export function HeaderSkeleton() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-gray-200 bg-white px-4 lg:px-6">
      <div className="flex items-center gap-2 justify-self-start">
        <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />
        <div className="hidden h-6 w-24 animate-pulse rounded-md bg-gray-200 sm:block" />
      </div>

      <div className="h-11 w-56 animate-pulse rounded-full bg-gray-200 sm:w-64 md:w-72 lg:w-80" />

      <div className="flex items-center justify-end gap-2 justify-self-end">
        <div className="hidden h-11 w-44 animate-pulse rounded-full bg-gray-200 md:block" />
        <div className="h-11 w-16 animate-pulse rounded-full bg-gray-200" />
      </div>
    </header>
  )
}
