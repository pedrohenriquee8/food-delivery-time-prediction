import { useState } from 'react'
import { filters, FILTER_BAR_CLASS } from '../data/filters'
import { FilterChip } from './FilterChip'

export function FilterBar() {
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
          icon={filter.icon}
          hasDropdown={filter.hasDropdown}
          selected={selectedFilterId === filter.id}
          onClick={() => handleFilterClick(filter.id)}
        />
      ))}
    </div>
  )
}
