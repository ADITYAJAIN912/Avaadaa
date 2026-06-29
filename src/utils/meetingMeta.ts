import type { Meeting } from '../types/meeting'
import { MOCK_NOW_TIME, TODAY } from '../data/constants'
import { parseMeetingTime } from './helpers'

const DURATION_OPTIONS = [30, 45, 60] as const

/** Stable mock duration derived from meeting id — no API. */
export function getMeetingDurationMinutes(meeting: Meeting): number {
  const n = parseInt(meeting.id.replace(/\D/g, ''), 10) || 1
  return DURATION_OPTIONS[n % DURATION_OPTIONS.length]
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export function getPlatformLabel(source: Meeting['source']): string {
  return source === 'GOOGLE' ? 'Google Meet' : 'Manual'
}

export function getStartsInLabel(meeting: Meeting): string | null {
  if (meeting.date < TODAY) return null
  if (meeting.date > TODAY) return 'Upcoming'
  const nowMins = parseMeetingTime(MOCK_NOW_TIME)
  const startMins = parseMeetingTime(meeting.time)
  const diff = startMins - nowMins
  if (diff <= 0) return 'Starting now'
  if (diff < 60) return `Starts in ${diff} min`
  const hours = Math.floor(diff / 60)
  const mins = diff % 60
  return mins > 0 ? `Starts in ${hours}h ${mins}m` : `Starts in ${hours}h`
}

export type MeetingRowHighlight = 'now' | 'soon' | null

/** Row tint for meetings list — derived from mock clock, no API. */
export function getMeetingRowHighlight(
  meeting: Meeting,
  isPast: boolean,
): MeetingRowHighlight {
  if (isPast) return null
  const label = getStartsInLabel(meeting)
  if (label === 'Starting now') return 'now'
  const minMatch = label?.match(/^Starts in (\d+) min$/)
  if (minMatch && parseInt(minMatch[1], 10) <= 30) return 'soon'
  return null
}

export interface MeetingArtifact {
  label: string
}

/** Visual-only labels for completed meetings. */
export function getMeetingArtifacts(meeting: Meeting): MeetingArtifact[] {
  if (meeting.status !== 'Completed') return []
  const artifacts: MeetingArtifact[] = [{ label: 'Summary Generated' }]
  if (meeting.videoRec) artifacts.push({ label: 'Recording Saved' })
  if (meeting.attendees.length >= 2) artifacts.push({ label: 'Transcript Available' })
  return artifacts
}
