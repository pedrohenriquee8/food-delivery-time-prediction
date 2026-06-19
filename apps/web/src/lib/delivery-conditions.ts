import type { LucideIcon } from 'lucide-react'
import {
  Bike,
  BrainCircuit,
  Car,
  CloudFog,
  CloudRain,
  GitMerge,
  Moon,
  SignalHigh,
  SignalLow,
  SignalMedium,
  Snowflake,
  Sun,
  Sunrise,
  Sunset,
  Trees,
  Wind,
  Zap,
} from 'lucide-react'

export type Weather = 'Clear' | 'Rainy' | 'Foggy' | 'Windy' | 'Snowy'
export type TrafficLevel = 'Low' | 'Medium' | 'High'
export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening' | 'Night'
export type VehicleType = 'Bike' | 'Scooter' | 'Car'
export type ModelType = 'linear' | 'random_forest' | 'gradient_boosting'

export const HEADER_PILL_CLASS =
  'flex h-11 shrink-0 items-center rounded-full outline-none transition-colors'

export const HEADER_ICON_WRAP_CLASS =
  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/45'

export const WEATHER_VALUES: Weather[] = [
  'Clear',
  'Rainy',
  'Foggy',
  'Windy',
  'Snowy',
]

export const TRAFFIC_VALUES: TrafficLevel[] = ['Low', 'Medium', 'High']

export const TIME_OF_DAY_VALUES: TimeOfDay[] = [
  'Morning',
  'Afternoon',
  'Evening',
  'Night',
]

export const VEHICLE_VALUES: VehicleType[] = ['Bike', 'Scooter', 'Car']

export const MODEL_VALUES: ModelType[] = ['linear', 'random_forest', 'gradient_boosting']

export function pickRandom<T>(values: readonly T[]): T {
  return values[Math.floor(Math.random() * values.length)]!
}

export function getTimeOfDayFromDate(date: Date = new Date()): TimeOfDay {
  const hour = date.getHours()

  if (hour >= 5 && hour < 12) return 'Morning'
  if (hour >= 12 && hour < 17) return 'Afternoon'
  if (hour >= 17 && hour < 22) return 'Evening'
  return 'Night'
}

export const WEATHER_LABELS: Record<Weather, string> = {
  Clear: 'Ensolarado',
  Rainy: 'Chuva',
  Foggy: 'Neblina',
  Windy: 'Ventoso',
  Snowy: 'Neve',
}

export const TRAFFIC_LABELS: Record<TrafficLevel, string> = {
  Low: 'Tráfego leve',
  Medium: 'Tráfego moderado',
  High: 'Tráfego intenso',
}

export const TIME_OF_DAY_LABELS: Record<TimeOfDay, string> = {
  Morning: 'Manhã',
  Afternoon: 'Tarde',
  Evening: 'Noite',
  Night: 'Madrugada',
}

export const VEHICLE_LABELS: Record<VehicleType, string> = {
  Bike: 'Bicicleta',
  Scooter: 'Scooter',
  Car: 'Carro',
}

export const WEATHER_ICONS: Record<Weather, LucideIcon> = {
  Clear: Sun,
  Rainy: CloudRain,
  Foggy: CloudFog,
  Windy: Wind,
  Snowy: Snowflake,
}

export const TRAFFIC_ICONS: Record<TrafficLevel, LucideIcon> = {
  Low: SignalLow,
  Medium: SignalMedium,
  High: SignalHigh,
}

export const TIME_OF_DAY_ICONS: Record<TimeOfDay, LucideIcon> = {
  Morning: Sunrise,
  Afternoon: Sun,
  Evening: Sunset,
  Night: Moon,
}

export const VEHICLE_ICONS: Record<VehicleType, LucideIcon> = {
  Bike,
  Scooter: Zap,
  Car,
}

export const MODEL_LABELS: Record<ModelType, string> = {
  linear: 'Regressão Linear',
  random_forest: 'Random Forest',
  gradient_boosting: 'Gradient Boosting',
}

export const MODEL_ICONS: Record<ModelType, LucideIcon> = {
  linear: BrainCircuit,
  random_forest: Trees,
  gradient_boosting: GitMerge,
}

export const WEATHER_STYLES: Record<Weather, string> = {
  Clear: 'bg-amber-100 text-amber-900',
  Rainy: 'bg-sky-200 text-sky-900',
  Foggy: 'bg-slate-200 text-slate-800',
  Windy: 'bg-cyan-100 text-cyan-900',
  Snowy: 'bg-indigo-100 text-indigo-900',
}

export const TRAFFIC_STYLES: Record<TrafficLevel, string> = {
  Low: 'bg-emerald-100 text-emerald-900',
  Medium: 'bg-orange-100 text-orange-900',
  High: 'bg-red-100 text-red-900',
}

export const TIME_OF_DAY_STYLES: Record<TimeOfDay, string> = {
  Morning: 'bg-yellow-100 text-yellow-900',
  Afternoon: 'bg-lime-100 text-lime-900',
  Evening: 'bg-violet-200 text-violet-900',
  Night: 'bg-indigo-200 text-indigo-900',
}

export const VEHICLE_SELECTED_STYLES: Record<VehicleType, string> = {
  Bike: 'bg-emerald-100 text-emerald-900',
  Scooter: 'bg-orange-100 text-orange-900',
  Car: 'bg-blue-100 text-blue-900',
}
