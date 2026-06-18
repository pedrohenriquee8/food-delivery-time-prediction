import type { AddressSuggestion } from '../types'

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org'

async function nominatimFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${NOMINATIM_BASE}${path}`, {
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) {
    throw new Error('Geocoding request failed')
  }
  return response.json() as Promise<T>
}

export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<{ label: string } | null> {
  try {
    const data = await nominatimFetch<{ display_name?: string }>(
      `/reverse?format=json&lat=${lat}&lon=${lng}`
    )
    return data.display_name ? { label: data.display_name } : null
  } catch {
    return null
  }
}

export async function searchAddress(query: string): Promise<AddressSuggestion[]> {
  if (!query.trim()) return []

  try {
    const data = await nominatimFetch<
      Array<{ display_name: string; lat: string; lon: string }>
    >(`/search?format=json&q=${encodeURIComponent(query)}&limit=5`)
    return data.map((item) => ({
      label: item.display_name,
      lat: Number(item.lat),
      lng: Number(item.lon),
    }))
  } catch {
    return []
  }
}
