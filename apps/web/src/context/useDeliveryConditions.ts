import { useContext } from 'react'
import { DeliveryConditionsContext } from './delivery-conditions-context'

export function useDeliveryConditions() {
  const context = useContext(DeliveryConditionsContext)
  if (!context) {
    throw new Error(
      'useDeliveryConditions must be used within DeliveryConditionsProvider',
    )
  }
  return context
}
