import { useCallback, useEffect, useRef, useState } from 'react'

export function useHorizontalScroll(step = 320) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const element = scrollRef.current
    if (!element) return

    setCanScrollLeft(element.scrollLeft > 0)
    setCanScrollRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    updateScrollState()

    element.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)

    const observer = new ResizeObserver(updateScrollState)
    observer.observe(element)

    return () => {
      element.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
      observer.disconnect()
    }
  }, [updateScrollState])

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      const amount = direction === 'left' ? -step : step
      scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
    },
    [step]
  )

  return { scrollRef, canScrollLeft, canScrollRight, scroll }
}
