import { useState } from 'react'
import { resolveFilterIcon } from '../lib/filterIcons'
import type { ApiFilter } from '../types'
import { FilterChip } from './FilterChip'

export const FILTER_CHIP_HEIGHT = 38

export const FILTER_BAR_CLASS =
  'scrollbar-hide flex min-h-[46px] gap-2 overflow-x-auto py-1.5'

interface FilterBarProps {
  filters: ApiFilter[]
}

export function FilterBar({ filters }: FilterBarProps) {
  const [selectedFilterId, setSelectedFilterId] = useState<string | null>(null)

  const handleFilterClick = (id: string) => {
    setSelectedFilterId((current) => (current === id ? null : id))
  }

  return (
    <div className={FILTER_BAR_CLASS}>
      {filters.map((filter) => (
        <FilterChip
          key={filter.id}
          label={filter.label}
          icon={resolveFilterIcon(filter.icon)}
          hasDropdown={filter.hasDropdown}
          selected={selectedFilterId === filter.id}
          onClick={() => handleFilterClick(filter.id)}
        />
      ))}
    </div>
  )
}
