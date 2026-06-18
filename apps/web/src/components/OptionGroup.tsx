import type { LucideIcon } from 'lucide-react'

interface Option<T extends string> {
  value: T
  label: string
  icon: LucideIcon
}

interface OptionGroupProps<T extends string> {
  label: string
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
}

export function OptionGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: OptionGroupProps<T>) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-gray-700">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option.value
          const Icon = option.icon

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={selected}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                selected
                  ? 'border-primary bg-primary-light text-primary'
                  : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={2.25} />
              <span>{option.label}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
