import { useCallback, useEffect, useState } from 'react'
import { Loader2, MapPin, X } from 'lucide-react'
import { useDeliveryConditions } from '../context/useDeliveryConditions'
import { useLocation } from '../context/useLocation'
import { fetchRestaurantSections } from '../lib/api'
import { reverseGeocode } from '../lib/geocoding'
import { getRestaurantColor } from '../lib/restaurantColors'
import {
  MODEL_ICONS,
  MODEL_LABELS,
  MODEL_VALUES,
  TIME_OF_DAY_ICONS,
  TIME_OF_DAY_LABELS,
  TIME_OF_DAY_VALUES,
  TRAFFIC_ICONS,
  TRAFFIC_LABELS,
  TRAFFIC_VALUES,
  VEHICLE_ICONS,
  VEHICLE_LABELS,
  VEHICLE_VALUES,
  WEATHER_ICONS,
  WEATHER_LABELS,
  WEATHER_VALUES,
  type ModelType,
  type TimeOfDay,
  type TrafficLevel,
  type VehicleType,
  type Weather,
} from '../lib/delivery-conditions'
import type { GeolocationStatus, Restaurant, UserLocation } from '../types'
import { LocationMap, type RestaurantMapPoint } from './LocationMap'
import { OptionGroup } from './OptionGroup'

interface DeliveryConditionsDraft {
  weather: Weather
  traffic: TrafficLevel
  timeOfDay: TimeOfDay
  vehicle: VehicleType
  model: ModelType
}

interface OptionsDialogContentProps {
  initialConditions: DeliveryConditionsDraft
  initialLocation: UserLocation | null
  defaultMapCenter: { lat: number; lng: number }
  restaurants: RestaurantMapPoint[]
  onClose: () => void
  onConfirm: (conditions: DeliveryConditionsDraft, location: UserLocation) => void
  onUseMyLocation: () => Promise<UserLocation | null>
  geoStatus: GeolocationStatus
}

