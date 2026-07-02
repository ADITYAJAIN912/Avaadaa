import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { MobileTabBar } from './MobileTabBar'
import { useLayout } from '../../context/LayoutContext'

const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/calendar': 'Calendar',
  '/meetings': 'Meetings',
  '/action-items': 'Action Items',
}

export function AppLayout() {
  const location = useLocation()
  const { setSidebarCollapsed } = useLayout()
  const title = pageTitles[location.pathname] ?? 'Home'

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setSidebarCollapsed(true)
      } else if (window.innerWidth >= 1024) {
        setSidebarCollapsed(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setSidebarCollapsed])

  return (
    <div className="flex min-h-svh bg-neutral-bg">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-4 pb-32 md:p-6 md:max-lg:pb-28 lg:pb-8">
          <Outlet />
        </main>
      </div>
      <MobileTabBar />
    </div>
  )
}
