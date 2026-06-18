const RESTAURANT_COLORS = [
  '#eb1700',
  '#2563eb',
  '#16a34a',
  '#ca8a04',
  '#9333ea',
  '#0891b2',
  '#ea580c',
  '#be185d',
  '#4f46e5',
  '#0d9488',
  '#c026d3',
  '#65a30d',
]

function hashRestaurantId(restaurantId: string): number {
  let hash = 0
  for (let i = 0; i < restaurantId.length; i++) {
    hash = (hash * 31 + restaurantId.charCodeAt(i)) >>> 0
  }
  return hash
}

export function getRestaurantColor(restaurantId: string): string {
  return RESTAURANT_COLORS[hashRestaurantId(restaurantId) % RESTAURANT_COLORS.length]
}
