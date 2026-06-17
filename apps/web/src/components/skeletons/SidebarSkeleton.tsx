const navItemCount = 10

export function SidebarSkeleton() {
  return (
    <aside className="fixed top-16 left-0 z-40 hidden h-[calc(100vh-4rem)] w-[220px] flex-col border-r border-gray-200 bg-white lg:flex">
      <nav className="flex flex-1 flex-col px-3 py-4">
        <ul className="space-y-0.5">
          {Array.from({ length: navItemCount }, (_, index) => (
            <li key={index}>
              <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
                <div className="h-5 w-5 shrink-0 animate-pulse rounded bg-gray-200" />
                <div className="h-4 flex-1 animate-pulse rounded bg-gray-200" />
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
