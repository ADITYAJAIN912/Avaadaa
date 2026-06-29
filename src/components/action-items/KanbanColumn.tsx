import type { ActionItem } from '../../data/mockActionItems'
import { KanbanCard } from './KanbanCard'

const columnColors: Record<string, string> = {
  Pending: 'border-status-warning',
  'In Process': 'border-status-info',
  Blocked: 'border-status-danger',
  Done: 'border-status-success',
}

interface KanbanColumnProps {
  title: ActionItem['status']
  items: ActionItem[]
}

export function KanbanColumn({ title, items }: KanbanColumnProps) {
  return (
    <div
      className={`flex w-72 shrink-0 flex-col rounded-xl border border-neutral-border border-t-4 bg-neutral-bg/50 shadow-sm ${columnColors[title]}`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-body font-semibold text-neutral-text">{title}</h3>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-caption font-medium text-neutral-muted shadow-sm">
          {items.length}
        </span>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto px-3 pb-3">
        {items.map((item) => (
          <KanbanCard key={item.id} item={item} />
        ))}
        {items.length === 0 && (
          <p className="py-6 text-center text-caption text-neutral-muted">No items</p>
        )}
      </div>
    </div>
  )
}
