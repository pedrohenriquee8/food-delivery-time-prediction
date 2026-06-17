import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronDown,
  Loader2,
  MapPin,
  Search,
  ShoppingCart,
  UtensilsCrossed,
} from 'lucide-react'
import { useLocation } from '../context/useLocation'
import { LocationDialog } from './LocationDialog'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const {
    location,
    isFallback,
    geoStatus,
    requestLocation,
    openDialog,
  } = useLocation()

  const locationLabel =
    geoStatus === 'loading' && isFallback
      ? 'Localizando...'
      : location?.label ?? 'Selecionar endereço'

  const handleLocationClick = () => {
    if (isFallback) {
      void requestLocation()
    }
    openDialog()
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-gray-200 bg-white px-4 lg:px-6">
        <div className="flex items-center gap-2 justify-self-start">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <UtensilsCrossed className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="hidden text-xl font-bold tracking-tight text-primary sm:block">
            FoodDash
          </span>
        </div>

        <div className="relative w-56 sm:w-64 md:w-72 lg:w-80">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar restaurantes e lojas"
            className="h-11 w-full rounded-full bg-gray-100 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:bg-gray-50 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center justify-end gap-1 justify-self-end">
          <button
            type="button"
            onClick={handleLocationClick}
            className="hidden h-11 items-center gap-1.5 rounded-full bg-gray-100 px-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 md:flex"
          >
            {geoStatus === 'loading' && isFallback ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-gray-500" />
            ) : (
              <MapPin className="h-4 w-4 shrink-0" />
            )}
            <span
              className={`max-w-[140px] truncate ${isFallback ? 'text-gray-500' : 'text-gray-900'}`}
            >
              {locationLabel}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" />
          </button>

          <motion.button
            type="button"
            className="flex h-11 items-center gap-1.5 rounded-full bg-primary px-3.5 text-white hover:opacity-90"
            whileTap={{ scale: 0.95 }}
            aria-label="Carrinho"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="text-sm font-semibold">0</span>
          </motion.button>
        </div>
      </header>

      <LocationDialog />
    </>
  )
}
