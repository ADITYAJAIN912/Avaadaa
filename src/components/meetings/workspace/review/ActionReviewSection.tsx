import type {
  CommitmentStatus,
  DecisionPriority,
  MeetingContextCommitment,
} from '../../../../types/meetingContext'
import { ws, wsBadge } from '../workspaceUi'

interface ActionReviewSectionProps {
  commitments: MeetingContextCommitment[]
}

const statusLabel: Record<CommitmentStatus, string> = {
  proposed: 'Proposed',
  accepted: 'Accepted',
  overdue: 'Overdue',
  completed: 'Completed',
}

const statusTone: Record<CommitmentStatus, string> = {
  proposed: wsBadge.info,
  accepted: wsBadge.accent,
  overdue: wsBadge.danger,
  completed: wsBadge.neutral,
}

const priorityText: Record<DecisionPriority, string> = {
  high: 'font-medium text-status-danger',
  medium: 'font-medium text-neutral-text',
  low: 'text-neutral-muted',
}

export function ActionReviewSection({ commitments }: ActionReviewSectionProps) {
  if (commitments.length === 0) {
    return (
      <div className={ws.empty}>
        <p className={ws.sectionTitle}>No commitments extracted</p>
        <p className={`mt-1 ${ws.meta}`}>Action items will surface here once the AI review completes.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {commitments.map((action) => (
        <article key={action.id} className={ws.cardLift}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <p className={ws.cardTitle}>{action.title}</p>
            <span className={statusTone[action.status]}>{statusLabel[action.status]}</span>
          </div>

          <dl className="mt-2.5 grid gap-2 sm:grid-cols-2">
            <div>
              <dt className={ws.label}>Owner</dt>
              <dd className={`mt-0.5 ${ws.metaStrong}`}>{action.owner}</dd>
            </div>
            <div>
              <dt className={ws.label}>Due date</dt>
              <dd className={`mt-0.5 tabular-nums ${ws.metaStrong}`}>{action.dueDate}</dd>
            </div>
            <div>
              <dt className={ws.label}>Priority</dt>
              <dd className={`mt-0.5 text-small capitalize ${priorityText[action.priority]}`}>
                {action.priority}
              </dd>
            </div>
            {action.dependencies.length > 0 && (
              <div className="sm:col-span-2">
                <dt className={ws.label}>Dependencies</dt>
                <dd className="mt-1 flex flex-wrap gap-1">
                  {action.dependencies.map((dep) => (
                    <span key={dep} className="workspace-stat rounded-md bg-white/60 px-1.5 py-0.5">
                      {dep}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </article>
      ))}
    </div>
  )
}
