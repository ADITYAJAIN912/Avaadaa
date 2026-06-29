import { NavLink } from 'react-router-dom'
import { Home, Video, CheckSquare, MoreHorizontal } from 'lucide-react'
import { getOpenActionCount } from '../../data/mockActionItems'

const tabs = [
  { to: '/', icon: Home, label: 'Home', end: true },
  { to: '/meetings', icon: Video, label: 'Meetings' },
  { to: '/action-items', icon: CheckSquare, label: 'Actions', badge: true },
  { to: '/calendar', icon: MoreHorizontal, label: 'More' },
]

export function MobileTabBar() {
  const actionCount = getOpenActionCount()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-neutral-border bg-white md:hidden" aria-label="Mobile navigation">
      {tabs.map(({ to, icon: Icon, label, end, badge }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `focus-ring relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-caption font-medium transition-colors duration-200 ${
              isActive ? 'text-brand-teal' : 'text-neutral-muted'
            }`
          }
        >
          <div className="relative">
            <Icon className="h-5 w-5" />
            {badge && actionCount > 0 && (
              <span className="absolute -right-2 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-status-danger px-1 text-[10px] font-medium text-white">
                {actionCount}
              </span>
            )}
          </div>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
