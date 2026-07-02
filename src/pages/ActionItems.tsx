import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Bot,
  Check,
  CheckSquare,
  CircleDot,
  Clock3,
  FileText,
  FolderKanban,
  GitBranch,
  Link2,
  ShieldAlert,
  Sparkles,
  Timer,
  UserRound,
  X,
} from 'lucide-react'
import { getActionWorkspaceItems } from '../data/mockActionWorkspace'
import type { ActionQueueGroup, ActionWorkspaceItem } from '../types/actionWorkspace'
import { departmentLabel } from '../types/workspace'
import { SearchInput } from '../components/ui/SearchInput'
import { SegmentedControl } from '../components/ui/SegmentedControl'
import { Button } from '../components/ui/Button'
import { WorkspaceSection } from '../components/meetings/workspace/WorkspaceSection'
import {
  useWorkspaceFloatingPanel,
  WorkspaceAiToggle,
  WorkspaceContextGroupTitle,
  WorkspaceEmptyState,
  WorkspaceFloatingPanel,
  WorkspacePageHeader,
} from '../components/workspace'
import { ActionCopilotPanel } from '../components/workspace/copilot'
import {
  priorityBadgeTone,
  queueCardClass,
  workspaceLayout,
  ws,
  wsBadge,
  wsCount,
} from '../components/meetings/workspace/workspaceUi'

type FilterTab = 'all' | 'open' | 'completed'

const TIMELINE_ICONS = [CircleDot, UserRound, Timer, ShieldAlert] as const

const GROUP_LABELS: Record<ActionQueueGroup, string> = {
  'needs-attention': 'Needs Attention',
  today: 'Today',
  'this-week': 'This Week',
  completed: 'Completed',
}

const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'completed', label: 'Completed' },
] as const

interface ActionAiPanelProps {
  item: ActionWorkspaceItem
  open: boolean
  width: number
  x: number
  y: number
  panelRef: React.RefObject<HTMLDivElement | null>
  onClose: () => void
  onDragStart: (event: React.PointerEvent<HTMLElement>) => void
  onResizeStart: (event: React.PointerEvent<HTMLDivElement>) => void
}

function ActionAiPanel({
  item,
  open,
  width,
  x,
  y,
  panelRef,
  onClose,
  onDragStart,
  onResizeStart,
}: ActionAiPanelProps) {
  return (
    <WorkspaceFloatingPanel
      open={open}
      width={width}
      x={x}
      y={y}
      panelRef={panelRef}
      onResizeStart={onResizeStart}
    >
      <ActionCopilotPanel item={item} onDragStart={onDragStart} onClose={onClose} />
    </WorkspaceFloatingPanel>
  )
}

