import type { ReactNode } from 'react'
import { ws, wsCount } from './workspaceUi'

interface WorkspaceSectionProps {
  title: string
  question?: string
  children: ReactNode
  count?: number
  variant?: 'default' | 'hero'
}

export function WorkspaceSection({
  title,
  question,
  children,
  count,
  variant = 'default',
}: WorkspaceSectionProps) {
  const isHero = variant === 'hero'

  return (
    <section>
      <div className={ws.sectionHd}>
        <div className="min-w-0">
          <h3 className={ws.sectionTitle}>{title}</h3>
          {question && (
            <p className={isHero ? ws.sectionQuestionHero : ws.sectionQuestion}>
              {question}
            </p>
          )}
        </div>
        {count !== undefined ? <span className={wsCount}>{count}</span> : null}
      </div>
      {children}
    </section>
  )
}
