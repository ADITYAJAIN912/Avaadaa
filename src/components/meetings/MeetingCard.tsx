import { ChevronRight, Users } from 'lucide-react'
import type { Meeting } from '../../types/meeting'
import { isMeetingPastOrCompleted } from '../../utils/meetings'
import { AvatarGroup } from '../ui/AvatarGroup'
import { Toggle } from '../ui/Toggle'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { MeetingMetadata } from '../ui/MeetingMetadata'
import { getDisplayAttendees } from '../../utils/meetingDisplay'

interface MeetingCardProps {
  meeting: Meeting
  onAutoJoinChange: (id: string, value: boolean) => void
}

export function MeetingCard({ meeting, onAutoJoinChange }: MeetingCardProps) {
  const isPast = isMeetingPastOrCompleted(meeting)
  const displayAttendees = getDisplayAttendees(meeting)

  return (
    <Card
      variant="interactive"
      className={`flex flex-col p-4 ${isPast ? 'row-completed' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="truncate text-body font-medium text-neutral-text">{meeting.title}</p>
        {isPast && <Badge variant="completed">Completed</Badge>}
      </div>
      <MeetingMetadata meeting={meeting} showStartsIn={!isPast} className="mt-1" />
      <div className="mt-2 flex items-center gap-2 text-caption text-neutral-muted">
        <span className="flex items-center gap-0.5">
          <Users className="h-3 w-3" />
          {displayAttendees.length}
        </span>
        {!isPast && <Badge variant="source">{meeting.source}</Badge>}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-neutral-border pt-3">
        {!isPast ? (
          <Toggle
            checked={meeting.autoJoin}
            onChange={(v) => onAutoJoinChange(meeting.id, v)}
            label="Auto Join"
          />
        ) : (
          <span className="text-caption text-neutral-muted">Completed</span>
        )}
        <button
          type="button"
          className="focus-ring rounded-lg p-1.5 text-neutral-muted ease-premium hover:bg-neutral-bg"
          aria-label="Meeting details"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3">
        <AvatarGroup attendees={displayAttendees} max={3} />
      </div>
    </Card>
  )
}
