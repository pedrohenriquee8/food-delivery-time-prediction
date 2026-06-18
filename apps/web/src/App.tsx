import { lazy } from "react";
import { DeliveryConditionsProvider } from "./context/DeliveryConditionsContext";
import { LocationProvider } from "./context/LocationContext";
import { HomePage } from "./pages/HomePage";
import { HeaderSkeleton } from "./components/skeletons/HeaderSkeleton";
import { SidebarSkeleton } from "./components/skeletons/SidebarSkeleton";
import { SuspensePresence } from "./lib/SuspensePresence";

const LazyHeader = lazy(() =>
  import("./components/Header").then((module) => ({ default: module.Header })),
);

const LazySidebar = lazy(() =>
  import("./components/Sidebar").then((module) => ({
    default: module.Sidebar,
  })),
);

function App() {
  return (
    <DeliveryConditionsProvider>
      <LocationProvider>
        <div className="min-h-screen min-w-0 bg-white">
          <SuspensePresence fallback={<HeaderSkeleton />} overlay={false}>
            <LazyHeader />
          </SuspensePresence>

          <SuspensePresence fallback={<SidebarSkeleton />} overlay={false}>
            <LazySidebar />
          </SuspensePresence>

          <main className="min-h-screen min-w-0 overflow-x-clip pt-16 lg:ml-[220px]">
            <HomePage />
          </main>
        </div>
      </LocationProvider>
    </DeliveryConditionsProvider>
  );
}

export default App;
