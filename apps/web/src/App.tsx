import { Suspense } from 'react'
import { HeaderSkeleton } from './components/skeletons/HeaderSkeleton'
import { SidebarSkeleton } from './components/skeletons/SidebarSkeleton'
import { LocationProvider } from './context/LocationContext'
import { HomePage } from './pages/HomePage'
import { lazyWithDelay } from './lib/lazyWithDelay'

const LazyHeader = lazyWithDelay(
  () => import('./components/Header'),
  'Header'
)

const LazySidebar = lazyWithDelay(
  () => import('./components/Sidebar'),
  'Sidebar'
)

function App() {
  return (
    <LocationProvider>
      <div className="min-h-screen bg-white">
        <Suspense fallback={<HeaderSkeleton />}>
          <LazyHeader />
        </Suspense>

        <Suspense fallback={<SidebarSkeleton />}>
          <LazySidebar />
        </Suspense>

        <main className="min-h-screen overflow-x-clip pt-16 lg:ml-[220px]">
          <HomePage />
        </main>
      </div>
    </LocationProvider>
  )
}

export default App
