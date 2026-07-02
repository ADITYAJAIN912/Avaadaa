import { ws } from '../../../design-system/workspace'
import type { CopilotMessage, CopilotResponseBlock } from './copilotTypes'

interface CopilotMessageListProps {
  messages: CopilotMessage[]
  followUps: string[]
  onFollowUp: (label: string) => void
}

function BlockRenderer({ block }: { block: CopilotResponseBlock }) {
  if (block.type === 'summary') {
    return (
      <article className="card-surface rounded-lg px-3 py-2.5">
        <p className={ws.label}>{block.title}</p>
        <p className="mt-1 text-small text-neutral-text">{block.content}</p>
      </article>
    )
  }

  if (block.type === 'decision') {
    return (
      <article className="card-surface rounded-lg px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-caption font-semibold text-neutral-text">{block.title}</p>
          <span className="workspace-badge workspace-badge-info">{block.status}</span>
        </div>
        <p className="mt-1 text-caption text-neutral-muted">Owner: {block.owner}</p>
        <p className="mt-1 text-small text-neutral-text">{block.businessImpact}</p>
      </article>
    )
  }

  if (block.type === 'action') {
    return (
      <article className="card-surface rounded-lg px-3 py-2.5">
        <p className={ws.label}>Action card</p>
        <p className="mt-1 text-caption font-semibold text-neutral-text">{block.title}</p>
        <p className="mt-1 text-caption text-neutral-muted">
          {block.owner} · Due {block.dueDate} · {block.priority}
        </p>
      </article>
    )
  }

  if (block.type === 'list') {
    return (
      <article className="card-surface rounded-lg px-3 py-2.5">
        <p className={ws.label}>{block.title}</p>
        <ul className="mt-1.5 space-y-1">
          {block.items.map((item) => (
            <li key={item} className="text-small text-neutral-text">
              • {item}
            </li>
          ))}
        </ul>
      </article>
    )
  }

  if (block.type === 'timeline') {
    return (
      <article className="card-surface rounded-lg px-3 py-2.5">
        <p className={ws.label}>{block.title}</p>
        <ul className="mt-1.5 space-y-1.5">
          {block.items.map((item) => (
            <li key={item.label} className="text-caption text-neutral-text">
              <span className="font-medium">{item.label}</span>
              <span className="text-neutral-muted"> · {item.detail}</span>
            </li>
          ))}
        </ul>
      </article>
    )
  }

  return (
    <article className="card-surface rounded-lg px-3 py-2.5">
      <p className={ws.label}>{block.title}</p>
      <div className="mt-1.5 overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-1 text-left text-caption">
          <thead>
            <tr className="text-neutral-muted">
              {block.columns.map((column) => (
                <th key={column} className="px-2 py-1 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, index) => (
              <tr key={`${row[0]}-${index}`} className="rounded bg-surface-sunken/50 text-neutral-text">
                {row.map((cell) => (
                  <td key={cell} className="px-2 py-1">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

export function CopilotMessageList({ messages, followUps, onFollowUp }: CopilotMessageListProps) {
  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <article key={message.id} className="space-y-2">
          <div
            className={`rounded-lg px-3 py-2 ${
              message.role === 'assistant'
                ? 'bg-surface-sunken/45 text-neutral-text'
                : 'ml-auto max-w-[90%] bg-brand-tealLight/70 text-neutral-text'
            }`}
          >
            <p className="text-caption font-medium">
              {message.role === 'assistant' ? 'Avaada AI' : 'You'}
            </p>
            {message.prompt ? <p className="mt-0.5 text-small">{message.prompt}</p> : null}
          </div>

          {message.blocks?.length ? (
            <div className="space-y-2">
              {message.blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </div>
          ) : null}
        </article>
      ))}

      {messages.length > 0 ? (
        <div className="pt-1">
          <p className={`${ws.label} mb-1.5`}>Follow up</p>
          <div className="flex flex-wrap gap-1.5">
            {followUps.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onFollowUp(item)}
                className={`chip chip-inactive ${ws.interactive} !h-7 !rounded-md !px-2.5 !text-micro`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
