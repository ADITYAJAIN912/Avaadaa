import type { Meeting } from '../../types/meeting'
import {
  formatDuration,
  getMeetingDurationMinutes,
  getPlatformLabel,
  getStartsInLabel,
} from '../../utils/meetingMeta'
import { getDisplayAttendees } from '../../utils/meetingDisplay'

interface MeetingMetadataProps {
  meeting: Meeting
  variant?: 'compact' | 'inline'
  showStartsIn?: boolean
  className?: string
}

function MetaDot() {
  return <span className="text-neutral-border" aria-hidden>·</span>
}

export function MeetingMetadata({
  meeting,
  variant = 'compact',
  showStartsIn = false,
  className = '',
}: MeetingMetadataProps) {
  const duration = formatDuration(getMeetingDurationMinutes(meeting))
  const platform = getPlatformLabel(meeting.source)
  const attendeeCount = getDisplayAttendees(meeting).length
  const startsIn = showStartsIn ? getStartsInLabel(meeting) : null

  if (variant === 'inline') {
    return (
      <p className={`truncate text-caption text-neutral-muted ${className}`}>
        <span>{duration}</span>
        <MetaDot /> <span>{platform}</span>
        <MetaDot /> <span>{attendeeCount} attendee{attendeeCount !== 1 ? 's' : ''}</span>
        {startsIn && (
          <>
            <MetaDot /> <span className="text-brand-teal">{startsIn}</span>
          </>
        )}
      </p>
    )
  }

  return (
    <p className={`flex flex-wrap items-center gap-x-1 gap-y-0.5 text-meta ${className}`}>
      <span>{meeting.host}</span>
      <MetaDot />
      <span>{duration}</span>
      <MetaDot />
      <span>{platform}</span>
      <MetaDot />
      <span>{attendeeCount} attendee{attendeeCount !== 1 ? 's' : ''}</span>
      {startsIn && (
        <>
          <MetaDot />
          <span className="font-medium text-brand-teal">{startsIn}</span>
        </>
      )}
    </p>
  )
}
