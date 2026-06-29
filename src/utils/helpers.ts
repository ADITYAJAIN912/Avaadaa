import { TODAY } from '../data/constants'

export function getInitials(name: string): string {
  const cleaned = name.replace(/[._@]/g, ' ').trim()
  const parts = cleaned.split(/\s+/).filter((p) => p.length > 0 && !/^\d+$/.test(p))
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return parts[0]?.[0]?.toUpperCase() ?? '?'
}

/** Stable key for avatar color — prefer email so the same person is consistent everywhere. */
export function getPersonKey(name: string, email?: string): string {
  return (email ?? name).toLowerCase().trim()
}

export function getAvatarColor(name: string, email?: string): string {
  const key = getPersonKey(name, email)
  const colors = [
    'bg-brand-teal',
    'bg-status-info',
    'bg-status-warning',
    'bg-brand-navy',
    'bg-status-success',
  ]
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export function formatDisplayDate(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00')
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function formatLongDate(isoDate: string = TODAY): string {
  const date = new Date(isoDate + 'T00:00:00')
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export function isToday(date: string): boolean {
  return date === TODAY
}

export function isTomorrow(date: string): boolean {
  const tomorrow = new Date(`${TODAY}T00:00:00`)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return date === tomorrow.toISOString().slice(0, 10)
}

export function isThisWeek(date: string): boolean {
  const d = new Date(`${date}T00:00:00`)
  const today = new Date(`${TODAY}T00:00:00`)
  const weekEnd = new Date(today)
  weekEnd.setDate(weekEnd.getDate() + 7)
  return d >= today && d <= weekEnd
}

export type DayGroup = 'Today' | 'Tomorrow' | 'This Week'

export function getDayGroup(date: string): DayGroup | null {
  if (isToday(date)) return 'Today'
  if (isTomorrow(date)) return 'Tomorrow'
  if (isThisWeek(date)) return 'This Week'
  return null
}

export function parseMeetingTime(time: string): number {
  const match = time.match(/^(\d{1,2}):(\d{2})(am|pm)$/i)
  if (!match) return 0
  let hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)
  const period = match[3].toLowerCase()
  if (period === 'pm' && hours !== 12) hours += 12
  if (period === 'am' && hours === 12) hours = 0
  return hours * 60 + minutes
}
