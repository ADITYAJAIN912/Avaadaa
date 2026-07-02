import type { ConfidenceDetail } from '../../../../types/decisionIntelligence'
import { ws, wsBadge } from '../workspaceUi'

interface ConfidenceExplanationProps {
  confidence: ConfidenceDetail
  compact?: boolean
}

const tone = {
  high: wsBadge.accent,
  medium: wsBadge.warning,
  low: wsBadge.neutral,
}

const label = {
  high: 'High confidence',
  medium: 'Medium confidence',
  low: 'Low confidence',
}

export function ConfidenceExplanation({ confidence, compact = false }: ConfidenceExplanationProps) {
  if (confidence.because.length === 0) return null

  return (
    <div className={compact ? 'mt-2' : 'mt-3'}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={tone[confidence.level]}>{label[confidence.level]}</span>
        {!compact && <span className={ws.meta}>Because:</span>}
      </div>
      <ul className={`${compact ? 'mt-1.5' : 'mt-2'} space-y-1`}>
        {confidence.because.map((reason) => (
          <li key={reason} className="flex gap-2 text-small leading-snug text-neutral-text">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-border" aria-hidden />
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
