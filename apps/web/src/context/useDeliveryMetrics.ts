import { useContext } from 'react'
import type { MetricState } from '../types'
import { DeliveryMetricsContext } from './delivery-metrics-context'

export interface RestaurantMetrics {
  distance: MetricState
  time: MetricState
}

export function useDeliveryMetrics(): import('./delivery-metrics-context').DeliveryMetricsContextValue
export function useDeliveryMetrics(restaurantId: string): RestaurantMetrics
export function useDeliveryMetrics(restaurantId?: string) {
  const context = useContext(DeliveryMetricsContext)
  if (!context) {
    throw new Error('useDeliveryMetrics must be used within DeliveryMetricsProvider')
  }

  if (!restaurantId) {
    return context
  }

  return {
    distance: context.getMetric(restaurantId, 'distance'),
    time: context.getMetric(restaurantId, 'time'),
  }
}
