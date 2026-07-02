import { getMeetingContextById } from '../data/mockMeetingContexts'
import type { Meeting } from '../types/meeting'
import type { DecisionPriority } from '../types/meetingContext'

export type RiskLevel = 'high' | 'medium' | 'low' | 'none'

export interface MeetingQueuePreview {
  priority: DecisionPriority
  riskLevel: RiskLevel
  decisionCount: number
  actionCount: number
}

const priorityOrder: Record<DecisionPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
}

export function getMeetingQueuePreview(meeting: Meeting): MeetingQueuePreview {
  const ctx = getMeetingContextById(meeting.id, meeting)

  const priority =
    ctx.decisions.length > 0
      ? ctx.decisions.reduce<DecisionPriority>(
          (max, d) => (priorityOrder[d.priority] > priorityOrder[max] ? d.priority : max),
          'low',
        )
      : 'medium'

  const hasRiskSignal = ctx.signals.some((s) => s.type === 'risk')
  const hasFollowup = ctx.signals.some((s) => s.type === 'followup')

  let riskLevel: RiskLevel = 'none'
  if (hasRiskSignal || /critical|high risk|escalat/i.test(ctx.brief.keyRisk)) {
    riskLevel = 'high'
  } else if (hasFollowup || ctx.brief.aiConfidence === 'low') {
    riskLevel = 'medium'
  } else if (ctx.status === 'completed') {
    riskLevel = 'low'
  }

  return {
    priority,
    riskLevel,
    decisionCount: ctx.decisions.length,
    actionCount: ctx.commitments.length,
  }
}
