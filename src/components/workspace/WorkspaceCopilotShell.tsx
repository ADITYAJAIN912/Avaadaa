import type { ReactNode, PointerEvent as ReactPointerEvent } from 'react'
import { GripHorizontal, X } from 'lucide-react'
import { workspaceIcon, ws } from '../../design-system/workspace'

interface WorkspaceCopilotHeaderProps {
  title: string
  contextLabel: string
  onDragStart: (event: ReactPointerEvent<HTMLElement>) => void
  onClose: () => void
  titleId?: string
}

/** Shared draggable header for floating AI panels. */
export function WorkspaceCopilotHeader({
  title,
  contextLabel,
  onDragStart,
  onClose,
  titleId = 'copilot-title',
}: WorkspaceCopilotHeaderProps) {
  return (
    <header
      className="cursor-grab select-none flex items-center justify-between gap-3 border-b border-neutral-border/70 px-3 py-2.5 active:cursor-grabbing"
      onPointerDown={onDragStart}
    >
      <div className="min-w-0">
        <p className={ws.eyebrow}>Avaada AI</p>
        <h3 id={titleId} className={ws.copilotTitle}>
          {title}
        </h3>
        <p className="mt-0.5 truncate text-micro text-neutral-muted">{contextLabel}</p>
      </div>
      <div className="flex items-center gap-1">
        <GripHorizontal
          className={`${workspaceIcon.sm} text-neutral-muted/80`}
          strokeWidth={workspaceIcon.strokeBold}
          aria-hidden
        />
        <button
          type="button"
          onClick={onClose}
          onPointerDown={(event) => event.stopPropagation()}
          className={`${ws.interactive} rounded-md p-1.5 text-neutral-muted hover:bg-surface-sunken/70`}
          aria-label="Close Avaada AI panel"
        >
          <X className={workspaceIcon.md} />
        </button>
      </div>
    </header>
  )
}

interface WorkspaceCopilotShellProps {
  title: string
  contextLabel: string
  onDragStart: (event: ReactPointerEvent<HTMLElement>) => void
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  hints?: ReactNode
  titleId?: string
}

/** Shared AI panel chrome — header, optional hints, scroll body, optional footer. */
export function WorkspaceCopilotShell({
  title,
  contextLabel,
  onDragStart,
  onClose,
  children,
  footer,
  hints,
  titleId,
}: WorkspaceCopilotShellProps) {
  return (
    <aside
      className="workspace-copilot-panel panel-surface flex h-full min-h-0 w-full flex-col border-neutral-border/70 bg-white"
      aria-labelledby={titleId ?? 'copilot-title'}
    >
      <WorkspaceCopilotHeader
        title={title}
        contextLabel={contextLabel}
        onDragStart={onDragStart}
        onClose={onClose}
        titleId={titleId}
      />
      {hints ? (
        <div className="border-b border-neutral-border/70 px-3 py-2">{hints}</div>
      ) : null}
      <div className="workspace-scroll flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {children}
      </div>
      {footer ? (
        <footer className="space-y-2 border-t border-neutral-border/70 px-3 py-2.5">
          {footer}
        </footer>
      ) : null}
    </aside>
  )
}
