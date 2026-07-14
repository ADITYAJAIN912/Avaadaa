import type { Meeting } from '../types/meeting'
import { MOCK_NOW_TIME, TODAY } from '../data/constants'
import { parseMeetingTime } from './helpers'

export function isMeetingPastOrCompleted(
  meeting: Meeting,
  nowTime: string = MOCK_NOW_TIME,
): boolean {
  if (meeting.status === 'Completed') return true
  if (meeting.date < TODAY) return true
  if (meeting.date === TODAY) {
    return parseMeetingTime(meeting.time) < parseMeetingTime(nowTime)
  }
  return false
}

export function isMeetingUpcoming(
  meeting: Meeting,
  nowTime: string = MOCK_NOW_TIME,
): boolean {
  if (meeting.status === 'Completed') return false
  if (meeting.date < TODAY) return false
  if (meeting.date > TODAY) return true
  // If it's today, it's upcoming if start time > nowTime (not yet started)
  return parseMeetingTime(meeting.time) > parseMeetingTime(nowTime)
}

export function isMeetingLive(
  meeting: Meeting,
  nowTime: string = MOCK_NOW_TIME,
): boolean {
  if (meeting.status === 'Completed') return false
  if (meeting.date !== TODAY) return false
  const startMins = parseMeetingTime(meeting.time)
  const endMins = startMins + meeting.durationMinutes
  const nowMins = parseMeetingTime(nowTime)
  return nowMins >= startMins && nowMins < endMins
}

export function sortMeetingsChronologically(a: Meeting, b: Meeting): number {
  const dateCmp = a.date.localeCompare(b.date)
  if (dateCmp !== 0) return dateCmp
  return parseMeetingTime(a.time) - parseMeetingTime(b.time)
}

export function sortMeetingsForLibrary(a: Meeting, b: Meeting): number {
  const aLive = isMeetingLive(a)
  const bLive = isMeetingLive(b)
  if (aLive && !bLive) return -1
  if (!aLive && bLive) return 1
  
  const aUpcoming = isMeetingUpcoming(a)
  const bUpcoming = isMeetingUpcoming(b)
  
  if (aUpcoming && !bUpcoming) return -1
  if (!aUpcoming && bUpcoming) return 1
  
  if (aUpcoming && bUpcoming) {
    // Both upcoming: chronological (soonest first)
    return sortMeetingsChronologically(a, b)
  }
  
  // Both past: reverse chronological (most recent first)
  return sortMeetingsChronologically(b, a)
}

export function getUpcomingMeetings(meetings: Meeting[], limit?: number): Meeting[] {
  const sorted = meetings
    .filter((m) => isMeetingUpcoming(m))
    .sort(sortMeetingsChronologically)
  return limit !== undefined ? sorted.slice(0, limit) : sorted
}

export function getMeetingsThisWeekFrom(meetings: Meeting[]): Meeting[] {
  const start = new Date(`${TODAY}T00:00:00`)
  const end = new Date(`${TODAY}T00:00:00`)
  end.setDate(end.getDate() + 7)
  return meetings.filter((m) => {
    const d = new Date(`${m.date}T00:00:00`)
    return d >= start && d <= end
  })
}

export function countUpcomingToday(meetings: Meeting[]): number {
  return meetings.filter((m) => m.date === TODAY && isMeetingUpcoming(m)).length
}

export function getRecentMeetingToday(meetings: Meeting[]): Meeting | undefined {
  return meetings
    .filter((m) => m.date === TODAY && m.status === 'Completed')
    .sort((a, b) => parseMeetingTime(b.time) - parseMeetingTime(a.time))[0]
}
