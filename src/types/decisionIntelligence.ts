import type { AiConfidence } from './meetingContext'

export type RiskSeverity = 'high' | 'medium' | 'low'

export type RecommendationType =
  | 'approve'
  | 'escalate'
  | 'delegate'
  | 'schedule-followup'
  | 'create-action'
  | 'notify-stakeholder'
  | 'review-later'

export type ConflictType =
  | 'timeline'
  | 'budget'
  | 'owner'
  | 'duplicate-commitment'
  | 'missing-owner'
  | 'missing-due-date'
  | 'repeated-blocker'

export type NarrativeStepType =
  | 'meeting'
  | 'decision'
  | 'action'
  | 'dependency'
  | 'risk'
  | 'outcome'

export type CrossMeetingRelation =
  | 'depends-on'
  | 'feeds-into'
  | 'escalates-to'
  | 'repeats-topic'

export interface ConfidenceDetail {
  level: AiConfidence
  because: string[]
}

export interface BusinessImpactDimensions {
  operational?: string
  financial?: string
  delivery?: string
  compliance?: string
  customer?: string
}

export interface DecisionIntelligence {
  decisionId: string
  summary: string
  whyItMatters: string
  dependencies: string[]
  relatedMeetings: { id: string; title: string }[]
  potentialRisks: string[]
  aiRecommendation: string
  businessImpact: BusinessImpactDimensions
  confidence: ConfidenceDetail
}

export interface RiskIntelligence {
  id: string
  title: string
  severity: RiskSeverity
  whyRisky: string
  businessImpact: string
  affectedProjects: string[]
  probability: string
  mitigation: string
  owner: string
  deadline: string
  status: string
  relatedDecisionId?: string
  confidence?: ConfidenceDetail
}

export interface Recommendation {
  id: string
  type: RecommendationType
  title: string
  rationale: string
  urgency: RiskSeverity
  businessImpact: string
}

export interface MeetingConflict {
  id: string
  type: ConflictType
  title: string
  description: string
  whyItMatters: string
  resolution: string
  sources: { meetingId: string; meetingTitle: string; detail: string }[]
  status: 'needs-review' | 'monitoring' | 'resolved'
}

export interface CrossMeetingNode {
  id: string
  meetingId: string
  title: string
  relation: CrossMeetingRelation
}

export interface CrossMeetingIntelligence {
  chain: CrossMeetingNode[]
  sharedDecisions: string[]
  repeatedTopics: string[]
  linkedProjects: string[]
  discussionThreads: string[]
  escalationChain: string[]
}

export interface NarrativeTimelineStep {
  id: string
  type: NarrativeStepType
  label: string
  detail?: string
}

export interface MeetingIntelligence {
  decisionIntelligence: DecisionIntelligence[]
  riskIntelligence: RiskIntelligence[]
  recommendations: Recommendation[]
  conflicts: MeetingConflict[]
  crossMeeting: CrossMeetingIntelligence
  narrativeTimeline: NarrativeTimelineStep[]
}

/** Maps decision id → intelligence for lookup */
export function intelligenceByDecisionId(
  items: DecisionIntelligence[],
): Map<string, DecisionIntelligence> {
  return new Map(items.map((item) => [item.decisionId, item]))
}

export const recommendationLabel: Record<RecommendationType, string> = {
  approve: 'Approve',
  escalate: 'Escalate',
  delegate: 'Delegate',
  'schedule-followup': 'Schedule follow-up',
  'create-action': 'Create action',
  'notify-stakeholder': 'Notify stakeholder',
  'review-later': 'Review later',
}

export const conflictLabel: Record<ConflictType, string> = {
  timeline: 'Timeline conflict',
  budget: 'Budget conflict',
  owner: 'Owner conflict',
  'duplicate-commitment': 'Duplicate commitment',
  'missing-owner': 'Missing owner',
  'missing-due-date': 'Missing due date',
  'repeated-blocker': 'Repeated blocker',
}

export const narrativeStepLabel: Record<NarrativeStepType, string> = {
  meeting: 'Context',
  decision: 'Decision',
  action: 'Action',
  dependency: 'Dependency',
  risk: 'Risk',
  outcome: 'Outcome',
}
