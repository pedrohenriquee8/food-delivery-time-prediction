import type { LucideIcon } from "lucide-react";
import {
  HEADER_ICON_WRAP_CLASS,
  HEADER_PILL_CLASS,
} from "../lib/delivery-conditions";

interface ConditionBadgeProps {
  label: string;
  icon: LucideIcon;
  className?: string;
}

export function ConditionBadge({
  label,
  icon: Icon,
  className,
}: ConditionBadgeProps) {
  return (
    <span
      className={`${HEADER_PILL_CLASS} gap-2 px-3 text-sm font-semibold ${className ?? "bg-gray-100 text-gray-800"}`}
    >
      <span className={HEADER_ICON_WRAP_CLASS} aria-hidden="true">
        <Icon className="h-4 w-4" strokeWidth={2.25} />
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}
