import type { ReactNode } from 'react'

interface WorkspaceEmptyStateProps {
  icon?: ReactNode
  title: string
  description?: ReactNode
  children?: ReactNode
  className?: string
}

/** Shared empty state for queue, center, and context panels. */
export function WorkspaceEmptyState({
  icon,
  title,
  description,
  children,
  className = '',
}: WorkspaceEmptyStateProps) {
  return (
    <div className={`workspace-empty ${className}`}>
      {icon ? <div className="workspace-empty-icon">{icon}</div> : null}
      <p className={icon ? 'workspace-empty-title' : 'workspace-empty-title !mt-0'}>{title}</p>
      {description ? <p className="workspace-empty-description">{description}</p> : null}
      {children}
    </div>
  )
}
