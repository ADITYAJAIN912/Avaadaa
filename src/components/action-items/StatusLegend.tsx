import type { ActionItem } from '../../data/mockActionItems'

const legendItems: { status: ActionItem['status']; color: string; show: boolean }[] = [
  { status: 'Blocked', color: 'bg-status-danger', show: true },
  { status: 'Pending', color: 'bg-status-warning', show: true },
  { status: 'In Process', color: 'bg-status-info', show: true },
  { status: 'Done', color: 'bg-status-success', show: false },
]

export function StatusLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-neutral-border/60 bg-white/80 px-3.5 py-2 text-caption text-neutral-muted shadow-elevation-1">
      {legendItems
        .filter((item) => item.show)
        .map((item) => (
          <span key={item.status} className="inline-flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${item.color}`} aria-hidden />
            {item.status}
          </span>
        ))}
    </div>
  )
}
