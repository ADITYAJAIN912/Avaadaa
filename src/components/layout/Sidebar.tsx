import { NavLink } from 'react-router-dom'
import {
  Home,
  Calendar,
  Video,
  CheckSquare,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import { useLayout } from '../../context/LayoutContext'
import { getOpenActionCount } from '../../data/mockActionItems'

const navItems = [
  { to: '/', icon: Home, label: 'Home', end: true },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/meetings', icon: Video, label: 'Meetings' },
  { to: '/action-items', icon: CheckSquare, label: 'Action Items', badge: true },
]

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useLayout()
  const actionCount = getOpenActionCount()

  return (
    <aside
      className={`hidden shrink-0 flex-col border-r border-neutral-border/80 bg-white ease-premium md:flex ${
        sidebarCollapsed ? 'w-16' : 'w-[220px]'
      }`}
    >
      <div className="flex h-14 items-center border-b border-neutral-border/80 px-4">
        {sidebarCollapsed ? (
          <div
            className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-brand-teal text-sm font-semibold text-white shadow-elevation-1"
            title="Avaada"
          >
            A
          </div>
        ) : (
          <span className="text-base font-semibold tracking-tight text-brand-navy">Avaada</span>
        )}
      </div>

      <nav className="flex-1 space-y-0.5 p-2" aria-label="Main navigation">
        {navItems.map(({ to, icon: Icon, label, end, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={sidebarCollapsed ? label : undefined}
            className={({ isActive }) =>
              `focus-ring group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-body ease-premium ${
                isActive
                  ? 'nav-item-active'
                  : 'font-medium text-neutral-muted transition-colors duration-200 ease-out hover:bg-neutral-bg/80 hover:text-neutral-text'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`nav-item-active-bar ${
                    isActive ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                  }`}
                />
                <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                  <Icon
                    className="h-5 w-5 ease-premium"
                    strokeWidth={isActive ? 2.5 : 1.75}
                  />
                  {sidebarCollapsed && badge && actionCount > 0 && (
                    <span
                      className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-status-danger ring-2 ring-white"
                      aria-label={`${actionCount} open action items`}
                    />
                  )}
                </span>
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 leading-none">{label}</span>
                    {badge && actionCount > 0 && (
                      <span className="badge-pill bg-status-danger text-white shadow-elevation-1">
                        {actionCount}
                      </span>
                    )}
                  </>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-neutral-border/80 p-2">
        <button
          type="button"
          onClick={toggleSidebar}
          className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-neutral-muted ease-premium hover:border-neutral-border/70 hover:bg-neutral-bg/80 hover:text-neutral-text"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="h-5 w-5" strokeWidth={1.75} />
          ) : (
            <>
              <PanelLeftClose className="h-5 w-5" strokeWidth={1.75} />
              <span className="text-caption font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