export function ActionItems() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterTab>('all')
  const items = useMemo(() => getActionWorkspaceItems(), [])

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (filter === 'open' && item.status === 'Done') return false
      if (filter === 'completed' && item.status !== 'Done') return false
      if (!search) return true
      const q = search.toLowerCase()
      return item.title.toLowerCase().includes(q) || item.owner.toLowerCase().includes(q)
    })
  }, [items, filter, search])

  const grouped = useMemo(() => {
    const buckets: Record<ActionQueueGroup, ActionWorkspaceItem[]> = {
      'needs-attention': [],
      today: [],
      'this-week': [],
      completed: [],
    }
    for (const item of filtered) buckets[item.queueGroup].push(item)
    return buckets
  }, [filtered])

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = useMemo(
    () => filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? null,
    [filtered, selectedId],
  )
  const timelineRows = selected?.timeline ?? []

  useEffect(() => {
    if (selected && selected.id !== selectedId) setSelectedId(selected.id)
  }, [selected, selectedId])

  const [aiOpen, setAiOpen] = useState(false)
  const { panelRef, width: aiWidth, position: aiPos, startDrag, startResize } = useWorkspaceFloatingPanel({
    open: aiOpen,
    enabled: Boolean(selected),
  })

  return (
    <div className={workspaceLayout.pageShell}>
      <WorkspacePageHeader
        title="Action Workspace"
        subtitle={
          <>
            <span className={ws.metaStrong}>Execution tracking</span>
            <span className="text-neutral-border"> · </span>
            Approvals, dependencies & owner follow-through
          </>
        }
        toolbar={
          <>
            <WorkspaceAiToggle
              open={aiOpen}
              disabled={!selected}
              onClick={() => setAiOpen((prev) => !prev)}
            />
            <SegmentedControl
              options={FILTER_OPTIONS.map((item) => ({ value: item.value, label: item.label }))}
              value={filter}
              onChange={(value) => setFilter(value as FilterTab)}
              ariaLabel="Action filter"
            />
            <div className="w-full min-w-[12rem] flex-1 sm:w-56 sm:flex-none lg:w-64">
              <SearchInput
                placeholder="Search actions or owners…"
                value={search}
                onChange={setSearch}
                className="w-full"
              />
            </div>
          </>
        }
      />

      <div className={workspaceLayout.grid}>
        <aside className="panel-surface flex min-h-0 flex-col">
          <div className={ws.panelHd}>
            <h2 className={ws.panelTitle}>Action Queue</h2>
            <p className={ws.meta}>
              <span className="tabular-nums">{filtered.length}</span> action items in view
            </p>
          </div>
          <div className={ws.panelBd}>
            <div className={ws.queueSections}>
              {(Object.keys(grouped) as ActionQueueGroup[]).map((group) => {
                const itemsInGroup = grouped[group]
                if (itemsInGroup.length === 0) return null
                return (
                  <section key={group}>
                    <div className={`${ws.groupHd} ${ws.queueGroupHd}`}>
                      <h3 className={ws.eyebrow}>{GROUP_LABELS[group]}</h3>
                      <span className={wsCount}>{itemsInGroup.length}</span>
                    </div>
                    <div className={ws.queueList}>
                      {itemsInGroup.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedId(item.id)}
                          className={queueCardClass(selected?.id === item.id)}
                        >
                          <p className={ws.queueCardTitle}>{item.title}</p>
                          <p className={ws.queueCardMeta}>
                            <span className={ws.queueCardMetaStrong}>{item.owner}</span>
                            <span className="text-neutral-border/80"> · </span>
                            <span className="tabular-nums">{item.dueDate}</span>
                          </p>
                          <div className={ws.queueCardBadges}>
                            <span className={wsBadge.neutral}>{item.status}</span>
                            <span className={priorityBadgeTone(item.priority)}>{item.priority}</span>
                            {item.aiGenerated ? (
                              <span className={wsBadge.accent}>AI</span>
                            ) : null}
                          </div>
                          <div className={ws.queueCardProgress}>
                            <div className={ws.progressTrack}>
                              <div
                                className={ws.progressFill}
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                            <span className={ws.queueCardProgressLabel}>{item.progress}%</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          </div>
        </aside>

        <main className="panel-surface flex min-h-0 flex-col" aria-label="Action workspace">
          {selected ? (
            <>
              <div className={ws.panelHd}>
                <p className={ws.eyebrow}>Action execution workspace</p>
                <h2 className={ws.workspaceTitle}>{selected.title}</h2>
                <p className={ws.meta}>
                  {selected.owner}
                  <span className="text-neutral-border/80"> · </span>
                  {departmentLabel[selected.department]}
                  <span className="text-neutral-border/80"> · </span>
                  {selected.project}
                </p>
              </div>
              <div className={ws.panelBd}>
                <div className={ws.flow}>
                  <WorkspaceSection title="Summary" question="What is happening?">
                    <div className="workspace-hero-surface">
                      <div className={ws.heroHeader}>
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/80 text-brand-teal">
                            <Sparkles className="h-3 w-3" strokeWidth={1.75} aria-hidden />
                          </div>
                          <p className={ws.heroKicker}>Action briefing</p>
                        </div>
                        <span className={priorityBadgeTone(selected.priority)}>{selected.priority}</span>
                      </div>
                      <div className={ws.heroBody}>
                        <p className={ws.label}>Outcome</p>
                        <p className="workspace-hero-outcome max-w-3xl">
                          {selected.brief.outcome}
                        </p>
                      </div>
                      <dl className={`${ws.heroDetails} sm:grid-cols-3`}>
                        <div>
                          <dt className={ws.label}>Due date</dt>
                          <dd className={`${ws.heroDetailValue} tabular-nums`}>
                            {selected.dueDate}
                          </dd>
                        </div>
                        <div>
                          <dt className={ws.label}>Impact</dt>
                          <dd className={ws.heroDetailValue}>
                            {selected.brief.impact}
                          </dd>
                        </div>
                        <div>
                          <dt className={ws.label}>Next step</dt>
                          <dd className={ws.heroDetailValue}>
                            {selected.brief.nextStep}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </WorkspaceSection>
                  <WorkspaceSection title="Action Review" question="Critical actions requiring approval">
                    <div className="workspace-hero-surface">
                      <div className={ws.heroBody}>
                        <p className={ws.label}>Review card</p>
                        <p className={`mt-1 ${ws.cardTitle}`}>{selected.review.title}</p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          <div className={ws.fieldSurface}>
                            <p className={ws.label}>Owner</p>
                            <p className={`mt-1 ${ws.heroDetailValue}`}>
                              {selected.review.owner}
                            </p>
                          </div>
                          <div className={ws.fieldSurface}>
                            <p className={ws.label}>Due date</p>
                            <p className={`mt-1 ${ws.heroDetailValue} tabular-nums`}>
                              {selected.review.dueDate}
                            </p>
                          </div>
                          <div className={`${ws.fieldSurface} sm:col-span-2`}>
                            <p className={ws.label}>Blockers</p>
                            <p className={`mt-1 ${ws.contextItem}`}>
                              {selected.review.blockers}
                            </p>
                          </div>
                          <div className={ws.fieldSurface}>
                            <p className={ws.label}>Impact</p>
                            <p className={`mt-1 ${ws.contextItem}`}>
                              {selected.review.impact}
                            </p>
                          </div>
                          <div className={ws.fieldSurface}>
                            <p className={ws.label}>Current progress</p>
                            <p className={`mt-1 ${ws.heroDetailValue} tabular-nums`}>
                              {selected.review.progress}% complete
                            </p>
                          </div>
                        </div>
                        {selected.review.approvalRequired ? (
                          <p className="mt-3 text-caption text-brand-teal/90">
                            Approval required to continue execution without delay.
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </WorkspaceSection>
                  <WorkspaceSection title="Timeline" question="Chronological activity">
                    <div className="space-y-2">
                      {timelineRows.map((row, index) => {
                        const Icon = TIMELINE_ICONS[index % TIMELINE_ICONS.length]
                        return (
                          <div
                            key={row.id}
                            className={`${ws.cardLift} ${ws.interactive} flex items-start gap-2.5`}
                          >
                            <div className="flex flex-col items-center pt-0.5">
                              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/75 text-brand-teal">
                                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                              </span>
                              {index < timelineRows.length - 1 ? (
                                <span className="mt-1 h-5 w-px bg-neutral-border/55" aria-hidden />
                              ) : null}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-micro tabular-nums text-neutral-muted">
                                  {row.time}
                                </span>
                                <span className={wsBadge.info}>{row.status}</span>
                              </div>
                              <p className="mt-1 text-small text-neutral-text">{row.event}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </WorkspaceSection>
                  <WorkspaceSection title="Dependencies" question="Blocked actions and related work">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {selected.dependencies.map((dep) => (
                        <article key={dep.id} className={ws.cardLift}>
                          <p className={ws.label}>{dep.label}</p>
                          <p className="mt-1 text-caption text-neutral-text/85">{dep.detail}</p>
                        </article>
                      ))}
                    </div>
                  </WorkspaceSection>
                  <WorkspaceSection title="Approvals" question="Decision required to proceed">
                    <div className={ws.cardLift}>
                      <p className="text-small text-neutral-text">
                        Choose approval action in footer to continue execution workflow.
                      </p>
                    </div>
                  </WorkspaceSection>
                </div>
              </div>
              <div className="workspace-sticky-footer">
                <div className={ws.footerActions}>
                  <Button variant="primary" className={ws.footerPrimary}>
                    <Check className="h-3.5 w-3.5" strokeWidth={1.75} /> Approve
                  </Button>
                  <Button variant="ghost" className={ws.footerSecondary}>
                    <UserRound className="h-3.5 w-3.5" strokeWidth={1.75} /> Delegate
                  </Button>
                  <Button variant="ghost" className={ws.footerSecondary}>
                    <X className="h-3.5 w-3.5" strokeWidth={1.75} /> Reject
                  </Button>
                  <Button variant="ghost" className={ws.footerSecondary}>
                    <Clock3 className="h-3.5 w-3.5" strokeWidth={1.75} /> Request Update
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col px-4 py-5">
              <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center">
                <WorkspaceEmptyState
                  icon={<CheckSquare className="h-5 w-5" strokeWidth={1.75} aria-hidden />}
                  title="Select an action item"
                  description="Review critical actions, approve commitments, track execution, and monitor dependencies from one workspace."
                  className="border-0 bg-transparent p-0"
                />
              </div>
            </div>
          )}
        </main>

        <aside className="panel-surface hidden min-h-0 flex-col lg:flex">
          <div className={ws.panelHd}>
            <h2 className={ws.panelTitle}>Action Context</h2>
            <p className={ws.meta}>
              {selected ? 'Related execution context' : 'Select an action to view context'}
            </p>
          </div>
          <div className={ws.panelBd}>
            {!selected ? (
              <WorkspaceEmptyState
                icon={<Link2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />}
                title="No action selected"
                description="Related meetings, decisions, projects, owners, documents, dependencies, and risks appear here."
              />
            ) : (
              <div className={ws.contextStack}>
                {selected.context.linkedDecisions.length > 0 ? (
                  <div className="workspace-knowledge-group">
                    <WorkspaceContextGroupTitle icon={GitBranch} label="Decisions & meetings" />
                    <div className={ws.contextGroupBody}>
                      {selected.context.linkedDecisions.map((link) => (
                        <p key={link.id} className={ws.contextItemTitle}>
                          {link.title}
                        </p>
                      ))}
                      {selected.context.linkedMeetings.map((link) => (
                        <p key={link.id} className={ws.contextItem}>
                          {link.title}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}
                {selected.context.linkedProjects.length > 0 ? (
                  <div className="workspace-knowledge-group">
                    <WorkspaceContextGroupTitle icon={FolderKanban} label="Project & owners" />
                    <div className={ws.contextGroupBody}>
                      {selected.context.linkedProjects.map((link) => (
                        <p key={link.id} className={ws.contextItemTitle}>
                          {link.title}
                        </p>
                      ))}
                      {selected.context.owners.map((owner) => (
                        <p key={owner.name} className={ws.contextItem}>
                          {owner.name}
                          {owner.role ? ` · ${owner.role}` : ''}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}
                {selected.context.dependencies.length > 0 || selected.dependencies.length > 0 ? (
                  <div className="workspace-knowledge-group">
                    <WorkspaceContextGroupTitle icon={ArrowRight} label="Dependencies" />
                    <div className={ws.contextGroupBody}>
                      {[...selected.context.dependencies, ...selected.dependencies].map((dep) => (
                        <p key={dep.id} className={ws.contextItem}>
                          {dep.detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}
                {selected.context.linkedDocuments.length > 0 || selected.context.risks.length > 0 ? (
                  <div className="workspace-knowledge-group">
                    <WorkspaceContextGroupTitle icon={FileText} label="Documents & risks" />
                    <div className={ws.contextGroupBody}>
                      {selected.context.linkedDocuments.map((doc) => (
                        <p key={doc.id} className={ws.contextItem}>
                          {doc.title}
                        </p>
                      ))}
                      {selected.context.risks.map((risk) => (
                        <p key={risk} className={ws.contextItem}>
                          {risk}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className="workspace-knowledge-group">
                  <WorkspaceContextGroupTitle icon={Bot} label="AI context" />
                  <p className={ws.contextItem}>
                    Summary, ownership, dependencies, and approvals are preloaded for review.
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {selected ? (
        <ActionAiPanel
          item={selected}
          open={aiOpen}
          width={aiWidth}
          x={aiPos.x}
          y={aiPos.y}
          panelRef={panelRef}
          onClose={() => setAiOpen(false)}
          onDragStart={(event) => startDrag(event)}
          onResizeStart={(event) => startResize(event)}
        />
      ) : null}
    </div>
  )
}
