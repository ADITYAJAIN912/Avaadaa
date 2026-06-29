export interface MeetingAttendee {
  name: string
  email?: string
  avatarUrl?: string
}

export type MeetingSource = 'GOOGLE' | 'MANUAL'

export type MeetingStatus = 'Upcoming' | 'Completed' | 'Scheduled'

export interface Meeting {
  id: string
  title: string
  date: string
  time: string
  host: string
  attendees: MeetingAttendee[]
  source: MeetingSource
  autoJoin: boolean
  videoRec: boolean
  status: MeetingStatus
}
