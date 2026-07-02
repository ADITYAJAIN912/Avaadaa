import { Sparkles } from 'lucide-react'
import type { AiConfidence, WorkspaceBrief } from '../../../../types/meetingContext'
import { ws, wsBadge } from '../workspaceUi'
import { ConfidenceExplanation } from '../intelligence/ConfidenceExplanation'

interface BriefSectionProps {
  brief: WorkspaceBrief
}

const confidenceLabel: Record<AiConfidence, string> = {
  high: 'High confidence',
  medium: 'Medium confidence',
  low: 'Low confidence',
}

const confidenceTone: Record<AiConfidence, string> = {
  high: wsBadge.accent,
  medium: wsBadge.warning,
  low: wsBadge.neutral,
}

const confidenceDot: Record<AiConfidence, string> = {
  high: 'bg-brand-teal',
  medium: 'bg-status-warning',
  low: 'bg-neutral-border',
}

const detailFields: { key: keyof WorkspaceBrief; label: string }[] = [
  { key: 'impact', label: 'Impact' },
  { key: 'keyRisk', label: 'Key risk' },
  { key: 'nextStep', label: 'Recommended next step' },
]

export function BriefSection({ brief }: BriefSectionProps) {
  return (
    <div className="workspace-hero-surface">
      <div className={ws.heroHeader}>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/80 text-brand-teal">
            <Sparkles className="h-3 w-3" strokeWidth={1.75} aria-hidden />
          </div>
          <p className={ws.heroKicker}>AI summary</p>
        </div>
        <span className={`${confidenceTone[brief.aiConfidence]} inline-flex items-center gap-1.5`}>
          <span className={`h-1.5 w-1.5 rounded-full ${confidenceDot[brief.aiConfidence]}`} aria-hidden />
          {confidenceLabel[brief.aiConfidence]}
        </span>
      </div>

      <div className={ws.heroBody}>
        <p className={ws.label}>Outcome</p>
        <p className="workspace-hero-outcome max-w-3xl">{brief.outcome}</p>
      </div>

      <dl className={`${ws.heroDetails} sm:grid-cols-3`}>
        {detailFields.map(({ key, label }) => (
          <div key={label} className="min-w-0">
            <dt className={ws.label}>{label}</dt>
            <dd className={ws.heroDetailValue}>{brief[key]}</dd>
          </div>
        ))}
      </dl>

      {brief.confidenceBecause && brief.confidenceBecause.length > 0 && (
        <div className={ws.heroFooter}>
          <ConfidenceExplanation
            confidence={{ level: brief.aiConfidence, because: brief.confidenceBecause }}
            compact
          />
        </div>
      )}
    </div>
  )
}
