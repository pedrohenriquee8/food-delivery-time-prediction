import { motion } from 'framer-motion'
import type { Category } from '../types'

interface CategoryItemProps {
  category: Category
  selected?: boolean
  onClick?: () => void
}

export function CategoryItem({ category, selected, onClick }: CategoryItemProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`group flex w-20 shrink-0 flex-col items-center gap-2 rounded-xl border-2 p-2 transition-colors ${
        selected
          ? 'border-primary bg-primary-light'
          : 'border-transparent hover:bg-gray-50'
      }`}
      whileHover={{ scale: selected ? 1.03 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      aria-pressed={selected}
    >
      <motion.span
        className="text-4xl leading-none"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {category.icon}
      </motion.span>
      <span
        className={`w-full truncate text-center text-xs font-medium ${
          selected ? 'text-primary' : 'text-gray-800'
        }`}
      >
        {category.name}
      </span>
    </motion.button>
  )
}
