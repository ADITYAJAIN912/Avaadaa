import { memo } from 'react'
import type { ActionItem } from '../../types/actionItem'
import { ActionStatusBadge, PriorityBadge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { getActionPriority, getRelativeDue, dueToneClass } from '../../utils/actionItemMeta'

interface KanbanCardProps {
  item: ActionItem
}

export const KanbanCard = memo(function KanbanCard({ item }: KanbanCardProps) {
  const due = getRelativeDue(item)
  const priority = getActionPriority(item)

  return (
    <Card variant="interactive" className="cursor-default p-3">
      <p className="line-clamp-2 text-body font-medium text-neutral-text">
        {item.meetingTitle}
      </p>
      <p className="mt-1.5 text-meta">
        <span className={dueToneClass(due.tone)}>{due.label}</span>
        <span> · {due.detail}</span>
      </p>
      <div className="badge-group mt-2">
        <ActionStatusBadge status={item.status} />
        <PriorityBadge priority={priority} />
      </div>
      <span className="mt-2 inline-flex rounded-lg bg-neutral-bg/90 px-2 py-0.5 text-caption text-neutral-muted ring-1 ring-neutral-border/50">
        {item.actionsCount} actions · {item.openCount} open
      </span>
    </Card>
  )
})
