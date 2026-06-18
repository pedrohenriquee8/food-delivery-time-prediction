import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { ChevronDown } from 'lucide-react'

interface FilterChipProps {
  label: string
  icon?: LucideIcon
  hasDropdown?: boolean
  selected?: boolean
  onClick?: () => void
}

export function FilterChip({
  label,
  icon: Icon,
  hasDropdown,
  selected,
  onClick,
}: FilterChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium ${
        selected
          ? 'border-primary bg-primary-light text-primary'
          : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50'
      }`}
      animate={{ scale: selected ? 1.03 : 1 }}
      whileHover={{ scale: selected ? 1.03 : 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
      {hasDropdown && <ChevronDown className="h-4 w-4 text-gray-500" />}
    </motion.button>
  )
}
