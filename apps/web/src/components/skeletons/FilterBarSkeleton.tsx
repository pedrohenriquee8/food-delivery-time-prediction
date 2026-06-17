import { filters, FILTER_BAR_CLASS } from '../../data/filters'

export function FilterBarSkeleton() {
  return (
    <div className={FILTER_BAR_CLASS}>
      {filters.map((filter) => (
        <div
          key={filter.id}
          className="flex shrink-0 animate-pulse items-center gap-1.5 rounded-full bg-gray-200 px-3.5 py-1.5"
        >
          {filter.icon && <span className="invisible h-4 w-4" />}
          <span className="invisible text-sm font-medium whitespace-nowrap">
            {filter.label}
          </span>
          {filter.hasDropdown && <span className="invisible h-4 w-4" />}
        </div>
      ))}
    </div>
  )
}
