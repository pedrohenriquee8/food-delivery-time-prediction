import { createContext } from 'react'
import type { GeolocationStatus, UserLocation } from '../types'

export interface LocationContextValue {
  location: UserLocation | null
  isFallback: boolean
  geoStatus: GeolocationStatus
  geoError: string | null
  isDialogOpen: boolean
  dialogKey: number
  defaultMapCenter: { lat: number; lng: number }
  requestLocation: () => Promise<UserLocation | null>
  setLocation: (location: UserLocation) => void
  openDialog: () => void
  closeDialog: () => void
}

export const LocationContext = createContext<LocationContextValue | null>(null)
