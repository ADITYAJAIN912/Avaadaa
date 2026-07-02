import { useMemo, type PointerEvent as ReactPointerEvent } from 'react'
import type { ActionWorkspaceItem } from '../../../types/actionWorkspace'
import { AvaadaCopilotPanel } from './AvaadaCopilotPanel'
import { createActionCopilotConfig } from './actionCopilot'

interface ActionCopilotPanelProps {
  item: ActionWorkspaceItem
  onDragStart: (event: ReactPointerEvent<HTMLElement>) => void
  onClose: () => void
}

export function ActionCopilotPanel({ item, onDragStart, onClose }: ActionCopilotPanelProps) {
  const config = useMemo(() => createActionCopilotConfig(item), [item])

  return <AvaadaCopilotPanel config={config} onDragStart={onDragStart} onClose={onClose} />
}
