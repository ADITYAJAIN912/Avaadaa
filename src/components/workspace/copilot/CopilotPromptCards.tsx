import { Sparkles } from 'lucide-react'
import { ws } from '../../../design-system/workspace'
import type { CopilotSuggestion } from './copilotTypes'

interface CopilotPromptCardsProps {
  heading: string
  prompts: CopilotSuggestion[]
  onSelect: (prompt: CopilotSuggestion) => void
}

export function CopilotPromptCards({ heading, prompts, onSelect }: CopilotPromptCardsProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-brand-teal" strokeWidth={1.8} aria-hidden />
        <h3 className={ws.sectionTitle}>{heading}</h3>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {prompts.map((prompt) => (
          <button
            key={prompt.id}
            type="button"
            onClick={() => onSelect(prompt)}
            className={`card-surface-interactive ${ws.interactive} rounded-lg px-3 py-2.5 text-left`}
          >
            <p className="text-small font-medium text-neutral-text">{prompt.label}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
