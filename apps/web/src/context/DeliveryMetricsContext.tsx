import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useDeliveryWebSocket } from '../hooks/useDeliveryWebSocket'
import { generateRequestId } from '../lib/id'
import type { DeliveryMetric, MetricState, RestaurantSection } from '../types'
import { useDeliveryConditions } from './useDeliveryConditions'
import { useLocation } from './useLocation'
import { DeliveryMetricsContext } from './delivery-metrics-context'

const IDLE_METRIC: MetricState = { status: 'idle' }
const LOADING_METRIC: MetricState = { status: 'loading' }

type RestaurantMetrics = Record<DeliveryMetric, MetricState>

function createEmptyMetrics(): RestaurantMetrics {
  return {
    distance: { ...IDLE_METRIC },
    time: { ...IDLE_METRIC },
  }
}

interface DeliveryMetricsProviderProps {
  children: ReactNode
  sections: RestaurantSection[]
}

export function DeliveryMetricsProvider({
  children,
  sections,
}: DeliveryMetricsProviderProps) {
  const { location } = useLocation()
  const { weather, traffic, timeOfDay, vehicle, model } = useDeliveryConditions()
  const [metricsByRestaurant, setMetricsByRestaurant] = useState<
    Record<string, RestaurantMetrics>
  >({})
  const requestedKeysRef = useRef<Set<string>>(new Set())
  const locationKeyRef = useRef<string | null>(null)
  const conditionsKeyRef = useRef<string | null>(null)
  const connectionVersionRef = useRef(0)

  const handleResult = useCallback(
    (message: {
      requestId: string
      restaurantId: string
      metric: DeliveryMetric
      value: string
    }) => {
      setMetricsByRestaurant((current) => {
        const existing = current[message.restaurantId] ?? createEmptyMetrics()
        return {
          ...current,
          [message.restaurantId]: {
            ...existing,
            [message.metric]: { status: 'ready', value: message.value },
          },
        }
      })
    },
    []
  )

  const { sendCalculate, isConnected, connectionVersion } = useDeliveryWebSocket(handleResult)

  const restaurantIds = useMemo(
    () =>
      sections.flatMap((section) => section.restaurants.map((restaurant) => restaurant.id)),
    [sections]
  )

  const registerRestaurants = useCallback((ids: string[]) => {
    setMetricsByRestaurant((current) => {
      const next = { ...current }
      for (const id of ids) {
        if (!next[id]) {
          next[id] = createEmptyMetrics()
        }
      }
      return next
    })
  }, [])

  useEffect(() => {
    registerRestaurants(restaurantIds)
  }, [restaurantIds, registerRestaurants])

  useEffect(() => {
    if (!location || !isConnected) return

    const locationKey = `${location.lat}:${location.lng}`
    const conditionsKey = `${weather}:${traffic}:${timeOfDay}:${vehicle}:${model}`

    if (locationKeyRef.current !== locationKey) {
      locationKeyRef.current = locationKey
      requestedKeysRef.current.clear()
    }

    if (conditionsKeyRef.current !== conditionsKey) {
      conditionsKeyRef.current = conditionsKey
      requestedKeysRef.current.clear()
    }

    if (connectionVersionRef.current !== connectionVersion) {
      connectionVersionRef.current = connectionVersion
      requestedKeysRef.current.clear()
    }

    for (const restaurantId of restaurantIds) {
      for (const metric of ['distance', 'time'] as DeliveryMetric[]) {
        const requestKey = `${locationKey}:${conditionsKey}:${restaurantId}:${metric}`
        if (requestedKeysRef.current.has(requestKey)) continue

        requestedKeysRef.current.add(requestKey)

        setMetricsByRestaurant((current) => {
          const existing = current[restaurantId] ?? createEmptyMetrics()
          return {
            ...current,
            [restaurantId]: {
              ...existing,
              [metric]: { ...LOADING_METRIC },
            },
          }
        })

        const requestId = generateRequestId()
        const sent = sendCalculate({
          requestId,
          restaurantId,
          metric,
          lat: location.lat,
          lng: location.lng,
          weather,
          traffic,
          timeOfDay,
          vehicle,
          model,
        })

        if (!sent) {
          requestedKeysRef.current.delete(requestKey)
          setMetricsByRestaurant((current) => {
            const existing = current[restaurantId] ?? createEmptyMetrics()
            return {
              ...current,
              [restaurantId]: {
                ...existing,
                [metric]: { status: 'error' },
              },
            }
          })
        }
      }
    }
  }, [
    location,
    restaurantIds,
    sendCalculate,
    isConnected,
    connectionVersion,
    weather,
    traffic,
    timeOfDay,
    vehicle,
    model,
  ])

  const getMetric = useCallback(
    (restaurantId: string, metric: DeliveryMetric): MetricState => {
      return metricsByRestaurant[restaurantId]?.[metric] ?? IDLE_METRIC
    },
    [metricsByRestaurant]
  )

  const value = useMemo(
    () => ({
      getMetric,
      registerRestaurants,
    }),
    [getMetric, registerRestaurants]
  )

  return (
    <DeliveryMetricsContext.Provider value={value}>
      {children}
    </DeliveryMetricsContext.Provider>
  )
}
