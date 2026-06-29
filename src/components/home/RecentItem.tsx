import type { Meeting } from '../../types/meeting'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import { getMeetingArtifacts } from '../../utils/meetingMeta'

interface RecentItemProps {
  meeting: Meeting
}

export function RecentItem({ meeting }: RecentItemProps) {
  const artifacts = getMeetingArtifacts(meeting)

  return (
    <section className="card-surface-secondary flex h-full flex-col p-4">
      <h2 className="text-card-heading text-neutral-muted">Recent Activity</h2>
      <p className="mt-2.5 text-body font-medium text-neutral-text">{meeting.title}</p>
      <p className="mt-0.5 text-meta">
        {meeting.time} · Completed today
      </p>
      {artifacts.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {artifacts.map((a) => (
            <Badge key={a.label} variant="artifact">
              {a.label}
            </Badge>
          ))}
        </div>
      )}
      <div className="mt-3 flex-1 space-y-2.5 border-t border-neutral-border/60 pt-3">
        {meeting.attendees.map((a, i) => (
          <div key={a.email ?? `${a.name}-${i}`} className="flex items-center gap-2.5">
            <Avatar name={a.name} email={a.email} avatarUrl={a.avatarUrl} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-body text-neutral-text">{a.name}</p>
              {a.email && (
                <p className="truncate text-meta">{a.email}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
