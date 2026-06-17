import type { LucideIcon } from 'lucide-react'

export interface Category {
  id: string
  name: string
  icon: string
}

export interface Restaurant {
  id: string
  name: string
  imageUrl: string
  rating: number
  reviewCount: string
  distance: string
  estimatedTime: string
  deliveryFee: string
  promotion?: string
  categoryIds: string[]
}

export interface RestaurantSection {
  id: string
  title: string
  restaurants: Restaurant[]
}

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  active?: boolean
}

export interface Filter {
  id: string
  label: string
  icon?: LucideIcon
  hasDropdown?: boolean
}

export type FilterIconSlug = 'tag' | 'star' | 'crown'

export interface ApiFilter {
  id: string
  label: string
  icon?: FilterIconSlug
  hasDropdown?: boolean
}

export interface Banner {
  id: string
  variant: 'pink' | 'teal'
  title: string
  subtitle?: string
  code?: string
  ctaLabel: string
  imageUrl: string
  badge?: string
}

export type LocationSource = 'gps' | 'manual'

export interface UserLocation {
  lat: number
  lng: number
  label: string
  source: LocationSource
}

export type GeolocationStatus =
  | 'idle'
  | 'loading'
  | 'granted'
  | 'denied'
  | 'unsupported'
  | 'error'

export interface AddressSuggestion {
  label: string
  lat: number
  lng: number
}
