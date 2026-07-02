import { useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Bot, SendHorizontal, Sparkles } from 'lucide-react'
import { workspaceIcon, ws } from '../../../design-system/workspace'
import { WorkspaceCopilotShell } from '../WorkspaceCopilotShell'
import { CopilotMessageList } from './CopilotMessageList'
import { CopilotPromptCards } from './CopilotPromptCards'
import type { AvaadaCopilotConfig, CopilotMessage } from './copilotTypes'

interface AvaadaCopilotPanelProps {
  config: AvaadaCopilotConfig
  onDragStart: (event: ReactPointerEvent<HTMLElement>) => void
  onClose: () => void
}

/** Shared Avaada AI Assistant UI — context supplied via config only. */
export function AvaadaCopilotPanel({ config, onDragStart, onClose }: AvaadaCopilotPanelProps) {
  const [messages, setMessages] = useState<CopilotMessage[]>([])

  useEffect(() => {
    setMessages([])
  }, [config.contextId])

  const addInteraction = (label: string) => {
    const token = `${Date.now()}-${Math.round(Math.random() * 100000)}`
    const nextMessage: CopilotMessage[] = [
      { id: `u-${token}`, role: 'user', prompt: label },
      {
        id: `a-${token}`,
        role: 'assistant',
        blocks: config.buildResponse(label.toLowerCase()),
      },
    ]
    setMessages((prev) => [...prev, ...nextMessage])
  }

  return (
    <WorkspaceCopilotShell
      title="Avaada AI Assistant"
      contextLabel={config.contextLabel}
      onDragStart={onDragStart}
      onClose={onClose}
      hints={
        <div className="flex flex-wrap gap-1.5">
          {config.contextHints.map((hint) => (
            <span
              key={hint}
              className="workspace-badge workspace-badge-neutral normal-case tracking-normal"
            >
              {hint}
            </span>
          ))}
        </div>
      }
      footer={
        <>
          <div className="flex flex-wrap gap-1.5">
            {config.quickActions.map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => addInteraction(action)}
                className={`chip chip-inactive ${ws.interactive} !h-7 !rounded-md !px-2.5 !text-micro`}
              >
                {action}
              </button>
            ))}
          </div>

          <div className={ws.inputBar}>
            <Sparkles
              className={`${workspaceIcon.sm} shrink-0 text-brand-teal`}
              strokeWidth={workspaceIcon.stroke}
              aria-hidden
            />
            <input
              aria-label="Copilot input"
              placeholder={config.inputPlaceholder}
            />
            <button
              type="button"
              onClick={() => addInteraction(config.defaultSendPrompt)}
              className={`${ws.interactive} shrink-0 rounded-md p-1.5 text-brand-teal hover:bg-brand-tealLight/60`}
              aria-label="Send Avaada AI prompt"
            >
              <SendHorizontal className={workspaceIcon.md} strokeWidth={workspaceIcon.stroke} />
            </button>
          </div>

          <p className="flex items-center gap-1 text-micro text-neutral-muted">
            <Bot className="h-3 w-3" strokeWidth={workspaceIcon.stroke} aria-hidden />
            UI-only Avaada AI mock. No backend calls.
          </p>
        </>
      }
    >
      {messages.length === 0 ? (
        <CopilotPromptCards
          heading={config.promptHeading}
          prompts={config.starterPrompts}
          onSelect={(item) => addInteraction(item.label)}
        />
      ) : null}
      <CopilotMessageList
        messages={messages}
        followUps={[...config.followUps]}
        onFollowUp={addInteraction}
      />
    </WorkspaceCopilotShell>
  )
}
