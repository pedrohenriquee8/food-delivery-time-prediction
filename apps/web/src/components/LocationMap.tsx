import { useEffect } from 'react'
import L from 'leaflet'
import {
  CircleMarker,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { getRestaurantColor } from '../lib/restaurantColors'

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

export interface RestaurantMapPoint {
  id: string
  name: string
  lat: number
  lng: number
}

interface LocationMapProps {
  center: { lat: number; lng: number }
  markerPosition: { lat: number; lng: number }
  onPositionChange: (position: { lat: number; lng: number }) => void
  restaurants?: RestaurantMapPoint[]
}

function MapViewSync({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap()

  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom())
  }, [center.lat, center.lng, map])

  return null
}

function MapClickHandler({
  onPositionChange,
}: {
  onPositionChange: (position: { lat: number; lng: number }) => void
}) {
  useMapEvents({
    click(event) {
      onPositionChange({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      })
    },
  })

  return null
}

export function LocationMap({
  center,
  markerPosition,
  onPositionChange,
  restaurants = [],
}: LocationMapProps) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={15}
      className="h-[300px] w-full rounded-xl"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapViewSync center={center} />
      <MapClickHandler onPositionChange={onPositionChange} />
      {restaurants.map((restaurant) => (
        <CircleMarker
          key={restaurant.id}
          center={[restaurant.lat, restaurant.lng]}
          radius={7}
          pathOptions={{
            color: '#ffffff',
            weight: 2,
            fillColor: getRestaurantColor(restaurant.id),
            fillOpacity: 1,
          }}
        >
          <Tooltip direction="top" offset={[0, -6]} opacity={0.95}>
            {restaurant.name}
          </Tooltip>
        </CircleMarker>
      ))}
      <Marker
        position={[markerPosition.lat, markerPosition.lng]}
        draggable
        zIndexOffset={1000}
        eventHandlers={{
          dragend: (event) => {
            const marker = event.target
            const position = marker.getLatLng()
            onPositionChange({
              lat: position.lat,
              lng: position.lng,
            })
          },
        }}
      >
        <Tooltip direction="top" offset={[0, -32]} opacity={0.95} permanent>
          Você
        </Tooltip>
      </Marker>
    </MapContainer>
  )
}
