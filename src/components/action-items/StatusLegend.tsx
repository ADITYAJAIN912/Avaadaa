import type { ActionItem } from '../../data/mockActionItems'

const legendItems: { status: ActionItem['status']; color: string; show: boolean }[] = [
  { status: 'Blocked', color: 'bg-status-danger', show: true },
  { status: 'Pending', color: 'bg-status-warning', show: true },
  { status: 'In Process', color: 'bg-status-info', show: true },
  { status: 'Done', color: 'bg-status-success', show: false },
]

export function StatusLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-muted">
      {legendItems
        .filter((item) => item.show)
        .map((item) => (
          <span key={item.status} className="inline-flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${item.color}`} aria-hidden />
            {item.status}
          </span>
        ))}
    </div>
  )
}
