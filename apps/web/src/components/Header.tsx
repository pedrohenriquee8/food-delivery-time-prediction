import { SlidersHorizontal, UtensilsCrossed } from "lucide-react";
import { useLocation } from "../context/useLocation";
import { HEADER_PILL_CLASS } from "../lib/delivery-conditions";
import { OptionsDialog } from "./OptionsDialog";

export function Header() {
  const { openDialog } = useLocation();

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex h-16 items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 lg:px-6">
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <UtensilsCrossed className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="hidden text-xl font-bold tracking-tight text-primary sm:block">
            FoodDash
          </span>
        </div>

        <button
          type="button"
          onClick={openDialog}
          className={`${HEADER_PILL_CLASS} gap-2 bg-gray-100 px-4 text-sm font-semibold text-gray-900 hover:bg-gray-200`}
        >
          <SlidersHorizontal className="h-4 w-4 shrink-0" strokeWidth={2.25} />
          <span>Opções</span>
        </button>
      </header>

      <OptionsDialog />
    </>
  );
}
