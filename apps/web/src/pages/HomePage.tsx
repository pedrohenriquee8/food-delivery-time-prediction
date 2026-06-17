import { Suspense, useMemo, useState } from 'react'
import { CategoryCarouselSkeleton } from '../components/skeletons/CategoryCarouselSkeleton'
import { FilterBarSkeleton } from '../components/skeletons/FilterBarSkeleton'
import { PromotionalBannerSkeleton } from '../components/skeletons/PromotionalBannerSkeleton'
import { RestaurantSectionSkeleton } from '../components/skeletons/RestaurantSectionSkeleton'
import { promotionalBanners, restaurantSections } from '../data/restaurants'
import { lazyWithDelay } from '../lib/lazyWithDelay'
import type { Banner, RestaurantSection as RestaurantSectionType } from '../types'

const LazyCategoryCarousel = lazyWithDelay(
  () => import('../components/CategoryCarousel'),
  'CategoryCarousel'
)

const LazyFilterBar = lazyWithDelay(
  () => import('../components/FilterBar'),
  'FilterBar'
)

const LazyPromotionalBanner = lazyWithDelay<{ banner: Banner }>(
  () => import('../components/PromotionalBanner'),
  'PromotionalBanner'
)

const LazyRestaurantSection = lazyWithDelay<{ section: RestaurantSectionType }>(
  () => import('../components/RestaurantSection'),
  'RestaurantSection'
)

export function HomePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)

  const filteredSections = useMemo(() => {
    if (!selectedCategoryId) return restaurantSections

    return restaurantSections
      .map((section) => ({
        ...section,
        restaurants: section.restaurants.filter((restaurant) =>
          restaurant.categoryIds.includes(selectedCategoryId)
        ),
      }))
      .filter((section) => section.restaurants.length > 0)
  }, [selectedCategoryId])

  return (
    <div className="space-y-6 px-4 py-4 sm:px-6">
      <Suspense fallback={<CategoryCarouselSkeleton />}>
        <LazyCategoryCarousel
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={setSelectedCategoryId}
        />
      </Suspense>

      <Suspense fallback={<FilterBarSkeleton />}>
        <LazyFilterBar />
      </Suspense>

      <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-2">
        {promotionalBanners.map((banner) => (
          <div key={banner.id} className="flex h-48 min-w-0">
            <Suspense fallback={<PromotionalBannerSkeleton />}>
              <LazyPromotionalBanner banner={banner} />
            </Suspense>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => (
            <Suspense key={section.id} fallback={<RestaurantSectionSkeleton />}>
              <LazyRestaurantSection section={section} />
            </Suspense>
          ))
        ) : (
          <p className="py-8 text-center text-sm text-gray-500">
            Nenhum restaurante encontrado nesta categoria.
          </p>
        )}
      </div>
    </div>
  )
}
