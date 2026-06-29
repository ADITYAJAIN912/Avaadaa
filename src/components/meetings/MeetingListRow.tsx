import { memo, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import type { Meeting } from '../../types/meeting'
import { isMeetingPastOrCompleted } from '../../utils/meetings'
import { getMeetingRowHighlight } from '../../utils/meetingMeta'
import { AvatarGroup } from '../ui/AvatarGroup'
import { Toggle } from '../ui/Toggle'
import { Badge, MeetingStatusBadge } from '../ui/Badge'
import { MeetingMetadata } from '../ui/MeetingMetadata'
import { getDisplayAttendees } from '../../utils/meetingDisplay'

interface MeetingListRowProps {
  meeting: Meeting
  onAutoJoinChange: (id: string, value: boolean) => void
}

function rowSurfaceClass(isPast: boolean, highlight: ReturnType<typeof getMeetingRowHighlight>): string {
  if (isPast) return 'row-completed'
  if (highlight === 'now') return 'row-highlight-now'
  if (highlight === 'soon') return 'row-highlight-soon'
  return ''
}

export const MeetingListRow = memo(function MeetingListRow({
  meeting,
  onAutoJoinChange,
}: MeetingListRowProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const isPast = isMeetingPastOrCompleted(meeting)
  const highlight = getMeetingRowHighlight(meeting, isPast)
  const surface = rowSurfaceClass(isPast, highlight)
  const displayAttendees = getDisplayAttendees(meeting)

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileExpanded((prev) => !prev)}
        className={`row-interactive focus-ring flex min-h-[3.5rem] w-full items-center gap-3 px-4 py-2.5 text-left last:border-0 md:hidden ${surface}`}
      >
        <span className="w-16 shrink-0 text-caption font-medium tabular-nums text-neutral-muted">
          {meeting.time}
        </span>
        <span className="min-w-0 flex-1 truncate text-body font-medium text-neutral-text">
          {meeting.title}
        </span>
        <MeetingStatusBadge meeting={meeting} isPast={isPast} className="shrink-0" />
        <ChevronRight
          className={`h-4 w-4 shrink-0 text-neutral-muted ease-premium ${mobileExpanded ? 'rotate-90' : ''}`}
          aria-hidden
        />
      </button>

      {mobileExpanded && (
        <div className={`border-b border-neutral-border/60 bg-neutral-bg/60 px-4 py-2.5 md:hidden ${surface}`}>
          <MeetingMetadata meeting={meeting} showStartsIn={!isPast} />
          <div className="mt-2 flex items-center justify-between gap-3">
            <AvatarGroup attendees={displayAttendees} max={3} />
            {!isPast && (
              <Toggle
                checked={meeting.autoJoin}
                onChange={(v) => onAutoJoinChange(meeting.id, v)}
                label="Auto Join"
              />
            )}
          </div>
        </div>
      )}

      <div
        className={`group row-interactive hidden min-h-[3.5rem] items-center gap-3 px-4 py-2.5 last:border-0 md:flex ${surface}`}
      >
        <span className="w-16 shrink-0 text-caption font-medium tabular-nums text-neutral-muted">
          {meeting.time}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-body font-medium text-neutral-text">
            {meeting.title}
          </p>
          <MeetingMetadata meeting={meeting} showStartsIn={!isPast} className="mt-0.5" />
        </div>
        <div className="hidden shrink-0 lg:block">
          <AvatarGroup attendees={displayAttendees} max={3} />
        </div>
        <div className="hidden shrink-0 md:block lg:hidden">
          <AvatarGroup attendees={displayAttendees} max={3} compact />
        </div>
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          {isPast ? (
            <Badge variant="completed">Completed</Badge>
          ) : (
            <Badge variant="source">{meeting.source}</Badge>
          )}
        </div>
        <div className="hidden w-9 shrink-0 items-center justify-center sm:flex">
          {!isPast ? (
            <div onClick={(e) => e.stopPropagation()}>
              <Toggle
                checked={meeting.autoJoin}
                onChange={(v) => onAutoJoinChange(meeting.id, v)}
                ariaLabel={`Auto join ${meeting.title}`}
              />
            </div>
          ) : null}
        </div>
        <button
          type="button"
          className="focus-ring shrink-0 rounded-lg p-1.5 text-neutral-muted ease-premium hover:bg-white hover:text-neutral-text"
          aria-label={`Meeting details for ${meeting.title}`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </>
  )
})
