import type { ActionWorkspaceItem } from '../../../types/actionWorkspace'
import type { AvaadaCopilotConfig, CopilotResponseBlock, CopilotSuggestion } from './copilotTypes'

const starterPrompts: CopilotSuggestion[] = [
  { id: 'a1', label: 'Summarize this action' },
  { id: 'a2', label: "What's blocking this task?" },
  { id: 'a3', label: 'Draft owner follow-up' },
  { id: 'a4', label: 'Generate status update' },
  { id: 'a5', label: 'Explain execution risk' },
  { id: 'a6', label: 'Suggest next steps' },
  { id: 'a7', label: 'Show dependencies' },
  { id: 'a8', label: 'Generate completion note' },
]

const quickActions = [
  'Generate Email',
  'Status Update',
  'Explain Risk',
  'Generate Report',
  'Notify Owner',
  'Export Summary',
] as const

const followUps = [
  'Explain further',
  'Show dependencies',
  'Generate email',
  'Notify owner',
  'Suggest next steps',
] as const

export function buildActionCopilotResponse(
  promptLabel: string,
  item: ActionWorkspaceItem,
): CopilotResponseBlock[] {
  const normalized = promptLabel.toLowerCase()

  if (normalized.includes('block')) {
    return [
      {
        id: 'summary',
        type: 'summary',
        title: 'Blockers',
        content: item.review.blockers,
      },
      {
        id: 'list',
        type: 'list',
        title: 'Dependencies',
        items: item.dependencies.map((dep) => `${dep.label}: ${dep.detail}`),
      },
    ]
  }

  if (normalized.includes('risk')) {
    return [
      {
        id: 'summary',
        type: 'summary',
        title: 'Execution risk',
        content: item.brief.keyRisk,
      },
      {
        id: 'table',
        type: 'table',
        title: 'Impact overview',
        columns: ['Area', 'Detail'],
        rows: [
          ['Impact', item.brief.impact],
          ['Owner', item.owner],
          ['Progress', `${item.review.progress}%`],
        ],
      },
    ]
  }

  if (normalized.includes('dependenc')) {
    return [
      {
        id: 'list',
        type: 'list',
        title: 'Dependencies',
        items: item.dependencies.map((dep) => `${dep.label}: ${dep.detail}`),
      },
      {
        id: 'timeline',
        type: 'timeline',
        title: 'Recent activity',
        items: item.timeline.slice(0, 4).map((entry) => ({
          label: entry.time,
          detail: entry.event,
        })),
      },
    ]
  }

  if (normalized.includes('status') || normalized.includes('completion')) {
    return [
      {
        id: 'summary',
        type: 'summary',
        title: 'Status update draft',
        content: `${item.brief.outcome} Progress is at ${item.review.progress}% with next step: ${item.brief.nextStep}`,
      },
      {
        id: 'action',
        type: 'action',
        title: item.title,
        owner: item.owner,
        dueDate: item.dueDate,
        priority: item.priority.toUpperCase(),
      },
    ]
  }

  return [
    {
      id: 'summary',
      type: 'summary',
      title: 'Action summary',
      content: `${item.brief.outcome} ${item.brief.nextStep}`,
    },
    {
      id: 'action',
      type: 'action',
      title: item.title,
      owner: item.owner,
      dueDate: item.dueDate,
      priority: item.priority.toUpperCase(),
    },
    {
      id: 'list',
      type: 'list',
      title: 'Suggested next steps',
      items: [
        item.brief.nextStep,
        ...item.timeline.slice(0, 2).map((entry) => entry.event),
      ],
    },
  ]
}

export function createActionCopilotConfig(item: ActionWorkspaceItem): AvaadaCopilotConfig {
  return {
    contextId: item.id,
    contextLabel: item.title,
    contextHints: [
      `${item.priority} priority`,
      `${item.progress}% progress`,
      `${item.dependencies.length} dependencies`,
      item.status,
    ],
    promptHeading: 'How can I help with this action?',
    starterPrompts,
    quickActions,
    followUps,
    inputPlaceholder: 'Ask Avaada AI about this action...',
    defaultSendPrompt: 'Summarize this action',
    buildResponse: (promptLabel) => buildActionCopilotResponse(promptLabel, item),
  }
}
