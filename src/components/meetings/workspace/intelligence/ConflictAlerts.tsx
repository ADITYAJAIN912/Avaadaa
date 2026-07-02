import type { MeetingConflict } from '../../../../types/decisionIntelligence'
import { conflictLabel } from '../../../../types/decisionIntelligence'
import { ws, wsBadge } from '../workspaceUi'

interface ConflictAlertsProps {
  conflicts: MeetingConflict[]
  limit?: number
}

export function ConflictAlerts({ conflicts, limit = 2 }: ConflictAlertsProps) {
  const visible = conflicts.slice(0, limit)
  if (visible.length === 0) return null

  return (
    <div className="mb-3 space-y-2">
      {visible.map((conflict) => (
        <div
          key={conflict.id}
          className="rounded-md border-l-2 border-status-warning/80 bg-amber-50/40 px-3 py-2"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className={wsBadge.warning}>{conflictLabel[conflict.type]}</span>
            <span className={ws.cardTitle}>{conflict.title}</span>
          </div>
          <p className="mt-1 text-small leading-snug text-neutral-text">{conflict.whyItMatters}</p>
          <p className={`mt-1 ${ws.meta}`}>
            <span className="font-medium text-neutral-text">Resolution:</span> {conflict.resolution}
          </p>
        </div>
      ))}
    </div>
  )
}
