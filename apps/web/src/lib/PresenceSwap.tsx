import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PresenceSwapProps {
  showContent: boolean
  fallback: ReactNode
  children: ReactNode
}

export function PresenceSwap({ showContent, fallback, children }: PresenceSwapProps) {
  return (
    <AnimatePresence mode="wait">
      {showContent ? (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          key="fallback"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {fallback}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
