import type { RiskIntelligence } from '../../../../types/decisionIntelligence'
import { wsBadge } from '../workspaceUi'

interface InlineRiskProps {
  risk: RiskIntelligence
}

const severityTone = {
  high: wsBadge.danger,
  medium: wsBadge.warning,
  low: wsBadge.neutral,
} as const

export function InlineRisk({ risk }: InlineRiskProps) {
  return (
    <div className="mt-2 rounded-md bg-white/60 px-2.5 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className={severityTone[risk.severity]}>{risk.severity} risk</span>
        <span className="text-small font-medium text-neutral-text">{risk.title}</span>
      </div>
      <p className="mt-1 text-small leading-snug text-neutral-text">{risk.businessImpact}</p>
      <p className="mt-1 text-caption text-neutral-text/80">
        <span className="font-semibold text-neutral-text">{risk.owner}</span>
        {' · '}
        <span className="font-medium text-neutral-text/85">Mitigate:</span> {risk.mitigation}
        {risk.deadline !== '—' && (
          <>
            {' · '}
            <span className="tabular-nums font-medium text-neutral-text/85">by {risk.deadline}</span>
          </>
        )}
      </p>
    </div>
  )
}
