import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import type { Meeting } from '../../types/meeting'
import { AvatarGroup } from '../ui/AvatarGroup'
import { Toggle } from '../ui/Toggle'
import { EmptyState } from '../ui/EmptyState'
import { MeetingMetadata } from '../ui/MeetingMetadata'
import { getDisplayAttendees } from '../../utils/meetingDisplay'
import { getMeetingRowHighlight } from '../../utils/meetingMeta'

interface UpcomingRowProps {
  meeting: Meeting
  onAutoJoinChange: (id: string, value: boolean) => void
}

export function UpcomingRow({ meeting, onAutoJoinChange }: UpcomingRowProps) {
  const displayAttendees = getDisplayAttendees(meeting)
  const highlight = getMeetingRowHighlight(meeting, false)

  return (
    <div
      className={`group row-interactive flex min-h-[3.5rem] items-center gap-3 px-1 py-2.5 last:border-0 ${
        highlight === 'now' ? 'row-highlight-now' : highlight === 'soon' ? 'row-highlight-soon' : ''
      }`}
    >
      <span className="w-14 shrink-0 text-caption font-medium tabular-nums text-neutral-muted">
        {meeting.time}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-body font-medium text-neutral-text">
          {meeting.title}
        </p>
        <MeetingMetadata meeting={meeting} showStartsIn className="mt-0.5" />
      </div>
      <div className="hidden shrink-0 sm:block">
        <AvatarGroup attendees={displayAttendees} max={3} />
      </div>
      <Toggle
        checked={meeting.autoJoin}
        onChange={(v) => onAutoJoinChange(meeting.id, v)}
        ariaLabel={`Auto join ${meeting.title}`}
      />
    </div>
  )
}

interface UpcomingSectionProps {
  meetings: Meeting[]
  onAutoJoinChange: (id: string, value: boolean) => void
}

export function UpcomingSection({ meetings, onAutoJoinChange }: UpcomingSectionProps) {
  return (
    <section className="card-surface-primary p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-section-title">Upcoming Meetings</h2>
        {meetings.length > 0 && (
          <span className="badge-pill bg-brand-tealLight text-brand-teal">{meetings.length}</span>
        )}
      </div>
      <div className="mt-2">
        {meetings.length === 0 ? (
          <EmptyState
            bare
            icon={Calendar}
            title="No upcoming meetings"
            description="You're all caught up for the rest of today."
            actionHint="View the full schedule on the Meetings page."
            className="py-6"
          />
        ) : (
          meetings.map((m) => (
            <UpcomingRow key={m.id} meeting={m} onAutoJoinChange={onAutoJoinChange} />
          ))
        )}
      </div>
      <Link
        to="/meetings"
        className="focus-ring mt-3 inline-block rounded-md text-caption font-medium text-brand-teal ease-premium hover:text-brand-teal/80"
      >
        View all meetings →
      </Link>
    </section>
  )
}
