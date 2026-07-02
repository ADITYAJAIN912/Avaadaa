import type { ActionItemStatus } from './actionItem'
import type {
  Department,
  DependencyItem,
  TimelineEntry,
  WorkspaceBrief,
  WorkspaceContextLink,
} from './workspace'

export type ActionPriority = 'high' | 'medium' | 'low'

export type ActionQueueGroup = 'needs-attention' | 'today' | 'this-week' | 'completed'

export interface ActionReviewCard {
  title: string
  owner: string
  dueDate: string
  blockers: string
  impact: string
  progress: number
  approvalRequired: boolean
}

export interface ActionWorkspaceItem {
  id: string
  title: string
  department: Department
  owner: string
  priority: ActionPriority
  dueDate: string
  status: ActionItemStatus
  progress: number
  aiGenerated: boolean
  project: string
  queueGroup: ActionQueueGroup
  brief: WorkspaceBrief
  review: ActionReviewCard
  timeline: TimelineEntry[]
  dependencies: DependencyItem[]
  context: WorkspaceContextLink
}
