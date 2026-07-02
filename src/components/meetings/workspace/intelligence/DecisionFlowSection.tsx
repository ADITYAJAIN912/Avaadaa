import { ArrowDown } from 'lucide-react'
import type {
  CrossMeetingIntelligence,
  NarrativeTimelineStep,
} from '../../../../types/decisionIntelligence'
import { narrativeStepLabel } from '../../../../types/decisionIntelligence'
import { ws } from '../workspaceUi'

interface DecisionFlowSectionProps {
  steps: NarrativeTimelineStep[]
  crossMeeting: CrossMeetingIntelligence
}

const stepTone: Record<NarrativeTimelineStep['type'], string> = {
  meeting: 'text-neutral-muted',
  decision: 'text-brand-teal',
  action: 'text-neutral-text',
  dependency: 'text-neutral-muted',
  risk: 'text-status-warning',
  outcome: 'text-brand-teal',
}

export function DecisionFlowSection({ steps, crossMeeting }: DecisionFlowSectionProps) {
  const hasChain = crossMeeting.chain.length > 0
  const escalation = crossMeeting.escalationChain[0]

  if (steps.length === 0 && !hasChain) {
    return <p className={`${ws.meta} px-1`}>Decision flow will appear after review completes.</p>
  }

  return (
    <div className="workspace-surface px-3 py-2.5">
      {hasChain && (
        <div className="mb-3 border-b border-neutral-border/25 pb-2.5">
          <p className={ws.label}>Decision chain</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-small text-neutral-text">
            {crossMeeting.chain.map((node, index) => (
              <span key={node.id} className="inline-flex items-center gap-1.5">
                {index > 0 && (
                  <span className="text-micro text-neutral-muted" aria-hidden>
                    →
                  </span>
                )}
                <span className="font-medium">{node.title}</span>
              </span>
            ))}
          </div>
          {escalation && (
            <p className={`mt-1.5 ${ws.meta}`}>
              Escalation path: <span className="text-neutral-text">{escalation}</span>
            </p>
          )}
        </div>
      )}

      <ol className="space-y-0">
        {steps.map((step, index) => (
          <li key={step.id}>
            <div className="flex gap-3 py-1">
              <span
                className={`w-16 shrink-0 pt-px text-micro font-semibold uppercase tracking-wide ${stepTone[step.type]}`}
              >
                {narrativeStepLabel[step.type]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-caption leading-snug text-neutral-text">{step.label}</p>
                {step.detail && (
                  <p className={`mt-0.5 ${ws.meta}`}>{step.detail}</p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex gap-3 py-0.5" aria-hidden>
                <span className="w-16" />
                <ArrowDown className="h-3 w-3 text-neutral-border" strokeWidth={1.75} />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
