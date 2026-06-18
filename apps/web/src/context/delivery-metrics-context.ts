import { createContext } from 'react'
import type { DeliveryMetric, MetricState } from '../types'

export interface DeliveryMetricsContextValue {
  getMetric: (restaurantId: string, metric: DeliveryMetric) => MetricState
  registerRestaurants: (restaurantIds: string[]) => void
}

export const DeliveryMetricsContext = createContext<DeliveryMetricsContextValue | null>(
  null
)
