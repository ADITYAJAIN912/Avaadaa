import { memo, useState } from 'react'
import { ChevronRight, ExternalLink, Video } from 'lucide-react'
import type { ActionItem } from '../../types/actionItem'
import { ActionStatusBadge, PriorityBadge } from '../ui/Badge'
import { dueToneClass, getActionPriority, getRelativeDue } from '../../utils/actionItemMeta'

const statusBarColors: Record<ActionItem['status'], string> = {
  Blocked: 'bg-status-danger',
  Pending: 'bg-status-warning',
  'In Process': 'bg-status-info',
  Done: 'bg-neutral-border',
}

interface ActionItemRowProps {
  item: ActionItem
}

export const ActionItemRow = memo(function ActionItemRow({ item }: ActionItemRowProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const isDone = item.status === 'Done'
  const isBlocked = item.status === 'Blocked'
  const actionLabel = `${item.actionsCount} action${item.actionsCount !== 1 ? 's' : ''} · ${item.openCount} open`
  const due = getRelativeDue(item)
  const priority = getActionPriority(item)
  const isOverdue = due.tone === 'overdue' && !isDone

  const rowClass = [
    isDone ? 'row-completed' : '',
    isOverdue ? 'row-overdue' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileExpanded((prev) => !prev)}
        className={`row-interactive focus-ring flex min-h-[3.5rem] w-full items-center gap-3 px-4 py-2.5 text-left last:border-0 md:hidden ${rowClass}`}
      >
        <span className={`h-2 w-2 shrink-0 rounded-full ${statusBarColors[item.status]}`} />
        <span className="min-w-0 flex-1 truncate text-body font-medium text-neutral-text">
          {item.meetingTitle}
        </span>
        <PriorityBadge priority={priority} className="shrink-0" />
        <span className={`shrink-0 text-caption tabular-nums ${dueToneClass(due.tone)}`}>
          {due.label}
        </span>
      </button>

      {mobileExpanded && (
        <div className={`border-b border-neutral-border/60 bg-neutral-bg/60 px-4 py-2.5 md:hidden ${rowClass}`}>
          <div className="badge-group">
            <ActionStatusBadge status={item.status} />
            <PriorityBadge priority={priority} />
          </div>
          <p className="mt-2 text-meta">{due.detail}</p>
          <p className="mt-0.5 text-meta">{actionLabel}</p>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="focus-ring mt-2 inline-flex items-center gap-1 rounded-lg border border-neutral-border/70 bg-white px-2.5 py-1 text-caption font-medium text-brand-teal ease-premium hover:border-brand-teal/30 hover:bg-brand-tealLight/30"
          >
            Open meeting
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}

      <div
        className={`group row-interactive hidden min-h-[3.5rem] items-center gap-3 px-4 py-2.5 last:border-0 md:flex ${rowClass}`}
      >
        <div
          className={`h-7 w-1 shrink-0 rounded-full ${statusBarColors[item.status]} ${isBlocked ? 'opacity-100' : 'opacity-90'}`}
        />

        <Video className="h-4 w-4 shrink-0 text-neutral-muted/80" aria-hidden strokeWidth={1.75} />

        <div className="min-w-0 flex-1">
          <p className="truncate text-body font-medium text-neutral-text">
            {item.meetingTitle}
          </p>
          <p className="mt-0.5 text-meta">
            <span className={dueToneClass(due.tone)}>{due.label}</span>
            <span> · {due.detail}</span>
          </p>
        </div>

        <div className="badge-group hidden shrink-0 lg:flex">
          <ActionStatusBadge status={item.status} />
          <PriorityBadge priority={priority} />
        </div>

        <span className="hidden h-6 shrink-0 items-center whitespace-nowrap rounded-lg bg-neutral-bg/90 px-2.5 text-caption leading-none text-neutral-muted ring-1 ring-neutral-border/50 xl:inline-flex">
          {actionLabel}
        </span>

        <button
          type="button"
          className="focus-ring hidden rounded-lg p-1.5 text-neutral-muted ease-premium hover:bg-white hover:text-neutral-text lg:block"
          aria-label="View details"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="focus-ring inline-flex h-7 shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-2 text-caption font-medium leading-none text-brand-teal ease-premium hover:bg-brand-tealLight/30"
        >
          <span className="hidden sm:inline">Open meeting</span>
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
        </a>
      </div>
    </>
  )
})
