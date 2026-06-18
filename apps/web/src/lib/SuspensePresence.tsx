import { Suspense, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface SuspensePresenceProps {
  fallback: ReactNode
  children: ReactNode
  overlay?: boolean
}

export function SuspensePresence({
  fallback,
  children,
  overlay = true,
}: SuspensePresenceProps) {
  return (
    <Suspense
      fallback={
        overlay ? (
          fallback
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="suspense-fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {fallback}
            </motion.div>
          </AnimatePresence>
        )
      }
    >
      {children}
    </Suspense>
  )
}
