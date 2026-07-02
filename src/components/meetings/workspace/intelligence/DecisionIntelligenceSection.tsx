import type { MeetingContextDecision } from '../../../../types/meetingContext'
import type {
  DecisionIntelligence,
  MeetingConflict,
  RiskIntelligence,
} from '../../../../types/decisionIntelligence'
import { intelligenceByDecisionId } from '../../../../types/decisionIntelligence'
import { priorityBadgeTone, ws, wsBadge } from '../workspaceUi'
import { ConflictAlerts } from './ConflictAlerts'
import { InlineRisk } from './InlineRisk'
import { synthesizeImpact, risksByDecisionId } from './intelligenceUtils'

interface DecisionIntelligenceSectionProps {
  decisions: MeetingContextDecision[]
  intelligence: DecisionIntelligence[]
  risks: RiskIntelligence[]
  conflicts: MeetingConflict[]
}

const approvalTone = {
  approved: wsBadge.accent,
  pending: wsBadge.warning,
  draft: wsBadge.neutral,
} as const

export function DecisionIntelligenceSection({
  decisions,
  intelligence,
  risks,
  conflicts,
}: DecisionIntelligenceSectionProps) {
  const byId = intelligenceByDecisionId(intelligence)
  const risksForDecision = risksByDecisionId(risks)

  if (decisions.length === 0) {
    return (
      <div className={ws.empty}>
        <p className={ws.sectionTitle}>No decisions recorded</p>
        <p className={`mt-1 ${ws.meta}`}>
          Decisions will appear here once the AI review completes.
        </p>
      </div>
    )
  }

  return (
    <div>
      <ConflictAlerts conflicts={conflicts} />

      <div className="space-y-2.5">
        {decisions.map((decision) => {
          const intel = byId.get(decision.id)
          if (!intel) return null

          const linkedRisks = risksForDecision.get(decision.id) ?? []
          const impactLine = synthesizeImpact(intel.businessImpact)
          const topConfidence = intel.confidence.because.slice(0, 2)

          return (
            <article key={decision.id} className={ws.cardLift}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h4 className="text-caption font-semibold leading-snug text-neutral-text">
                  {decision.title}
                </h4>
                <span className={priorityBadgeTone(decision.priority)}>{decision.priority}</span>
              </div>

              <p className="mt-1.5 text-small leading-relaxed text-neutral-text">
                {intel.whyItMatters}
              </p>

              {impactLine && (
                <p className={`mt-1.5 ${ws.meta}`}>
                  <span className="font-medium text-neutral-text">Impact:</span> {impactLine}
                </p>
              )}

              {linkedRisks.map((risk) => (
                <InlineRisk key={risk.id} risk={risk} />
              ))}

              {linkedRisks.length === 0 && intel.potentialRisks[0] && (
                <p className={`mt-1.5 ${ws.meta}`}>
                  <span className="font-medium text-status-warning">Risk:</span>{' '}
                  {intel.potentialRisks[0]}
                </p>
              )}

              <p className="mt-2 text-small leading-snug text-neutral-text">
                <span className="font-medium text-brand-teal">Recommend:</span>{' '}
                {intel.aiRecommendation}
              </p>

              {topConfidence.length > 0 && (
                <p className={`mt-1.5 ${ws.meta}`}>
                  {intel.confidence.level} confidence — {topConfidence.join('; ')}
                </p>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-neutral-border/25 pt-2 text-micro text-neutral-text/80">
                <span className="font-semibold text-neutral-text">{decision.owner}</span>
                <span aria-hidden>·</span>
                <span className="font-medium text-neutral-text/85">{decision.relatedProject}</span>
                <span className={approvalTone[decision.approvalStatus]}>
                  {decision.approvalStatus}
                </span>
                {intel.dependencies[0] && (
                  <>
                    <span aria-hidden>·</span>
                    <span>Depends: {intel.dependencies[0]}</span>
                  </>
                )}
                {decision.timestamp !== '—' && (
                  <span className="ml-auto tabular-nums">{decision.timestamp}</span>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