function OptionsDialogContent({
  initialConditions,
  initialLocation,
  defaultMapCenter,
  restaurants,
  onClose,
  onConfirm,
  onUseMyLocation,
  geoStatus,
}: OptionsDialogContentProps) {
  const initialPosition = initialLocation ?? defaultMapCenter
  const [weather, setWeather] = useState(initialConditions.weather)
  const [traffic, setTraffic] = useState(initialConditions.traffic)
  const [timeOfDay, setTimeOfDay] = useState(initialConditions.timeOfDay)
  const [vehicle, setVehicle] = useState(initialConditions.vehicle)
  const [model, setModel] = useState(initialConditions.model)
  const [isGeocoding, setIsGeocoding] = useState(false)
  const [draftLabel, setDraftLabel] = useState(initialLocation?.label ?? '')
  const [draftPosition, setDraftPosition] = useState(initialPosition)
  const [mapCenter, setMapCenter] = useState(initialPosition)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handlePositionChange = useCallback(
    async (position: { lat: number; lng: number }) => {
      setDraftPosition(position)
      setMapCenter(position)
      setIsGeocoding(true)

      const geocoded = await reverseGeocode(position.lat, position.lng)
      if (geocoded) {
        setDraftLabel(geocoded.label)
      }

      setIsGeocoding(false)
    },
    []
  )

  const handleUseMyLocation = useCallback(async () => {
    const result = await onUseMyLocation()
    if (result) {
      setDraftPosition({ lat: result.lat, lng: result.lng })
      setMapCenter({ lat: result.lat, lng: result.lng })
      setDraftLabel(result.label)
    }
  }, [onUseMyLocation])

  const handleConfirm = useCallback(() => {
    onConfirm(
      { weather, traffic, timeOfDay, vehicle, model },
      {
        lat: draftPosition.lat,
        lng: draftPosition.lng,
        label: draftLabel || 'Endereço selecionado',
        source: 'manual',
      }
    )
  }, [weather, traffic, timeOfDay, vehicle, model, draftPosition, draftLabel, onConfirm])

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="options-dialog-title"
        className="flex max-h-[90vh] w-full max-w-xl flex-col rounded-2xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 id="options-dialog-title" className="text-lg font-semibold text-gray-900">
            Opções de entrega
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto p-5">
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Condições</h3>
            <OptionGroup
              label="Clima"
              value={weather}
              onChange={setWeather}
              options={WEATHER_VALUES.map((value) => ({
                value,
                label: WEATHER_LABELS[value],
                icon: WEATHER_ICONS[value],
              }))}
            />
            <OptionGroup
              label="Tráfego"
              value={traffic}
              onChange={setTraffic}
              options={TRAFFIC_VALUES.map((value) => ({
                value,
                label: TRAFFIC_LABELS[value],
                icon: TRAFFIC_ICONS[value],
              }))}
            />
            <OptionGroup
              label="Horário"
              value={timeOfDay}
              onChange={setTimeOfDay}
              options={TIME_OF_DAY_VALUES.map((value) => ({
                value,
                label: TIME_OF_DAY_LABELS[value],
                icon: TIME_OF_DAY_ICONS[value],
              }))}
            />
            <OptionGroup
              label="Veículo"
              value={vehicle}
              onChange={setVehicle}
              options={VEHICLE_VALUES.map((value) => ({
                value,
                label: VEHICLE_LABELS[value],
                icon: VEHICLE_ICONS[value],
              }))}
            />
            <OptionGroup
              label="Modelo de IA"
              value={model}
              onChange={setModel}
              options={MODEL_VALUES.map((value) => ({
                value,
                label: MODEL_LABELS[value],
                icon: MODEL_ICONS[value],
              }))}
            />
          </section>

          <section className="space-y-4 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900">Endereço de entrega</h3>

            <LocationMap
              center={mapCenter}
              markerPosition={draftPosition}
              onPositionChange={handlePositionChange}
              restaurants={restaurants}
            />

            {restaurants.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500">Restaurantes no mapa</p>
                <ul className="grid max-h-28 grid-cols-2 gap-x-3 gap-y-1.5 overflow-y-auto">
                  {restaurants.map((restaurant) => (
                    <li key={restaurant.id} className="flex min-w-0 items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: getRestaurantColor(restaurant.id) }}
                      />
                      <span className="truncate text-xs text-gray-700">{restaurant.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-start gap-2 rounded-xl bg-gray-50 px-3 py-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                {isGeocoding ? (
                  <p className="text-sm text-gray-500">Carregando endereço...</p>
                ) : (
                  <p className="truncate text-sm font-medium text-gray-900">
                    {draftLabel || 'Clique no mapa para selecionar o endereço'}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={geoStatus === 'loading'}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-gray-200 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              {geoStatus === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
              Usar minha localização
            </button>
          </section>
        </div>

        <div className="flex shrink-0 gap-3 border-t border-gray-200 p-5">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-full border border-gray-200 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="h-11 flex-1 rounded-full bg-primary text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

export function OptionsDialog() {
  const {
    weather,
    traffic,
    timeOfDay,
    vehicle,
    model,
    setWeather,
    setTraffic,
    setTimeOfDay,
    setVehicle,
    setModel,
  } = useDeliveryConditions()
  const {
    isDialogOpen,
    dialogKey,
    closeDialog,
    location,
    defaultMapCenter,
    setLocation,
    requestLocation,
    geoStatus,
  } = useLocation()
  const [restaurants, setRestaurants] = useState<RestaurantMapPoint[]>([])

  useEffect(() => {
    if (!isDialogOpen) return

    let cancelled = false

    void fetchRestaurantSections().then((sections) => {
      if (cancelled) return

      const byId = new Map<string, Restaurant>()
      for (const section of sections) {
        for (const restaurant of section.restaurants) {
          byId.set(restaurant.id, restaurant)
        }
      }

      setRestaurants(
        [...byId.values()].map((restaurant) => ({
          id: restaurant.id,
          name: restaurant.name,
          lat: restaurant.lat,
          lng: restaurant.lng,
        }))
      )
    })

    return () => {
      cancelled = true
    }
  }, [isDialogOpen])

  const handleConfirm = useCallback(
    (conditions: DeliveryConditionsDraft, nextLocation: UserLocation) => {
      setWeather(conditions.weather)
      setTraffic(conditions.traffic)
      setTimeOfDay(conditions.timeOfDay)
      setVehicle(conditions.vehicle)
      setModel(conditions.model)
      setLocation(nextLocation)
      closeDialog()
    },
    [
      setWeather,
      setTraffic,
      setTimeOfDay,
      setVehicle,
      setModel,
      setLocation,
      closeDialog,
    ]
  )

  if (!isDialogOpen) return null

  return (
    <OptionsDialogContent
      key={dialogKey}
      initialConditions={{ weather, traffic, timeOfDay, vehicle, model }}
      initialLocation={location}
      defaultMapCenter={defaultMapCenter}
      restaurants={restaurants}
      onClose={closeDialog}
      onConfirm={handleConfirm}
      onUseMyLocation={requestLocation}
      geoStatus={geoStatus}
    />
  )
}
