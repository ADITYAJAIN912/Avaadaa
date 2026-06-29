import { Calendar, CalendarDays, Mail } from 'lucide-react'
import { EmptyState } from '../components/ui/EmptyState'
import { Card } from '../components/ui/Card'
import { CalendarPageSkeleton } from '../components/ui/Skeleton'
import { usePageLoading } from '../hooks/usePageLoading'

const integrations = [
  { name: 'Google Calendar', icon: Calendar },
  { name: 'Outlook', icon: Mail },
  { name: 'Microsoft Teams', icon: CalendarDays },
]

export function CalendarPage() {
  const isLoading = usePageLoading(350)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const today = 29

  if (isLoading) {
    return <CalendarPageSkeleton />
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <EmptyState
        icon={Calendar}
        title="Calendar coming soon"
        description="A unified view of your meetings across connected calendars is on the roadmap. You'll see availability, conflicts, and AvaadaMeet events in one place."
        actionHint="Connect Google Calendar or Outlook when integrations launch."
        className="py-14"
      >
        <div className="text-left">
          <p className="mb-3 text-caption font-medium uppercase tracking-wide text-neutral-muted">
            Upcoming integrations
          </p>
          <ul className="space-y-2">
            {integrations.map(({ name, icon: Icon }) => (
              <li
                key={name}
                className="flex items-center gap-3 rounded-xl border border-neutral-border/70 bg-neutral-bg/40 px-3.5 py-2.5 text-left ease-premium hover:border-brand-teal/20 hover:bg-white hover:shadow-elevation-1"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-elevation-1 ring-1 ring-neutral-border/50">
                  <Icon className="h-4 w-4 text-brand-teal" strokeWidth={1.75} />
                </span>
                <span className="text-body text-neutral-text">{name}</span>
                <span className="badge-pill ml-auto bg-neutral-bg text-neutral-muted ring-1 ring-neutral-border/50">
                  Soon
                </span>
              </li>
            ))}
          </ul>
        </div>
      </EmptyState>

      <Card variant="container" className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-section-title">June 2026</h3>
          <span className="badge-pill bg-neutral-bg text-neutral-muted ring-1 ring-neutral-border/50">
            Preview
          </span>
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {days.map((d) => (
            <div
              key={d}
              className="py-1.5 text-center text-caption font-medium text-neutral-muted"
            >
              {d}
            </div>
          ))}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`flex h-9 items-center justify-center rounded-lg text-body ease-premium ${
                day === today
                  ? 'bg-brand-teal font-medium text-white shadow-elevation-1'
                  : 'text-neutral-text hover:bg-neutral-bg/80'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
