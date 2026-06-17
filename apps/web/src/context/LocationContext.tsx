import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useGeolocation } from '../hooks/useGeolocation'
import { reverseGeocode } from '../lib/geocoding'
import { DEFAULT_MAP_CENTER } from '../lib/location'
import type { UserLocation } from '../types'
import { LocationContext } from './location-context'

export function LocationProvider({ children }: { children: ReactNode }) {
  const { status: geoStatus, error: geoError, requestLocation: requestCoords } =
    useGeolocation()
  const [location, setLocationState] = useState<UserLocation | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogKey, setDialogKey] = useState(0)
  const hasRequestedGeo = useRef(false)

  const isFallback = location === null

  const setLocation = useCallback((next: UserLocation) => {
    setLocationState(next)
  }, [])

  const requestLocation = useCallback(async (): Promise<UserLocation | null> => {
    const coords = await requestCoords()
    if (!coords) return null

    const geocoded = await reverseGeocode(coords.lat, coords.lng)
    const next: UserLocation = {
      lat: coords.lat,
      lng: coords.lng,
      label: geocoded?.label ?? 'Minha localização',
      source: 'gps',
    }

    setLocation(next)
    return next
  }, [requestCoords, setLocation])

  const openDialog = useCallback(() => {
    setDialogKey((current) => current + 1)
    setIsDialogOpen(true)
  }, [])

  const closeDialog = useCallback(() => setIsDialogOpen(false), [])

  useEffect(() => {
    if (hasRequestedGeo.current) return

    hasRequestedGeo.current = true
    void requestLocation()
  }, [requestLocation])

  const value = useMemo(
    () => ({
      location,
      isFallback,
      geoStatus,
      geoError,
      isDialogOpen,
      dialogKey,
      defaultMapCenter: DEFAULT_MAP_CENTER,
      requestLocation,
      setLocation,
      openDialog,
      closeDialog,
    }),
    [
      location,
      isFallback,
      geoStatus,
      geoError,
      isDialogOpen,
      dialogKey,
      requestLocation,
      setLocation,
      openDialog,
      closeDialog,
    ]
  )

  return (
    <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
  )
}
