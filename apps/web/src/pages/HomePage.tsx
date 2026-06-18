import { useCallback, useEffect, useState } from 'react'
import { CategoryCarousel } from '../components/CategoryCarousel'
import { FilterBar } from '../components/FilterBar'
import { PromotionalBanner } from '../components/PromotionalBanner'
import { RestaurantSection } from '../components/RestaurantSection'
import { HomePageSkeleton } from '../components/skeletons/HomePageSkeleton'
import { DeliveryMetricsProvider } from '../context/DeliveryMetricsContext'
import {
  fetchBanners,
  fetchCategories,
  fetchFilters,
  fetchRestaurantSections,
} from '../lib/api'
import { waitMinLoading } from '../lib/minLoading'
import { PresenceSwap } from '../lib/PresenceSwap'
import type { ApiFilter, Banner, Category, RestaurantSection as RestaurantSectionType } from '../types'

export function HomePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [filters, setFilters] = useState<ApiFilter[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [sections, setSections] = useState<RestaurantSectionType[]>([])
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadInitialCatalog = useCallback(async () => {
    setError(null)

    const startTime = Date.now()

    try {
      const [categoriesData, filtersData, bannersData, sectionsData] = await Promise.all([
        fetchCategories(),
        fetchFilters(),
        fetchBanners(),
        fetchRestaurantSections(),
      ])

      await waitMinLoading(startTime)

      setCategories(categoriesData)
      setFilters(filtersData)
      setBanners(bannersData)
      setSections(sectionsData)
      setIsReady(true)
    } catch {
      setError('Não foi possível carregar o catálogo. Verifique se a API está em execução.')
    }
  }, [])

  const loadSections = useCallback(async (categoryId: string | null) => {
    try {
      const sectionsData = await fetchRestaurantSections(categoryId)
      setSections(sectionsData)
    } catch {
      setError('Não foi possível carregar os restaurantes desta categoria.')
    }
  }, [])

  useEffect(() => {
    void loadInitialCatalog()
  }, [loadInitialCatalog])

  useEffect(() => {
    if (!isReady) return
    void loadSections(selectedCategoryId)
  }, [isReady, selectedCategoryId, loadSections])

  if (error && !isReady) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-4 sm:px-6">
        <p className="text-center text-sm text-gray-500">{error}</p>
        <button
          type="button"
          onClick={() => void loadInitialCatalog()}
          className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <PresenceSwap showContent={isReady} fallback={<HomePageSkeleton />}>
      <DeliveryMetricsProvider sections={sections}>
        <div className="space-y-6 px-4 py-4 sm:px-6">
          <CategoryCarousel
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={setSelectedCategoryId}
          />

          <FilterBar filters={filters} />

          <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-2">
            {banners.map((banner) => (
              <div key={banner.id} className="flex h-48 min-w-0">
                <PromotionalBanner banner={banner} />
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {sections.length > 0 ? (
              sections.map((section) => (
                <RestaurantSection key={section.id} section={section} />
              ))
            ) : (
              <p className="py-8 text-center text-sm text-gray-500">
                Nenhum restaurante encontrado nesta categoria.
              </p>
            )}
          </div>
        </div>
      </DeliveryMetricsProvider>
    </PresenceSwap>
  )
}
