import { getMeetingQueuePreview } from '../../../utils/meetingQueuePreview'
import type { Meeting } from '../../../types/meeting'
import { queueCardClass, ws, wsBadge } from './workspaceUi'

export type AttentionQueueSectionId = 'now' | 'review' | 'prep' | 'later'

interface AttentionQueueRowProps {
  meeting: Meeting
  sectionId: AttentionQueueSectionId
  isSelected: boolean
  onSelect: (id: string) => void
}

const statusDot: Record<AttentionQueueSectionId, string> = {
  now: 'bg-brand-teal',
  review: 'bg-status-warning',
  prep: 'bg-status-info',
  later: 'bg-neutral-border',
}

const statusLabel: Record<AttentionQueueSectionId, string> = {
  now: 'Live',
  review: 'Review',
  prep: 'Prep',
  later: 'Later',
}

export function AttentionQueueRow({
  meeting,
  sectionId,
  isSelected,
  onSelect,
}: AttentionQueueRowProps) {
  const preview = getMeetingQueuePreview(meeting)
  const needsAttention = preview.priority === 'high' || preview.riskLevel === 'high'

  return (
    <button
      type="button"
      onClick={() => onSelect(meeting.id)}
      className={queueCardClass(isSelected)}
    >
      <div className="flex items-start gap-2">
        <span
          className={`mt-[0.4375rem] h-1.5 w-1.5 shrink-0 rounded-full ${statusDot[sectionId]}`}
          aria-hidden
        />

        <div className="min-w-0 flex-1">
          <p className={ws.queueCardTitle}>{meeting.title}</p>

          <p className={ws.queueCardMeta}>
            <span className={ws.queueCardMetaStrong}>{meeting.time}</span>
            <span className="text-neutral-border/80"> · </span>
            <span className="truncate">{meeting.host}</span>
          </p>

          <div className={ws.queueCardBadges}>
            <span className={wsBadge.neutral}>{statusLabel[sectionId]}</span>
            {needsAttention ? (
              <span className={wsBadge.danger}>Needs attention</span>
            ) : null}
          </div>

          <p className={ws.queueCardStats}>
            <span>{preview.decisionCount} decisions</span>
            <span>{preview.actionCount} actions</span>
          </p>
        </div>
      </div>
    </button>
  )
}
