import { Crown, Star, Tag } from 'lucide-react'
import type { FilterIconSlug } from '../types'

export function resolveFilterIcon(icon?: FilterIconSlug) {
  if (icon === 'tag') return Tag
  if (icon === 'star') return Star
  if (icon === 'crown') return Crown
  return undefined
}
