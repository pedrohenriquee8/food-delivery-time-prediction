const filterCount = 6

export function FilterBarSkeleton() {
  return (
    <div className="flex min-h-[46px] gap-2 overflow-hidden py-1.5">
      {Array.from({ length: filterCount }, (_, index) => (
        <div
          key={index}
          className="h-[38px] w-24 shrink-0 animate-pulse rounded-full bg-gray-200"
        />
      ))}
    </div>
  )
}
