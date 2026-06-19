import { useCallback, useEffect, useRef, useState } from 'react'
import type { DeliveryMetric } from '../types'
import type {
  ModelType,
  TimeOfDay,
  TrafficLevel,
  VehicleType,
  Weather,
} from '../lib/delivery-conditions'

export interface CalculatePayload {
  requestId: string
  restaurantId: string
  metric: DeliveryMetric
  lat: number
  lng: number
  weather: Weather
  traffic: TrafficLevel
  timeOfDay: TimeOfDay
  vehicle: VehicleType
  model: ModelType
}

export interface DeliveryResultMessage {
  type: 'result'
  requestId: string
  restaurantId: string
  metric: DeliveryMetric
  value: string
}

type MessageHandler = (message: DeliveryResultMessage) => void

function getWebSocketUrl(): string {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${protocol}//${window.location.host}/ws/delivery`
}

export function useDeliveryWebSocket(onResult: MessageHandler) {
  const wsRef = useRef<WebSocket | null>(null)
  const onResultRef = useRef(onResult)
  const reconnectTimeoutRef = useRef<number | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionVersion, setConnectionVersion] = useState(0)

  useEffect(() => {
    onResultRef.current = onResult
  }, [onResult])

  useEffect(() => {
    let disposed = false

    const connect = () => {
      if (disposed) return

      const ws = new WebSocket(getWebSocketUrl())
      wsRef.current = ws

      ws.onopen = () => {
        if (disposed) return
        setIsConnected(true)
        setConnectionVersion((current) => current + 1)
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string) as { type: string }
          if (data.type === 'result') {
            onResultRef.current(data as DeliveryResultMessage)
          }
        } catch {
          // ignore malformed messages
        }
      }

      ws.onclose = () => {
        setIsConnected(false)
        if (disposed) return
        reconnectTimeoutRef.current = window.setTimeout(connect, 2000)
      }
    }

    connect()

    return () => {
      disposed = true
      setIsConnected(false)
      if (reconnectTimeoutRef.current !== null) {
        window.clearTimeout(reconnectTimeoutRef.current)
      }
      wsRef.current?.close()
      wsRef.current = null
    }
  }, [])

  const sendCalculate = useCallback((payload: CalculatePayload) => {
    const ws = wsRef.current
    if (!ws || ws.readyState !== WebSocket.OPEN) return false

    ws.send(
      JSON.stringify({
        type: 'calculate',
        ...payload,
      })
    )
    return true
  }, [])

  return { sendCalculate, isConnected, connectionVersion }
}
