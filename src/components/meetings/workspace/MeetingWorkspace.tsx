import { useEffect, useRef } from 'react'
import {
  CheckSquare,
  FileText,
  GitBranch,
  LayoutTemplate,
  Sparkles,
} from 'lucide-react'
import type { MeetingContext } from '../../../types/meetingContext'
import { formatDisplayDate } from '../../../utils/helpers'
import { MeetingWorkspaceContent } from './MeetingWorkspaceContent'
import { ReviewFooter } from './review/ReviewFooter'
import { WorkspaceEmptyState } from '../../workspace'
import { ws, wsBadge } from './workspaceUi'

interface MeetingWorkspaceProps {
  context: MeetingContext | null
}

const emptyStateItems = [
  {
    icon: Sparkles,
    title: 'Review summaries',
    description: 'Start with outcomes, not raw transcript detail.',
  },
  {
    icon: GitBranch,
    title: 'Validate critical decisions',
    description: 'Confirm ownership, dependencies, and impact.',
  },
  {
    icon: CheckSquare,
    title: 'Approve commitments',
    description: 'Move accountable actions forward with clear owners.',
  },
  {
    icon: FileText,
    title: 'Understand business risks',
    description: 'Review inline risk signals before final approval.',
  },
] as const

const statusLabel: Record<MeetingContext['status'], string> = {
  completed: 'Completed',
  scheduled: 'Scheduled',
  upcoming: 'Upcoming',
  live: 'Live',
}

const statusTone: Record<MeetingContext['status'], string> = {
  completed: wsBadge.neutral,
  scheduled: wsBadge.accent,
  upcoming: wsBadge.info,
  live: wsBadge.accent,
}

export function MeetingWorkspace({ context }: MeetingWorkspaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [context?.id])

  return (
    <main className="panel-surface flex min-h-0 min-w-0 w-full flex-col" aria-label="Meeting workspace">
      {context ? (
        <div key={context.id} className={`flex min-h-0 flex-1 flex-col ${ws.contextEnter}`}>
          <div className={ws.panelHd}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className={ws.eyebrow}>AI review workspace</p>
                <h2 className={ws.workspaceTitle}>{context.title}</h2>
                <p className={ws.meta}>
                  <span className={`tabular-nums ${ws.metaStrong}`}>
                    {formatDisplayDate(context.date)} · {context.duration}
                  </span>
                  <span className="text-neutral-border/80"> · </span>
                  {context.organizer}
                </p>
              </div>
              <span className={`shrink-0 normal-case tracking-normal ${statusTone[context.status]}`}>
                {statusLabel[context.status]}
              </span>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div ref={scrollRef} className={ws.panelBd}>
              <MeetingWorkspaceContent context={context} />
            </div>
            <ReviewFooter recommendations={context.intelligence.recommendations} />
          </div>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col px-4 py-5">
          <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center">
            <WorkspaceEmptyState
              icon={<LayoutTemplate className="h-5 w-5" strokeWidth={1.75} aria-hidden />}
              title="Select a meeting"
              description="The workspace helps you understand what changed, what matters, and what requires a decision in under 10 seconds."
              className="border-0 bg-transparent p-0"
            />

            <ul className="mt-4 space-y-1.5">
              {emptyStateItems.map(({ icon: Icon, title, description }) => (
                <li key={title} className={`${ws.cardLift} flex gap-2.5`}>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/80 text-neutral-muted">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className={ws.sectionTitle}>{title}</p>
                    <p className={`mt-0.5 ${ws.meta}`}>{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  )
}
