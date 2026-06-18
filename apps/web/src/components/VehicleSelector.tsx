import { motion } from "framer-motion";
import {
  HEADER_ICON_WRAP_CLASS,
  HEADER_PILL_CLASS,
  VEHICLE_ICONS,
  VEHICLE_LABELS,
  VEHICLE_SELECTED_STYLES,
  VEHICLE_VALUES,
  type VehicleType,
} from "../lib/delivery-conditions";

interface VehicleSelectorProps {
  value: VehicleType;
  onChange: (vehicle: VehicleType) => void;
}

export function VehicleSelector({ value, onChange }: VehicleSelectorProps) {
  return (
    <div
      className={`${HEADER_PILL_CLASS} gap-1 bg-gray-100 px-1`}
      role="group"
      aria-label="Tipo de veículo"
    >
      {VEHICLE_VALUES.map((vehicle) => {
        const Icon = VEHICLE_ICONS[vehicle];
        const selected = value === vehicle;

        return (
          <motion.button
            key={vehicle}
            type="button"
            onClick={() => onChange(vehicle)}
            aria-label={VEHICLE_LABELS[vehicle]}
            aria-pressed={selected}
            className={`${HEADER_PILL_CLASS} gap-1.5 px-2.5 text-sm font-semibold sm:px-3 ${
              selected
                ? VEHICLE_SELECTED_STYLES[vehicle]
                : "text-gray-700 hover:bg-white hover:text-gray-900"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <span className={HEADER_ICON_WRAP_CLASS} aria-hidden="true">
              <Icon className="h-4 w-4" strokeWidth={2.25} />
            </span>
            <span className="hidden whitespace-nowrap sm:inline">
              {VEHICLE_LABELS[vehicle]}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
