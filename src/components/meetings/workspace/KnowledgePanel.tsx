import {
  BookOpen,
  Calendar,
  CheckSquare,
  ChevronRight,
  FileText,
  FolderKanban,
  GitBranch,
  Link2,
  Users,
  Video,
} from 'lucide-react'
import type { MeetingContext } from '../../../types/meetingContext'
import { WorkspaceContextGroupTitle, WorkspaceEmptyState } from '../../workspace'
import { ws, wsBadge } from './workspaceUi'

interface KnowledgePanelProps {
  context: MeetingContext | null
  onSelectMeeting?: (meetingId: string) => void
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function KnowledgePanel({ context, onSelectMeeting }: KnowledgePanelProps) {
  return (
    <aside
      className="panel-surface hidden h-full min-h-0 min-w-0 w-full flex-col lg:flex"
      aria-label="Knowledge panel"
    >
      <div className={ws.panelHd}>
        <h2 className={ws.panelTitle}>Knowledge</h2>
        <p className={ws.meta}>
          {context ? 'Related context & linked assets' : 'Select a meeting to view related context'}
        </p>
      </div>

      <div className={ws.panelBd}>
        {!context ? (
          <WorkspaceEmptyState
            icon={<BookOpen className="h-5 w-5" strokeWidth={1.75} aria-hidden />}
            title="Knowledge context appears here"
            description="After selecting a meeting, this panel shows related meetings, decision threads, projects, documents, people, and AI context."
          >
            <ul className="mt-3 flex max-w-[16rem] flex-wrap justify-center gap-1.5">
              <li className="workspace-stat rounded-md bg-white/70 px-2 py-1">Related meetings</li>
              <li className="workspace-stat rounded-md bg-white/70 px-2 py-1">Decision threads</li>
              <li className="workspace-stat rounded-md bg-white/70 px-2 py-1">Projects & documents</li>
              <li className="workspace-stat rounded-md bg-white/70 px-2 py-1">People & AI context</li>
            </ul>
          </WorkspaceEmptyState>
        ) : (
          <div key={context.id} className={`${ws.contextEnter} ${ws.contextStack}`}>
            <div className="workspace-knowledge-group">
              <p className={`line-clamp-2 ${ws.contextItemTitle}`}>{context.title}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-md bg-white/70 px-2.5 py-2">
                  <p className={ws.label}>Decisions</p>
                  <p className="mt-1 text-body font-medium tabular-nums text-neutral-text">
                    {context.decisions.length}
                  </p>
                </div>
                <div className="rounded-md bg-white/70 px-2.5 py-2">
                  <p className={ws.label}>Actions</p>
                  <p className="mt-1 text-body font-medium tabular-nums text-neutral-text">
                    {context.commitments.length}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="workspace-stat rounded-md bg-white/60 px-1.5 py-0.5">
                  <Calendar className="h-3 w-3" strokeWidth={1.75} aria-hidden />
                  {context.date}
                </span>
                <span className="workspace-stat rounded-md bg-white/60 px-1.5 py-0.5">
                  <Video className="h-3 w-3" strokeWidth={1.75} aria-hidden />
                  {context.platform}
                </span>
                <span className="workspace-stat rounded-md bg-white/60 px-1.5 py-0.5">
                  <Users className="h-3 w-3" strokeWidth={1.75} aria-hidden />
                  {context.attendees.length}
                </span>
              </div>
            </div>

            <div className="workspace-knowledge-group">
              <p className={`mb-3 ${ws.contextGroupTitle}`}>Cross-meeting context</p>

              {context.intelligence.crossMeeting.chain.length > 0 && (
                <div className="mb-3">
                  <p className={ws.label}>Decision chain</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1 text-small text-neutral-text">
                    {context.intelligence.crossMeeting.chain.map((node, index) => (
                      <span key={node.id} className="inline-flex items-center gap-1">
                        {index > 0 && <span className="text-neutral-muted">→</span>}
                        <button
                          type="button"
                          onClick={() => onSelectMeeting?.(node.meetingId)}
                          className={`${ws.interactive} font-medium hover:text-brand-teal`}
                        >
                          {node.title}
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {context.intelligence.crossMeeting.sharedDecisions.length > 0 && (
                <div className="mb-3">
                  <p className={ws.label}>Shared decisions</p>
                  <ul className="mt-1 space-y-0.5">
                    {context.intelligence.crossMeeting.sharedDecisions.slice(0, 3).map((d) => (
                      <li key={d} className={`${ws.meta} leading-snug`}>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {context.intelligence.crossMeeting.repeatedTopics.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1">
                  {context.intelligence.crossMeeting.repeatedTopics.map((topic) => (
                    <span key={topic} className="workspace-stat rounded-md bg-white/60 px-1.5 py-0.5">
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <WorkspaceContextGroupTitle
                icon={Link2}
                label="Related meetings"
                count={context.linkedMeetings.length}
              />
              {context.linkedMeetings.length === 0 ? (
                <p className={`${ws.meta} mb-3`}>None linked</p>
              ) : (
                <div className={`${ws.contextGroupBody} mb-3`}>
                  {context.linkedMeetings.map((meeting) => (
                    <button
                      key={meeting.id}
                      type="button"
                      onClick={() => onSelectMeeting?.(meeting.id)}
                      className={`${ws.knowledgeItem} group`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className={`truncate ${ws.metaStrong}`}>{meeting.title}</p>
                        <p className={`mt-0.5 tabular-nums ${ws.meta}`}>
                          {meeting.date} · {meeting.time}
                        </p>
                      </div>
                      <ChevronRight
                        className="h-3.5 w-3.5 shrink-0 text-neutral-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-teal"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </button>
                  ))}
                </div>
              )}

              <WorkspaceContextGroupTitle
                icon={GitBranch}
                label="Decision threads"
                count={context.relatedThreads.length}
              />
              <div className={`${ws.contextGroupBody} mb-3`}>
                {context.relatedThreads.map((thread) => (
                  <div
                    key={thread.id}
                    className="workspace-card workspace-card-lift cursor-default p-2"
                  >
                    <p className={`truncate ${ws.metaStrong}`}>{thread.title}</p>
                    <span className={`mt-1 ${wsBadge.neutral}`}>{thread.status}</span>
                  </div>
                ))}
              </div>

              <WorkspaceContextGroupTitle
                icon={Users}
                label="People involved"
                count={context.peopleMentioned.length}
              />
              <div className={ws.contextGroupBody}>
                {context.peopleMentioned.map((person) => (
                  <div key={person.name} className={`${ws.knowledgeItem} cursor-default`}>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-tealLight/80 text-micro font-semibold text-brand-teal">
                      {initials(person.name)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className={`block truncate ${ws.metaStrong}`}>{person.name}</span>
                      {person.role && <span className={ws.meta}>{person.role}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="workspace-knowledge-group">
              <p className={`mb-3 ${ws.contextGroupTitle}`}>Assets</p>

              <WorkspaceContextGroupTitle icon={FolderKanban} label="Linked projects" />
              {context.linkedProjects.length === 0 ? (
                <p className={`mb-3 ${ws.meta}`}>None linked</p>
              ) : (
                <div className="mb-3 flex flex-wrap gap-1">
                  {context.linkedProjects.map((project) => (
                    <span key={project.id} className={wsBadge.accent}>
                      {project.name}
                    </span>
                  ))}
                </div>
              )}

              <WorkspaceContextGroupTitle
                icon={FileText}
                label="Related documents"
                count={context.relatedDocuments.length}
              />
              {context.relatedDocuments.length === 0 ? (
                <p className={ws.meta}>None attached</p>
              ) : (
                <div className={ws.contextGroupBody}>
                  {context.relatedDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className={`${ws.knowledgeItem} cursor-default`}
                    >
                      <FileText className="h-3.5 w-3.5 shrink-0 text-neutral-muted" strokeWidth={1.75} aria-hidden />
                      <p className={`min-w-0 flex-1 truncate ${ws.metaStrong}`}>{doc.title}</p>
                      <span className="workspace-stat shrink-0">{doc.type}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {context.commitments.length > 0 && (
              <div className="workspace-knowledge-group bg-brand-tealLight/25">
                <div className="mb-2 flex items-center gap-1.5">
                  <CheckSquare className="h-3.5 w-3.5 text-brand-teal" strokeWidth={1.75} aria-hidden />
                  <h3 className="text-micro font-semibold uppercase tracking-wider text-brand-teal">
                    Open commitments
                  </h3>
                </div>
                <ul className={ws.contextGroupBody}>
                  {context.commitments.slice(0, 3).map((c) => (
                    <li key={c.id} className="text-small leading-snug text-neutral-text">
                      <span className="font-medium">{c.owner}</span>
                      <span className="text-neutral-muted"> — {c.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
