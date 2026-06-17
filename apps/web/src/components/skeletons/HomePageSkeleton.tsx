import { CategoryCarouselSkeleton } from './CategoryCarouselSkeleton'
import { FilterBarSkeleton } from './FilterBarSkeleton'
import { PromotionalBannerSkeleton } from './PromotionalBannerSkeleton'
import { RestaurantSectionSkeleton } from './RestaurantSectionSkeleton'

export function HomePageSkeleton() {
  return (
    <div className="space-y-6 px-4 py-4 sm:px-6">
      <CategoryCarouselSkeleton />
      <FilterBarSkeleton />

      <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-2">
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="flex h-48 min-w-0">
            <PromotionalBannerSkeleton />
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <RestaurantSectionSkeleton />
        <RestaurantSectionSkeleton />
      </div>
    </div>
  )
}
