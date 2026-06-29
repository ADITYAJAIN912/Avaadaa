import type { Meeting, MeetingAttendee } from '../types/meeting'

/** Attendees shown in avatar groups — excludes host to avoid duplicate avatar. */
export function getDisplayAttendees(meeting: Meeting): MeetingAttendee[] {
  const withoutHost = meeting.attendees.filter((a) => a.name !== meeting.host)
  return withoutHost.length > 0 ? withoutHost : meeting.attendees
}
