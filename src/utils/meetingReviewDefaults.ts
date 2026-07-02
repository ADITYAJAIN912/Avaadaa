import type {
  MeetingContext,
  MeetingContextCommitment,
  MeetingContextDecision,
  MeetingSignal,
  TimelineHighlight,
  ApprovalStatus,
  WorkspaceBrief,
} from '../types/meetingContext'
import type { MeetingContextSeed } from '../types/meetingContextSeed'
import { ensureMeetingIntelligence } from './decisionIntelligenceDefaults'

export function defaultBriefFromSummary(
  summary: string,
  isCompleted: boolean,
): WorkspaceBrief {
  if (!isCompleted) {
    return {
      outcome: 'Session not yet held — prep brief will finalize after capture.',
      impact: 'Impact assessment available post-meeting.',
      keyRisk: 'No risks identified until session completes.',
      nextStep: 'Review agenda and linked context before joining.',
      aiConfidence: 'low',
    }
  }
  return {
    outcome: summary.split('.')[0] + '.',
    impact: 'Supports team productivity and accountability workflows.',
    keyRisk: 'Summary pending approval before distribution.',
    nextStep: 'Review decisions and approve commitments below.',
    aiConfidence: 'medium',
  }
}

export function defaultTimelineFromHighlights(
  highlights: string[],
  meetingTime: string,
): TimelineHighlight[] {
  if (highlights.length === 0) {
    return [{ id: 'tl-0', time: meetingTime, label: 'Session scheduled' }]
  }
  const baseMinutes = parseTimeToMinutes(meetingTime)
  return highlights.map((label, i) => ({
    id: `tl-${i}`,
    time: formatMinutesToTime(baseMinutes + (i + 1) * 9),
    label,
  }))
}

export function defaultSignals(isCompleted: boolean): MeetingSignal[] {
  if (!isCompleted) {
    return [
      { id: 'sig-prep', type: 'followup', label: '📌 Prep review recommended' },
    ]
  }
  return [
    { id: 'sig-consensus', type: 'consensus', label: '✅ Consensus achieved on key items' },
    { id: 'sig-followup', type: 'followup', label: '📌 Follow-up required' },
  ]
}

function parseTimeToMinutes(time: string): number {
  const match = time.match(/(\d+):(\d+)\s*(am|pm)/i)
  if (!match) return 9 * 60 + 30
  let h = parseInt(match[1], 10)
  const m = parseInt(match[2], 10)
  const period = match[3].toLowerCase()
  if (period === 'pm' && h !== 12) h += 12
  if (period === 'am' && h === 12) h = 0
  return h * 60 + m
}

function formatMinutesToTime(total: number): string {
  const h24 = Math.floor(total / 60) % 24
  const m = total % 60
  const period = h24 >= 12 ? 'pm' : 'am'
  let h = h24 % 12
  if (h === 0) h = 12
  return `${h}:${String(m).padStart(2, '0')}${period}`
}

export function enrichDecision(
  decision: Omit<
    MeetingContextDecision,
    'businessImpact' | 'relatedProject' | 'approvalStatus' | 'confidence'
  > &
    Partial<
      Pick<
        MeetingContextDecision,
        'businessImpact' | 'relatedProject' | 'approvalStatus' | 'confidence'
      >
    >,
): MeetingContextDecision {
  const approvalMap: Record<string, ApprovalStatus> = {
    confirmed: 'approved',
    pending: 'pending',
    open: 'draft',
  }
  return {
    ...decision,
    businessImpact:
      decision.businessImpact ?? 'Advances operational alignment across stakeholders.',
    relatedProject: decision.relatedProject ?? 'AvaadaMeet AI Companion',
    approvalStatus: decision.approvalStatus ?? approvalMap[decision.status] ?? 'pending',
    confidence: decision.confidence ?? (decision.status === 'confirmed' ? 'high' : 'medium'),
  }
}

export function enrichCommitment(
  commitment: Omit<MeetingContextCommitment, 'dependencies' | 'priority'> &
    Partial<Pick<MeetingContextCommitment, 'dependencies' | 'priority'>>,
): MeetingContextCommitment {
  return {
    ...commitment,
    dependencies: commitment.dependencies ?? [],
    priority: commitment.priority ?? 'medium',
  }
}

export function ensureReviewFields(
  ctx: MeetingContextSeed,
  meetingTime: string,
): MeetingContext {
  const isCompleted = ctx.status === 'completed'
  const base: MeetingContext = {
    ...ctx,
    brief: ctx.brief ?? defaultBriefFromSummary(ctx.summary, isCompleted),
    timelineHighlights:
      ctx.timelineHighlights ??
      defaultTimelineFromHighlights(ctx.discussionHighlights, meetingTime),
    signals: ctx.signals ?? defaultSignals(isCompleted),
    decisions: ctx.decisions.map(enrichDecision),
    commitments: ctx.commitments.map(enrichCommitment),
    intelligence: {
      decisionIntelligence: [],
      riskIntelligence: [],
      recommendations: [],
      conflicts: [],
      crossMeeting: {
        chain: [],
        sharedDecisions: [],
        repeatedTopics: [],
        linkedProjects: [],
        discussionThreads: [],
        escalationChain: [],
      },
      narrativeTimeline: [],
    },
  }
  return ensureMeetingIntelligence(base)
}
