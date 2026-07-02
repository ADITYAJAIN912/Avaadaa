import type { MeetingContext } from '../../../types/meetingContext'
import type { AvaadaCopilotConfig, CopilotResponseBlock, CopilotSuggestion } from './copilotTypes'

const starterPrompts: CopilotSuggestion[] = [
  { id: 'p1', label: 'Summarize this meeting for stakeholders' },
  { id: 'p2', label: 'What is the biggest risk?' },
  { id: 'p3', label: 'Which decisions are still pending?' },
  { id: 'p4', label: 'Draft a follow-up email' },
  { id: 'p5', label: 'What changed since the previous meeting?' },
  { id: 'p6', label: 'Which teams are blocked?' },
  { id: 'p7', label: 'Explain this decision' },
  { id: 'p8', label: 'Generate meeting notes' },
]

const quickActions = [
  'Generate Email',
  'Status Brief',
  'Create MOM',
  'Export',
  'Explain Decision',
  'Risk Analysis',
] as const

const followUps = [
  'Explain further',
  'Show related meetings',
  'Generate email',
  'Who owns this?',
  'What happens if delayed?',
] as const

export function buildMeetingCopilotResponse(
  promptLabel: string,
  context: MeetingContext,
): CopilotResponseBlock[] {
  const leadDecision = context.decisions[0]
  const leadCommitment = context.commitments[0]
  const linked = context.linkedMeetings.slice(0, 3)
  const normalized = promptLabel.toLowerCase()

  if (normalized.includes('biggest') && normalized.includes('risk')) {
    return [
      {
        id: 'summary',
        type: 'summary',
        title: 'Primary risk',
        content: context.brief.keyRisk,
      },
      {
        id: 'table',
        type: 'table',
        title: 'Risk impact',
        columns: ['Severity', 'Owner', 'Mitigation'],
        rows: [
          [
            context.intelligence.riskIntelligence[0]?.severity.toUpperCase() ?? 'MEDIUM',
            context.intelligence.riskIntelligence[0]?.owner ?? 'Unassigned',
            context.intelligence.riskIntelligence[0]?.mitigation ?? 'Validate in next review',
          ],
        ],
      },
    ]
  }

  if (normalized.includes('pending')) {
    return [
      {
        id: 'list',
        type: 'list',
        title: 'Pending decisions',
        items: context.decisions
          .filter((item) => item.status !== 'confirmed')
          .slice(0, 4)
          .map((item) => `${item.title} — owner ${item.owner}`),
      },
      {
        id: 'action',
        type: 'action',
        title: leadCommitment?.title ?? 'Confirm ownership for open items',
        owner: leadCommitment?.owner ?? context.organizer,
        dueDate: leadCommitment?.dueDate ?? context.date,
        priority: (leadCommitment?.priority ?? 'medium').toUpperCase(),
      },
    ]
  }

  if (normalized.includes('changed since the previous meeting')) {
    return [
      {
        id: 'timeline',
        type: 'timeline',
        title: 'What changed',
        items: linked.map((item) => ({
          label: item.title,
          detail: `${item.date} · ${item.time}`,
        })),
      },
      {
        id: 'decision',
        type: 'decision',
        title: leadDecision?.title ?? 'Decision update pending',
        status: (leadDecision?.status ?? 'open').toUpperCase(),
        owner: leadDecision?.owner ?? context.organizer,
        businessImpact: leadDecision?.businessImpact ?? context.brief.impact,
      },
    ]
  }

  return [
    {
      id: 'summary',
      type: 'summary',
      title: 'Summary draft',
      content: `${context.brief.outcome} ${context.brief.nextStep}`,
    },
    {
      id: 'decision',
      type: 'decision',
      title: leadDecision?.title ?? 'Decision pending',
      status: (leadDecision?.status ?? 'open').toUpperCase(),
      owner: leadDecision?.owner ?? context.organizer,
      businessImpact: leadDecision?.businessImpact ?? context.brief.impact,
    },
    {
      id: 'list',
      type: 'list',
      title: 'Suggested next steps',
      items: context.commitments.slice(0, 3).map((item) => `${item.title} — ${item.owner}`),
    },
  ]
}

export function createMeetingCopilotConfig(context: MeetingContext): AvaadaCopilotConfig {
  return {
    contextId: context.id,
    contextLabel: context.title,
    contextHints: [
      `${context.decisions.length} decisions`,
      `${context.commitments.length} actions`,
      `${context.intelligence.riskIntelligence.length} risks`,
      `${context.linkedMeetings.length} related meetings`,
    ],
    promptHeading: 'How can I help with this meeting?',
    starterPrompts,
    quickActions,
    followUps,
    inputPlaceholder: 'Ask Avaada AI...',
    defaultSendPrompt: 'Summarize this meeting for stakeholders',
    buildResponse: (promptLabel) => buildMeetingCopilotResponse(promptLabel, context),
  }
}
