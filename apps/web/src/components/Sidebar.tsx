import { motion } from 'framer-motion'
import {
  LayoutGrid,
  Moon,
  Package,
  PawPrint,
  ShoppingBag,
  ShoppingBasket,
  Sparkles,
  Store,
  Wine,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface SidebarItem {
  id: string
  label: string
  icon: LucideIcon
  active?: boolean
}

const mainNavItems: SidebarItem[] = [
  { id: 'browse-all', label: 'Ver tudo', icon: LayoutGrid, active: true },
  { id: 'grocery', label: 'Mercado', icon: ShoppingBasket },
  { id: 'retail', label: 'Varejo', icon: Store },
  { id: 'convenience', label: 'Conveniência', icon: ShoppingBag },
  { id: 'drinks', label: 'Bebidas', icon: Wine },
  { id: 'events', label: 'Eventos', icon: Package },
  { id: 'late-night', label: 'Madrugada', icon: Moon },
  { id: 'quick-store', label: 'Loja rápida', icon: Zap },
  { id: 'beauty', label: 'Beleza', icon: Sparkles },
  { id: 'pets', label: 'Pets', icon: PawPrint },
]

function NavLink({ item }: { item: SidebarItem }) {
  const Icon = item.icon

  return (
    <motion.button
      type="button"
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium ${
        item.active
          ? 'bg-primary-light text-primary'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Icon className="h-5 w-5 shrink-0" strokeWidth={item.active ? 2.5 : 2} />
      <span className="truncate">{item.label}</span>
    </motion.button>
  )
}

export function Sidebar() {
  return (
    <aside className="fixed top-16 left-0 z-40 hidden h-[calc(100vh-4rem)] w-[220px] flex-col border-r border-gray-200 bg-white lg:flex">
      <nav className="flex flex-1 flex-col overflow-x-clip overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5 py-0.5">
          {mainNavItems.map((item) => (
            <li key={item.id}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
