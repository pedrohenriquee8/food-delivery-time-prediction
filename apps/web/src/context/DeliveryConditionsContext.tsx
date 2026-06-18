import { useState, type ReactNode } from 'react'
import {
  getTimeOfDayFromDate,
  pickRandom,
  TRAFFIC_VALUES,
  WEATHER_VALUES,
  type VehicleType,
} from '../lib/delivery-conditions'
import { DeliveryConditionsContext } from './delivery-conditions-context'

export function DeliveryConditionsProvider({
  children,
}: {
  children: ReactNode
}) {
  const [weather, setWeather] = useState(() => pickRandom(WEATHER_VALUES))
  const [traffic, setTraffic] = useState(() => pickRandom(TRAFFIC_VALUES))
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
