import { useEffect, useState, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { workspaceAi } from '../../design-system/workspace'

interface WorkspaceFloatingPanelProps {
  open: boolean
  width: number
  x: number
  y: number
  panelRef?: RefObject<HTMLDivElement | null>
  onResizeStart: (event: ReactPointerEvent<HTMLDivElement>) => void
  children: ReactNode
}

/** Floating AI panel shell — portaled to document.body, drag target and resize handle. */
export function WorkspaceFloatingPanel({
  open,
  width,
  x,
  y,
  panelRef,
  onResizeStart,
  children,
}: WorkspaceFloatingPanelProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <div
      ref={panelRef}
      className={`workspace-floating-panel fixed ${workspaceAi.zIndex} hidden lg:block ${
        open ? 'is-open' : ''
      }`}
      style={{ width: `${width}px`, left: `${x}px`, top: `${y}px` }}
    >
      <div
        className="workspace-floating-resize-handle"
        onPointerDown={onResizeStart}
        aria-hidden
      />
      {children}
    </div>,
    document.body,
  )
}
