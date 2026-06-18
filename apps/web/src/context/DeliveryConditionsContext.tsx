import { useState, type ReactNode } from 'react'
import {
  getTimeOfDayFromDate,
  type VehicleType,
} from '../lib/delivery-conditions'
import { DeliveryConditionsContext } from './delivery-conditions-context'

export function DeliveryConditionsProvider({
  children,
}: {
  children: ReactNode
}) {
  const [weather, setWeather] = useState<'Clear' | 'Rainy' | 'Foggy' | 'Windy' | 'Snowy'>('Clear')
  const [traffic, setTraffic] = useState<'Low' | 'Medium' | 'High'>('Medium')
  const [timeOfDay, setTimeOfDay] = useState(() => getTimeOfDayFromDate())
  const [vehicle, setVehicle] = useState<VehicleType>('Bike')

  return (
    <DeliveryConditionsContext.Provider
      value={{
        weather,
        traffic,
        timeOfDay,
        vehicle,
        setWeather,
        setTraffic,
        setTimeOfDay,
        setVehicle,
      }}
    >
      {children}
    </DeliveryConditionsContext.Provider>
  )
}
