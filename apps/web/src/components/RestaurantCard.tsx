import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star } from 'lucide-react'
import type { Restaurant } from '../types'

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <motion.article
      className="group flex w-full min-w-0 cursor-pointer flex-col gap-2.5 rounded-2xl border border-transparent p-2.5 hover:border-gray-200 hover:bg-gray-50"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-200">
        {!imageError ? (
          <motion.img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <span className="text-3xl">🍽️</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-base font-bold text-gray-900">
            {restaurant.name}
          </h3>
          <motion.button
            type="button"
            onClick={() => setIsFavorite((prev) => !prev)}
            className="shrink-0 rounded-full p-1 hover:bg-gray-100"
            whileTap={{ scale: 0.85 }}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? 'fill-primary text-primary' : 'text-gray-400'
              }`}
            />
          </motion.button>
        </div>

        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm text-gray-600">
          <span className="flex items-center gap-0.5 font-medium text-gray-900">
            {restaurant.rating.toLocaleString('pt-BR', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          </span>
          <span>({restaurant.reviewCount})</span>
          <span className="text-gray-400">•</span>
          <span>{restaurant.distance}</span>
          <span className="text-gray-400">•</span>
          <span>{restaurant.estimatedTime}</span>
        </div>

        <p className="text-sm text-gray-600">{restaurant.deliveryFee}</p>

        {restaurant.promotion && (
          <p className="text-sm font-medium text-primary">{restaurant.promotion}</p>
        )}
      </div>
    </motion.article>
  )
}
