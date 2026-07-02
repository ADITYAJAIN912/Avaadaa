import type { LucideIcon } from 'lucide-react'
import { workspaceIcon, ws, wsCount } from '../../design-system/workspace'

interface WorkspaceContextGroupTitleProps {
  icon: LucideIcon
  label: string
  count?: number
  className?: string
}

/** Shared context-panel group header — icon, eyebrow label, optional count. */
export function WorkspaceContextGroupTitle({
  icon: Icon,
  label,
  count,
  className = '',
}: WorkspaceContextGroupTitleProps) {
  return (
    <div className={`${ws.groupHd} ${ws.contextGroupHd} ${className}`}>
      <div className="flex min-w-0 items-center gap-1.5">
        <Icon
          className={`${workspaceIcon.sm} shrink-0 text-neutral-muted`}
          strokeWidth={workspaceIcon.stroke}
          aria-hidden
        />
        <h3 className={ws.contextGroupTitle}>{label}</h3>
      </div>
      {count !== undefined ? <span className={wsCount}>{count}</span> : null}
    </div>
  )
}
