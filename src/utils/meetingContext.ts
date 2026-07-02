import type { Meeting } from '../types/meeting'
import type { MeetingContext } from '../types/meetingContext'
import { getMeetingContextById } from '../data/mockMeetingContexts'

export function resolveMeetingContext(
  meetingId: string | null,
  meetings: Meeting[],
): MeetingContext | null {
  if (!meetingId) return null
  const meeting = meetings.find((m) => m.id === meetingId)
  if (!meeting) return null
  return getMeetingContextById(meetingId, meeting)
}
