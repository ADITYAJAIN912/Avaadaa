import type { ActionItem } from '../../data/mockActionItems'
import { KanbanColumn } from './KanbanColumn'

const columns: ActionItem['status'][] = ['Pending', 'In Process', 'Blocked', 'Done']

interface KanbanBoardProps {
  items: ActionItem[]
}

export function KanbanBoard({ items }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {columns.map((status) => (
        <KanbanColumn
          key={status}
          title={status}
          items={items.filter((i) => i.status === status)}
        />
      ))}
    </div>
  )
}
