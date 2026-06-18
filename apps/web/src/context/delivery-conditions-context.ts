import { createContext } from 'react'
import type {
  TimeOfDay,
  TrafficLevel,
  VehicleType,
  Weather,
} from '../lib/delivery-conditions'

export interface DeliveryConditionsContextValue {
  weather: Weather
  traffic: TrafficLevel
  timeOfDay: TimeOfDay
  vehicle: VehicleType
  setWeather: (weather: Weather) => void
  setTraffic: (traffic: TrafficLevel) => void
  setTimeOfDay: (timeOfDay: TimeOfDay) => void
  setVehicle: (vehicle: VehicleType) => void
}

export const DeliveryConditionsContext =
  createContext<DeliveryConditionsContextValue | null>(null)
