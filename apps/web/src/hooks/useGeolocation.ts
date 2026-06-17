import { useCallback, useState } from 'react'
import type { GeolocationStatus } from '../types'

interface GeolocationCoords {
  lat: number
  lng: number
}

interface UseGeolocationResult {
  status: GeolocationStatus
  error: string | null
  requestLocation: () => Promise<GeolocationCoords | null>
}

export function useGeolocation(): UseGeolocationResult {
  const [status, setStatus] = useState<GeolocationStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const requestLocation = useCallback((): Promise<GeolocationCoords | null> => {
    if (!navigator.geolocation) {
      setStatus('unsupported')
      setError('Geolocalização não suportada neste dispositivo')
      return Promise.resolve(null)
    }

    setStatus('loading')
    setError(null)

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus('granted')
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (geoError) => {
          if (geoError.code === geoError.PERMISSION_DENIED) {
            setStatus('denied')
            setError('Permissão de localização negada')
          } else {
            setStatus('error')
            setError('Não foi possível obter a localização')
          }
          resolve(null)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      )
    })
  }, [])

  return { status, error, requestLocation }
}
