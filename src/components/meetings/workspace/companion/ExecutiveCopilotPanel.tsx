import type { PointerEvent as ReactPointerEvent } from 'react'
import type { MeetingContext } from '../../../../types/meetingContext'
import { MeetingCopilotPanel } from '../../../workspace/copilot'

interface ExecutiveCopilotPanelProps {
  context: MeetingContext
  onDragStart: (event: ReactPointerEvent<HTMLElement>) => void
  onClose: () => void
}

/** @deprecated Import MeetingCopilotPanel from components/workspace/copilot */
export function ExecutiveCopilotPanel(props: ExecutiveCopilotPanelProps) {
  return <MeetingCopilotPanel {...props} />
}
