import { useState, useRef, useEffect } from 'react'
import {
  MoreHorizontal,
  RefreshCw,
  MessageSquare,
  Video,
  Bell,
  HelpCircle,
  Building2,
} from 'lucide-react'
import { getInitials, getAvatarColor } from '../../utils/helpers'
import { USER_NAME, USER_EMAIL } from '../../data/constants'
import { Button } from '../ui/Button'
import { IconButton } from '../ui/Button'

interface TopBarProps {
  title: string
}

export function TopBar({ title }: TopBarProps) {
  const [overflowOpen, setOverflowOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [lastUpdated, setLastUpdated] = useState('9:42 AM')
  const overflowRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (overflowRef.current && !overflowRef.current.contains(e.target as Node)) {
        setOverflowOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleRefresh() {
    const now = new Date()
    setLastUpdated(
      now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    )
    setOverflowOpen(false)
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-neutral-border/80 bg-white px-4 md:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <h1 className="truncate text-topbar-title font-semibold tracking-tight text-neutral-text">
          {title}
        </h1>
        <span className="hidden items-center gap-1.5 rounded-lg border border-neutral-border/70 bg-neutral-bg/60 px-2.5 py-1 text-caption text-neutral-muted lg:inline-flex">
          <Building2 className="h-3.5 w-3.5 shrink-0 text-brand-teal" aria-hidden strokeWidth={1.75} />
          Avaada Workspace
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <div className="toolbar-cluster">
          <IconButton aria-label="Notifications (preview)" title="Notifications">
            <Bell className="h-4 w-4" strokeWidth={1.75} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-status-danger ring-2 ring-white" />
          </IconButton>

          <IconButton aria-label="Help and documentation (preview)" title="Help">
            <HelpCircle className="h-4 w-4" strokeWidth={1.75} />
          </IconButton>

          <div className="mx-0.5 hidden h-4 w-px bg-neutral-border/70 sm:block" aria-hidden />

          <Button
            variant="primary"
            className="group h-8 shrink-0 rounded-lg px-3 text-caption md:px-3.5 md:text-body"
            aria-label="Instant Join"
          >
            <Video className="h-3.5 w-3.5 ease-premium md:h-4 md:w-4" strokeWidth={1.75} />
            <span className="hidden sm:inline">Instant Join</span>
          </Button>
        </div>

        <div className="relative flex items-center" ref={overflowRef}>
          <IconButton
            onClick={() => setOverflowOpen(!overflowOpen)}
            aria-label="More options"
            aria-expanded={overflowOpen}
            className="h-9 w-9"
          >
            <MoreHorizontal className="h-4 w-4" strokeWidth={1.75} />
          </IconButton>
          {overflowOpen && (
            <div className="absolute right-0 top-full z-30 mt-1 w-56 rounded-xl border border-neutral-border/80 bg-white py-1 shadow-elevation-2">
              <button
                type="button"
                className="focus-ring flex w-full items-center gap-2 px-4 py-2.5 text-body text-neutral-text ease-premium hover:bg-neutral-bg"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4 text-neutral-muted" />
                Last updated {lastUpdated}
              </button>
              <button
                type="button"
                className="focus-ring flex w-full items-center gap-2 px-4 py-2.5 text-body text-neutral-text ease-premium hover:bg-neutral-bg"
                onClick={() => setOverflowOpen(false)}
              >
                <MessageSquare className="h-4 w-4 text-neutral-muted" />
                Feedback
              </button>
            </div>
          )}
        </div>

        <div className="relative flex items-center" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-label="Profile menu"
            aria-expanded={profileOpen}
            className={`focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/80 text-caption font-medium leading-none text-white shadow-elevation-1 ease-premium hover:opacity-95 ${getAvatarColor(USER_NAME, USER_EMAIL)}`}
          >
            {getInitials(USER_NAME)}
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full z-30 mt-1 w-48 rounded-xl border border-neutral-border/80 bg-white py-1 shadow-elevation-2">
              <div className="border-b border-neutral-border px-4 py-2.5">
                <p className="text-body font-medium text-neutral-text">{USER_NAME}</p>
                <p className="text-caption text-neutral-muted">Executive</p>
              </div>
              <button
                type="button"
                className="focus-ring w-full px-4 py-2.5 text-left text-body text-neutral-text ease-premium hover:bg-neutral-bg"
                onClick={() => setProfileOpen(false)}
              >
                Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
