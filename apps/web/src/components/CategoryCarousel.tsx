import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useHorizontalScroll } from '../lib/useHorizontalScroll'
import type { Category } from '../types'
import { CategoryItem } from './CategoryItem'

interface CategoryCarouselProps {
  categories: Category[]
  selectedCategoryId?: string | null
  onCategorySelect?: (categoryId: string | null) => void
}

export function CategoryCarousel({
  categories,
  selectedCategoryId: controlledSelectedId,
  onCategorySelect,
}: CategoryCarouselProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null)
  const { scrollRef, canScrollLeft, canScrollRight, scroll } = useHorizontalScroll(320)

  const selectedCategoryId =
    controlledSelectedId !== undefined ? controlledSelectedId : internalSelectedId

  const handleCategoryClick = (categoryId: string) => {
    const nextId = selectedCategoryId === categoryId ? null : categoryId

    if (onCategorySelect) {
      onCategorySelect(nextId)
    } else {
      setInternalSelectedId(nextId)
    }
  }

  return (
    <div className="relative">
      {canScrollLeft && (
        <>
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white to-transparent"
            aria-hidden
          />
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50"
            aria-label="Categorias anteriores"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className={`scrollbar-hide flex gap-1 overflow-x-auto py-1.5 ${
          canScrollLeft ? 'pl-10' : ''
        } ${canScrollRight ? 'pr-10' : ''}`}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            selected={selectedCategoryId === category.id}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </div>

      {canScrollRight && (
        <>
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white to-transparent"
            aria-hidden
          />
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50"
            aria-label="Ver mais categorias"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </>
      )}
    </div>
  )
}
