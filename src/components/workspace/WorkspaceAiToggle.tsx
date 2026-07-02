import { PanelRightClose, PanelRightOpen, Sparkles } from 'lucide-react'
import { workspaceIcon, ws } from '../../design-system/workspace'

interface WorkspaceAiToggleProps {
  open: boolean
  disabled?: boolean
  onClick: () => void
}

/** Standardized Avaada AI toggle — used in Meetings and Action Items headers. */
export function WorkspaceAiToggle({ open, disabled, onClick }: WorkspaceAiToggleProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={ws.aiToggle}
      aria-label={open ? 'Hide Avaada AI' : 'Ask Avaada AI'}
    >
      <Sparkles
        className={`${workspaceIcon.sm} text-brand-teal`}
        strokeWidth={workspaceIcon.strokeBold}
        aria-hidden
      />
      {open ? (
        <PanelRightClose
          className={workspaceIcon.sm}
          strokeWidth={workspaceIcon.strokeBold}
          aria-hidden
        />
      ) : (
        <PanelRightOpen
          className={workspaceIcon.sm}
          strokeWidth={workspaceIcon.strokeBold}
          aria-hidden
        />
      )}
      {open ? 'Hide Avaada AI' : 'Ask Avaada AI'}
    </button>
  )
}
