/**
 * Workspace design tokens — TypeScript API for Meetings, Action Items, and future modules.
 * Pair with workspace.css and panel-surface from the global layer.
 */

/** Three-column workspace grid: queue 23% · center 58% · context 19% */
export const workspaceLayout = {
  pageShell:
    'mx-auto flex h-[calc(100dvh-8.25rem)] max-w-[90rem] flex-col gap-2 overflow-hidden md:h-[calc(100dvh-7.75rem)] lg:h-[calc(100dvh-7.25rem)]',
  grid: 'relative flex min-h-0 flex-1 flex-col gap-2 overflow-hidden lg:grid lg:grid-cols-[minmax(0,23fr)_minmax(0,58fr)_minmax(0,19fr)]',
  gridMeetings:
    'relative min-h-0 flex-1 overflow-hidden flex flex-col gap-2 lg:grid lg:grid-cols-[minmax(0,23fr)_minmax(0,58fr)_minmax(0,19fr)]',
} as const

export const workspaceAi = {
  defaultWidth: 460,
  minWidth: 380,
  maxWidth: 720,
  defaultTop: 96,
  viewportMargin: 16,
  zIndex: 'z-50',
} as const

export const workspaceIcon = {
  stroke: 1.75,
  strokeBold: 1.8,
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
} as const

/** Tailwind class bundles — prefer over ad-hoc strings in workspace components. */
export const ws = {
  pageTitle: 'workspace-page-title',
  pageHeaderInner: 'workspace-page-header-inner',
  workspaceTitle: 'workspace-workspace-title truncate',
  eyebrow: 'text-micro font-semibold uppercase tracking-wider text-neutral-muted',
  panelTitle: 'text-body font-semibold tracking-tight text-neutral-text',
  sectionTitle: 'workspace-section-title',
  sectionHd: 'workspace-section-hd',
  sectionQuestion: 'workspace-section-question',
  sectionQuestionHero: 'workspace-section-question-hero',
  cardTitle: 'workspace-card-title',
  copilotTitle: 'truncate text-caption font-semibold text-neutral-text',
  heroTitle: 'text-heading-sm font-semibold leading-snug tracking-tight text-neutral-text',
  meta: 'workspace-meta',
  metaStrong: 'workspace-meta-strong',
  label: 'text-micro font-medium uppercase tracking-wide text-neutral-muted',
  panelHd: 'workspace-panel-hd',
  panelBd: 'workspace-panel-bd workspace-scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain',
  flow: 'workspace-stagger workspace-review-flow flex flex-col gap-4 p-4',
  group: 'space-y-2',
  groupHd: 'flex items-center justify-between gap-2 px-0.5',
  queueSections: 'workspace-queue-sections',
  queueList: 'workspace-queue-list',
  queueGroupHd: 'workspace-queue-group-hd',
  toolbar: 'workspace-toolbar',
  contextStack: 'workspace-context-stack',
  contextEnter: 'workspace-context-enter',
  contextGroupHd: 'workspace-context-group-hd',
  contextGroupTitle: 'workspace-context-group-title',
  contextGroupBody: 'workspace-context-group-body',
  contextItem: 'workspace-context-item',
  contextItemTitle: 'workspace-context-item-title',
  cardLift: 'workspace-card workspace-card-lift p-3',
  fieldSurface: 'workspace-field-surface',
  knowledgeItem: 'workspace-knowledge-item',
  empty: 'workspace-empty',
  interactive:
    'focus-ring outline-none transition-[color,background-color,box-shadow,transform] duration-200 ease-out active:scale-[0.99]',
  aiToggle: 'workspace-ai-toggle focus-ring',
  footerPrimary:
    'workspace-footer-primary btn-premium inline-flex h-control-sm items-center gap-1.5 rounded-lg px-3.5 text-caption font-semibold shadow-sm',
  footerSecondary:
    'workspace-footer-secondary btn-premium inline-flex h-control-sm items-center gap-1.5 rounded-lg px-3 text-caption font-medium text-neutral-muted hover:text-neutral-text',
  queueCard: 'focus-ring workspace-queue-card',
  queueCardTitleRow: 'workspace-queue-card-title-row',
  queueCardTitle: 'workspace-queue-card-title line-clamp-2 min-w-0 flex-1',
  queueCardMeta: 'workspace-queue-card-meta',
  queueCardMetaStrong: 'workspace-queue-card-meta-strong tabular-nums',
  queueCardStats: 'workspace-queue-card-stats',
  queueCardStatsAttention: 'workspace-queue-card-stats-attention',
  queueCardBadges: 'workspace-queue-card-badges',
  queueCardProgress: 'workspace-queue-card-progress',
  queueCardProgressLabel: 'workspace-queue-card-progress-label',
  queueCardSelected: 'workspace-queue-card-selected',
  queueCardIdle: 'workspace-queue-card-idle',
  heroHeader: 'workspace-hero-header',
  heroBody: 'workspace-hero-body',
  heroDetails: 'workspace-hero-details',
  heroKicker: 'workspace-hero-kicker',
  heroDetailValue: 'workspace-hero-detail-value',
  heroFooter: 'workspace-hero-footer',
  footerActions: 'workspace-footer-actions',
  footerBar: 'workspace-footer-bar',
  footerRecs: 'workspace-footer-recs',
  inputBar: 'workspace-input-bar',
  controlInput: 'workspace-control-input focus-ring',
  progressTrack: 'workspace-progress-track',
  progressFill: 'workspace-progress-fill',
} as const

export const wsBadge = {
  base: 'workspace-badge',
  neutral: 'workspace-badge workspace-badge-neutral',
  accent: 'workspace-badge workspace-badge-accent',
  warning: 'workspace-badge workspace-badge-warning',
  danger: 'workspace-badge workspace-badge-danger',
  info: 'workspace-badge workspace-badge-info',
} as const

export const wsCount = 'workspace-count'

export function priorityBadgeTone(
  priority: 'high' | 'medium' | 'low',
): (typeof wsBadge)[keyof typeof wsBadge] {
  if (priority === 'high') return wsBadge.danger
  if (priority === 'medium') return wsBadge.warning
  return wsBadge.neutral
}

export function riskBadgeTone(
  risk: 'high' | 'medium' | 'low',
): (typeof wsBadge)[keyof typeof wsBadge] {
  if (risk === 'high') return wsBadge.danger
  if (risk === 'medium') return wsBadge.warning
  return wsBadge.neutral
}

export function queueCardClass(isSelected: boolean): string {
  return `${ws.queueCard} ${isSelected ? ws.queueCardSelected : ws.queueCardIdle}`
}
