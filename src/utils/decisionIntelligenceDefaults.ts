import type { MeetingContext, MeetingContextDecision } from '../types/meetingContext'
import type {
  BusinessImpactDimensions,
  ConfidenceDetail,
  CrossMeetingIntelligence,
  DecisionIntelligence,
  MeetingIntelligence,
  NarrativeTimelineStep,
  Recommendation,
  RiskIntelligence,
} from '../types/decisionIntelligence'
import {
  briefConfidenceOverrides,
  meetingIntelligenceOverrides,
} from '../data/mockDecisionIntelligence'

function defaultConfidence(decision: MeetingContextDecision): ConfidenceDetail {
  const because =
    decision.status === 'confirmed'
      ? [
          `Owner ${decision.owner} acknowledged in session`,
          'Decision language appeared in summary',
        ]
      : ['Extracted from discussion — pending explicit confirmation']

  return {
    level: decision.confidence,
    because,
  }
}

function defaultBusinessImpact(decision: MeetingContextDecision): BusinessImpactDimensions {
  return {
    operational: decision.businessImpact,
  }
}

function buildDecisionIntelligence(
  decision: MeetingContextDecision,
  ctx: MeetingContext,
): DecisionIntelligence {
  return {
    decisionId: decision.id,
    summary: decision.title,
    whyItMatters: decision.businessImpact,
    dependencies: [],
    relatedMeetings: ctx.linkedMeetings.slice(0, 2).map((m) => ({
      id: m.id,
      title: m.title,
    })),
    potentialRisks: [],
    aiRecommendation: `Review and ${decision.approvalStatus === 'approved' ? 'confirm' : 'approve'} this decision with ${decision.owner}.`,
    businessImpact: defaultBusinessImpact(decision),
    confidence: defaultConfidence(decision),
  }
}

function defaultCrossMeeting(ctx: MeetingContext): CrossMeetingIntelligence {
  return {
    chain: ctx.linkedMeetings.map((m, i) => ({
      id: `cm-${m.id}`,
      meetingId: m.id,
      title: m.title,
      relation: i === 0 ? 'feeds-into' : 'depends-on',
    })),
    sharedDecisions: ctx.decisions.slice(0, 2).map((d) => d.title),
    repeatedTopics: ctx.discussionHighlights.slice(0, 3),
    linkedProjects: ctx.linkedProjects.map((p) => p.name),
    discussionThreads: ctx.relatedThreads.map((t) => t.title),
    escalationChain: [],
  }
}

function defaultNarrative(ctx: MeetingContext): NarrativeTimelineStep[] {
  const steps: NarrativeTimelineStep[] = [
    { id: 'n-0', type: 'meeting', label: ctx.title },
  ]

  ctx.decisions.forEach((d, i) => {
    steps.push({
      id: `n-d-${i}`,
      type: 'decision',
      label: d.title,
      detail: d.owner,
    })
  })

  ctx.commitments.slice(0, 2).forEach((c, i) => {
    steps.push({
      id: `n-c-${i}`,
      type: 'action',
      label: c.title,
      detail: `${c.owner} · due ${c.dueDate}`,
    })
  })

  if (ctx.brief.keyRisk) {
    steps.push({
      id: 'n-risk',
      type: 'risk',
      label: ctx.brief.keyRisk.split('.')[0],
    })
  }

  steps.push({
    id: 'n-outcome',
    type: 'outcome',
    label: ctx.brief.nextStep.split('.')[0],
  })

  return steps
}

function defaultRecommendations(ctx: MeetingContext): Recommendation[] {
  const recs: Recommendation[] = []

  if (ctx.status === 'completed') {
    recs.push({
      id: 'rec-approve',
      type: 'approve',
      title: 'Approve meeting summary',
      rationale:
        'Summary reflects captured decisions and commitments. Approval enables distribution.',
      urgency: 'medium',
      businessImpact: 'Unlocks stakeholder distribution',
    })
  }

  if (ctx.brief.keyRisk.length > 20) {
    recs.push({
      id: 'rec-escalate',
      type: 'escalate',
      title: 'Review key risk with owner',
      rationale: ctx.brief.keyRisk,
      urgency: 'high',
      businessImpact: ctx.brief.impact,
    })
  }

  recs.push({
    id: 'rec-followup',
    type: 'schedule-followup',
    title: 'Follow up on recommended next step',
    rationale: ctx.brief.nextStep,
    urgency: 'medium',
    businessImpact: 'Maintains commitment momentum',
  })

  return recs
}

function defaultRisks(ctx: MeetingContext): RiskIntelligence[] {
  const riskSignals = ctx.signals.filter((s) => s.type === 'risk')
  if (riskSignals.length === 0 && !ctx.brief.keyRisk) return []

  const primaryDecisionId = ctx.decisions[0]?.id

  return [
    {
      id: `r-${ctx.id}-1`,
      title: ctx.brief.keyRisk.split('.')[0] || 'Key meeting risk',
      severity: 'medium',
      whyRisky: ctx.brief.keyRisk,
      businessImpact: ctx.brief.impact,
      affectedProjects: ctx.linkedProjects.map((p) => p.name),
      probability: 'Assessed from discussion',
      mitigation: ctx.brief.nextStep,
      owner: ctx.organizer,
      deadline: '—',
      status: 'Monitoring',
      relatedDecisionId: primaryDecisionId,
    },
  ]
}

export function ensureMeetingIntelligence(ctx: MeetingContext): MeetingContext {
  const override = meetingIntelligenceOverrides[ctx.id] ?? {}
  const overrideByDecision = new Map(
    (override.decisionIntelligence ?? []).map((d) => [d.decisionId, d]),
  )

  const decisionIntelligence = ctx.decisions.map((decision) => {
    const custom = overrideByDecision.get(decision.id)
    const base = buildDecisionIntelligence(decision, ctx)
    return custom ? { ...base, ...custom } : base
  })

  const intelligence: MeetingIntelligence = {
    decisionIntelligence,
    riskIntelligence: override.riskIntelligence ?? defaultRisks(ctx),
    recommendations: override.recommendations ?? defaultRecommendations(ctx),
    conflicts: override.conflicts ?? [],
    crossMeeting: override.crossMeeting ?? defaultCrossMeeting(ctx),
    narrativeTimeline: override.narrativeTimeline ?? defaultNarrative(ctx),
  }

  const confidenceBecause = briefConfidenceOverrides[ctx.id]

  return {
    ...ctx,
    brief: {
      ...ctx.brief,
      confidenceBecause:
        confidenceBecause ??
        (ctx.brief.aiConfidence === 'high'
          ? [
              'Multiple participants confirmed key outcomes',
              'Decisions linked to owners in session',
            ]
          : ['Summary generated from capture — review recommended']),
    },
    intelligence,
  }
}
