import { useMemo, type PointerEvent as ReactPointerEvent } from 'react'
import type { MeetingContext } from '../../../types/meetingContext'
import { AvaadaCopilotPanel } from './AvaadaCopilotPanel'
import { createMeetingCopilotConfig } from './meetingCopilot'

interface MeetingCopilotPanelProps {
  context: MeetingContext
  onDragStart: (event: ReactPointerEvent<HTMLElement>) => void
  onClose: () => void
}

export function MeetingCopilotPanel({
  context,
  onDragStart,
  onClose,
}: MeetingCopilotPanelProps) {
  const config = useMemo(() => createMeetingCopilotConfig(context), [context])

  return <AvaadaCopilotPanel config={config} onDragStart={onDragStart} onClose={onClose} />
}
