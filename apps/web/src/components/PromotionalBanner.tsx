import { motion } from 'framer-motion'
import type { Banner } from '../types'

interface PromotionalBannerProps {
  banner: Banner
}

export function PromotionalBanner({ banner }: PromotionalBannerProps) {
  const isPink = banner.variant === 'pink'

  return (
    <div
      className={`relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl lg:flex-row ${
        isPink ? 'bg-pink-100' : 'bg-cyan-100'
      }`}
    >
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col justify-center gap-1 overflow-hidden p-4 sm:gap-1.5 sm:p-5 lg:w-1/2 lg:p-5 xl:gap-1.5 xl:p-5">
        {banner.badge && (
          <span className="inline-flex w-fit shrink-0 items-center rounded-md bg-teal px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white sm:text-xs">
            {banner.badge}
          </span>
        )}
        <h3 className="text-sm font-bold leading-snug text-gray-900 sm:text-base xl:text-base">
          {banner.title}
        </h3>
        {banner.subtitle && (
          <p className="line-clamp-2 text-xs leading-snug text-gray-700 sm:text-sm">{banner.subtitle}</p>
        )}
        {banner.code && (
          <p className="text-[11px] font-medium text-gray-600 sm:text-xs">
            Código: <span className="font-bold text-gray-900">{banner.code}</span>
          </p>
        )}
        <motion.button
          type="button"
          className={`mt-0.5 w-fit shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 sm:mt-1 xl:px-5 xl:py-2 xl:text-sm ${
            isPink ? 'bg-primary' : 'bg-teal-dark'
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {banner.ctaLabel}
        </motion.button>
      </div>

      <div className="relative hidden h-full min-h-0 w-full min-w-0 shrink-0 lg:block lg:w-1/2">
        <img
          src={banner.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className={`absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r ${
            isPink ? 'from-pink-100' : 'from-cyan-100'
          } to-transparent`}
        />
      </div>
    </div>
  )
}
