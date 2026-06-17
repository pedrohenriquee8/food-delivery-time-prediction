import { Crown, Star, Tag } from 'lucide-react'
import type { Filter } from '../types'

export const FILTER_CHIP_HEIGHT = 38

export const FILTER_BAR_CLASS =
  'scrollbar-hide flex min-h-[46px] gap-2 overflow-x-auto py-1.5'

export const filters: Filter[] = [
  {
    id: 'delivery-fee',
    label: 'Taxa de entrega: até R$ 10',
    hasDropdown: true,
  },
  { id: 'deals', label: 'Ofertas', icon: Tag },
  { id: 'pickup', label: 'Retirada' },
  {
    id: 'rating',
    label: 'Acima de 4,5',
    icon: Star,
    hasDropdown: true,
  },
  { id: 'time', label: 'Até 30 min' },
  { id: 'price', label: 'Preço', hasDropdown: true },
  { id: 'subscription', label: 'Assinatura', icon: Crown },
]
