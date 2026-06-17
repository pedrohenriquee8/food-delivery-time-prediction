import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { RestaurantSection as RestaurantSectionType } from '../types'
import { RestaurantCard } from './RestaurantCard'

interface RestaurantSectionProps {
  section: RestaurantSectionType
}

export function RestaurantSection({ section }: RestaurantSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const amount = direction === 'left' ? -320 : 320
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-sm font-semibold text-gray-700 transition-colors hover:text-primary"
          >
            Ver todos
          </button>
          <button
            type="button"
            onClick={() => scroll('left')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50"
            aria-label="Próximo"
          >
            <ChevronRight className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide -mx-1 flex gap-4 overflow-x-auto px-1 pb-1 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0"
      >
        {section.restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="w-[calc(50vw-2rem)] shrink-0 sm:w-[calc(40vw-2rem)] lg:w-auto lg:shrink"
          >
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    </section>
  )
}
