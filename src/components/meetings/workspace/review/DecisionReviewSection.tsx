import type {
  AiConfidence,
  ApprovalStatus,
  MeetingContextDecision,
} from '../../../../types/meetingContext'
import { priorityBadgeTone, ws, wsBadge } from '../workspaceUi'

interface DecisionReviewSectionProps {
  decisions: MeetingContextDecision[]
}

const approvalLabel: Record<ApprovalStatus, string> = {
  approved: 'Approved',
  pending: 'Pending approval',
  draft: 'Draft',
}

const approvalTone: Record<ApprovalStatus, string> = {
  approved: wsBadge.accent,
  pending: wsBadge.warning,
  draft: wsBadge.neutral,
}

const confidenceLabel: Record<AiConfidence, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

export function DecisionReviewSection({ decisions }: DecisionReviewSectionProps) {
  if (decisions.length === 0) {
    return (
      <div className={ws.empty}>
        <p className={ws.sectionTitle}>No decisions recorded</p>
        <p className={`mt-1 ${ws.meta}`}>Decisions will appear here after the meeting is reviewed.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {decisions.map((decision) => (
        <article key={decision.id} className={ws.cardLift}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <p className={ws.cardTitle}>{decision.title}</p>
            <span className={priorityBadgeTone(decision.priority)}>{decision.priority}</span>
          </div>

          <dl className="mt-2.5 grid gap-2 sm:grid-cols-2">
            <div>
              <dt className={ws.label}>Owner</dt>
              <dd className={`mt-0.5 ${ws.metaStrong}`}>{decision.owner}</dd>
            </div>
            <div>
              <dt className={ws.label}>Related project</dt>
              <dd className={`mt-0.5 ${ws.meta}`}>{decision.relatedProject}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className={ws.label}>Business impact</dt>
              <dd className={`mt-0.5 text-small leading-relaxed text-neutral-text`}>
                {decision.businessImpact}
              </dd>
            </div>
          </dl>

          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className={approvalTone[decision.approvalStatus]}>
              {approvalLabel[decision.approvalStatus]}
            </span>
            <span className="workspace-stat">
              AI {confidenceLabel[decision.confidence]} confidence
            </span>
            {decision.timestamp !== '—' && (
              <span className={`ml-auto tabular-nums ${ws.meta}`}>{decision.timestamp}</span>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
