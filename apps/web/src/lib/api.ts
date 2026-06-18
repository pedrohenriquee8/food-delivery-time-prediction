import type { ApiFilter, Banner, Category, RestaurantSection } from '../types'

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json() as Promise<T>
}

export function fetchCategories(): Promise<Category[]> {
  return fetchJson('/api/categories')
}

export function fetchFilters(): Promise<ApiFilter[]> {
  return fetchJson('/api/filters')
}

export function fetchBanners(): Promise<Banner[]> {
  return fetchJson('/api/banners')
}

export function fetchRestaurantSections(
  categoryId?: string | null
): Promise<RestaurantSection[]> {
  const params = categoryId ? `?categoryId=${encodeURIComponent(categoryId)}` : ''
  return fetchJson(`/api/restaurant-sections${params}`)
}
