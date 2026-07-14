export interface MeetingAttendee {
  name: string
  email?: string
  avatarUrl?: string
}

export type MeetingSource = 'GOOGLE' | 'MANUAL'

export type MeetingStatus = 'Live' | 'Upcoming' | 'Completed' | 'Canceled'

export type DateFilter = 'today' | 'tomorrow' | 'this-week' | 'custom'

export interface Meeting {
  id: string
  title: string
  date: string
  time: string
  durationMinutes?: number
  host: string
  attendees: MeetingAttendee[]
  source: MeetingSource
  autoJoin: boolean
  videoRec: boolean
  status: MeetingStatus
}
