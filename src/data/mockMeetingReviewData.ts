import type {
  WorkspaceBrief,
  MeetingSignal,
  TimelineHighlight,
} from '../types/meetingContext'

export interface MeetingReviewOverride {
  brief?: WorkspaceBrief
  timelineHighlights?: TimelineHighlight[]
  signals?: MeetingSignal[]
}

export const meetingReviewOverrides: Record<string, MeetingReviewOverride> = {
  m1: {
    brief: {
      outcome:
        'Meeting workspace approved as the flagship review surface with summary-first flow and attention-based queue entry.',
      impact:
        'Accelerates pilot readiness and establishes a differentiated review experience for the AI companion.',
      keyRisk:
        'Decision-thread depth deferred to a later milestone — cross-meeting continuity must be narrated manually in demos until then.',
      nextStep:
        'Approve summary, accept design handoff commitment, and rehearse opening on a review-ready meeting.',
      aiConfidence: 'high',
    },
    timelineHighlights: [
      { id: 'm1-t1', time: '11:42am', label: 'Product confirmed workspace as hero surface.' },
      { id: 'm1-t2', time: '11:51am', label: 'Layout proportions locked at 23 / 58 / 19.' },
      { id: 'm1-t3', time: '11:58am', label: 'Summary-before-transcript hierarchy approved.' },
      { id: 'm1-t4', time: '12:05pm', label: 'Decision threads scoped to next milestone.' },
    ],
    signals: [
      { id: 'm1-s1', type: 'consensus', label: '✅ Consensus achieved on workspace direction' },
      { id: 'm1-s2', type: 'followup', label: '📌 Follow-up required on Figma handoff' },
      { id: 'm1-s3', type: 'topic', label: '💬 Product demo narrative discussed' },
    ],
  },
  m5: {
    brief: {
      outcome:
        'Gujarat cluster commissioning remains on track; grid connectivity paperwork flagged for escalation if unresolved by Wednesday.',
      impact:
        'Protects Q3 renewable delivery milestone and reduces regulatory exposure on the Gujarat solar cluster.',
      keyRisk:
        'Grid paperwork delay could slip inverter delivery documentation and board review staffing.',
      nextStep:
        'Escalate grid item Wednesday if no movement; publish inverter timeline to stakeholders.',
      aiConfidence: 'high',
    },
    timelineHighlights: [
      { id: 'm5-t1', time: '9:35am', label: 'Gujarat commissioning status reviewed — on track.' },
      { id: 'm5-t2', time: '9:42am', label: 'Grid connectivity paperwork risk identified.' },
      { id: 'm5-t3', time: '9:48am', label: 'Leadership escalation path approved if unresolved.' },
      { id: 'm5-t4', time: '9:55am', label: 'Board review staffing discussion opened.' },
    ],
    signals: [
      { id: 'm5-s1', type: 'risk', label: '⚠ High risk — grid paperwork pending' },
      { id: 'm5-s2', type: 'consensus', label: '✅ Consensus on escalation threshold' },
      { id: 'm5-s3', type: 'followup', label: '📌 Follow-up on inverter timeline' },
    ],
  },
  m2: {
    brief: {
      outcome:
        'MEET AI pilot scope confirmed for director calendar subset; afternoon recording tests scheduled without overlap.',
      impact:
        'De-risks capture reliability before expanding botless recording to wider calendars.',
      keyRisk:
        'Concurrent recording sessions this afternoon may still conflict without staggered windows.',
      nextStep:
        'Execute recording test matrix in m3/m4 sessions and document vocabulary dictionary.',
      aiConfidence: 'medium',
    },
    timelineHighlights: [
      { id: 'm2-t1', time: '12:05pm', label: 'Pilot scope limited through July.' },
      { id: 'm2-t2', time: '12:18pm', label: 'Recording overlap concern raised.' },
      { id: 'm2-t3', time: '12:32pm', label: 'Staggered capture windows proposed.' },
    ],
    signals: [
      { id: 'm2-s1', type: 'risk', label: '⚠ High risk — recording overlap' },
      { id: 'm2-s2', type: 'followup', label: '📌 Follow-up on test matrix today' },
    ],
  },
  m3: {
    brief: {
      outcome:
        'Single-host recording test planned to validate botless capture and artifact pipeline timing.',
      impact:
        'Validates review workflow with realistic processing states for stakeholder demo.',
      keyRisk: 'Video-enabled session may extend processing beyond 3-minute target.',
      nextStep: 'Join session, verify capture indicators, review artifacts immediately after end.',
      aiConfidence: 'medium',
    },
    timelineHighlights: [
      { id: 'm3-t1', time: '12:15pm', label: 'Recording test session scheduled.' },
      { id: 'm3-t2', time: '12:20pm', label: 'Capture policy set to botless default.' },
    ],
    signals: [
      { id: 'm3-s1', type: 'followup', label: '📌 Follow-up on pipeline timing' },
    ],
  },
}

export const decisionReviewOverrides: Record<
  string,
  Record<
    string,
    {
      businessImpact: string
      relatedProject: string
      approvalStatus: 'approved' | 'pending' | 'draft'
      confidence: 'high' | 'medium' | 'low'
    }
  >
> = {
  m1: {
    'd-m1-1': {
      businessImpact: 'Positions AvaadaMeet as a decision workspace, not a meeting list.',
      relatedProject: 'AvaadaMeet AI Companion',
      approvalStatus: 'approved',
      confidence: 'high',
    },
    'd-m1-2': {
      businessImpact: 'Reduces verification time for leadership users.',
      relatedProject: 'AvaadaMeet AI Companion',
      approvalStatus: 'approved',
      confidence: 'high',
    },
    'd-m1-3': {
      businessImpact: 'Scopes delivery; avoids over-building in Milestone 1.',
      relatedProject: 'AvaadaMeet AI Companion',
      approvalStatus: 'pending',
      confidence: 'medium',
    },
  },
  m5: {
    'd-m5-1': {
      businessImpact: 'Prevents silent slip on regulatory paperwork affecting Q3 delivery.',
      relatedProject: 'Gujarat Solar Cluster',
      approvalStatus: 'approved',
      confidence: 'high',
    },
  },
}

export const commitmentReviewOverrides: Record<
  string,
  Record<
    string,
    { dependencies: string[]; priority: 'high' | 'medium' | 'low' }
  >
> = {
  m1: {
    'c-m1-1': {
      dependencies: ['Workspace shell approval', 'UX spec sign-off'],
      priority: 'high',
    },
    'c-m1-2': {
      dependencies: ['Review-ready mock data'],
      priority: 'medium',
    },
  },
  m5: {
    'c-m5-1': {
      dependencies: ['Inverter vendor confirmation'],
      priority: 'high',
    },
    'c-m5-2': {
      dependencies: ['Grid escalation outcome'],
      priority: 'medium',
    },
  },
}
