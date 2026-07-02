export type CopilotRole = 'assistant' | 'user'

export type CopilotResponseBlock =
  | { id: string; type: 'summary'; title: string; content: string }
  | {
      id: string
      type: 'decision'
      title: string
      status: string
      owner: string
      businessImpact: string
    }
  | { id: string; type: 'action'; title: string; owner: string; dueDate: string; priority: string }
  | { id: string; type: 'list'; title: string; items: string[] }
  | { id: string; type: 'timeline'; title: string; items: { label: string; detail: string }[] }
  | { id: string; type: 'table'; title: string; columns: string[]; rows: string[][] }

export interface CopilotMessage {
  id: string
  role: CopilotRole
  prompt?: string
  blocks?: CopilotResponseBlock[]
}

export interface CopilotSuggestion {
  id: string
  label: string
}

export interface AvaadaCopilotConfig {
  contextId: string
  contextLabel: string
  contextHints: string[]
  promptHeading: string
  starterPrompts: CopilotSuggestion[]
  quickActions: readonly string[]
  followUps: readonly string[]
  inputPlaceholder: string
  defaultSendPrompt: string
  buildResponse: (promptLabel: string) => CopilotResponseBlock[]
}
