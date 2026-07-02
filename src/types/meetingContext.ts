import type { MeetingIntelligence } from './decisionIntelligence'
import type { WorkspaceBrief } from './workspace'

export type { WorkspaceBrief }

export type MeetingContextStatus = 'completed' | 'scheduled' | 'upcoming' | 'live'

export type DecisionStatus = 'confirmed' | 'pending' | 'open'

export type DecisionPriority = 'high' | 'medium' | 'low'

export type CommitmentStatus = 'proposed' | 'accepted' | 'overdue' | 'completed'

export type AiConfidence = 'high' | 'medium' | 'low'

export type ApprovalStatus = 'approved' | 'pending' | 'draft'

export type MeetingSignalType = 'risk' | 'consensus' | 'topic' | 'followup'

export interface MeetingContextAttendee {
  name: string
  email?: string
}

export interface TimelineHighlight {
  id: string
  time: string
  label: string
}

export interface MeetingSignal {
  id: string
  type: MeetingSignalType
  label: string
}

export interface MeetingContextDecision {
  id: string
  title: string
  owner: string
  status: DecisionStatus
  priority: DecisionPriority
  timestamp: string
  businessImpact: string
  relatedProject: string
  approvalStatus: ApprovalStatus
  confidence: AiConfidence
}

export interface MeetingContextCommitment {
  id: string
  title: string
  owner: string
  dueDate: string
  status: CommitmentStatus
  dependencies: string[]
  priority: DecisionPriority
}

export interface RelatedThread {
  id: string
  title: string
  status: string
}

export interface LinkedMeeting {
  id: string
  title: string
  date: string
  time: string
}

export interface LinkedDocument {
  id: string
  title: string
  type: string
}

export interface LinkedProject {
  id: string
  name: string
}

export interface PersonMentioned {
  name: string
  role?: string
}

export interface MeetingContext {
  id: string
  title: string
  date: string
  duration: string
  organizer: string
  attendees: MeetingContextAttendee[]
  status: MeetingContextStatus
  platform: string
  meetingId: string
  summary: string
  brief: WorkspaceBrief
  timelineHighlights: TimelineHighlight[]
  signals: MeetingSignal[]
  decisions: MeetingContextDecision[]
  commitments: MeetingContextCommitment[]
  discussionHighlights: string[]
  transcriptPreview: string
  relatedThreads: RelatedThread[]
  peopleMentioned: PersonMentioned[]
  linkedMeetings: LinkedMeeting[]
  linkedProjects: LinkedProject[]
  relatedDocuments: LinkedDocument[]
  intelligence: MeetingIntelligence
}
