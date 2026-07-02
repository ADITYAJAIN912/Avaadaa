import type { AiConfidence } from './meetingContext'

/** Organizational unit — drives mock diversity; maps to backend tenant/team metadata. */
export type Department =
  | 'engineering'
  | 'finance'
  | 'hr'
  | 'operations'
  | 'legal'
  | 'procurement'
  | 'sales'
  | 'support'
  | 'safety'
  | 'marketing'
  | 'executive'

export const departmentLabel: Record<Department, string> = {
  engineering: 'Engineering',
  finance: 'Finance',
  hr: 'HR',
  operations: 'Operations',
  legal: 'Legal',
  procurement: 'Procurement',
  sales: 'Sales',
  support: 'Support',
  safety: 'Safety',
  marketing: 'Marketing',
  executive: 'Executive',
}

/** Reusable AI-generated summary block for any workspace surface. */
export interface WorkspaceBrief {
  outcome: string
  impact: string
  keyRisk: string
  nextStep: string
  aiConfidence: AiConfidence
  confidenceBecause?: string[]
}

export interface TimelineEntry {
  id: string
  time: string
  event: string
  status: string
}

export interface DependencyItem {
  id: string
  kind: 'waiting-on' | 'blocked-by' | 'related-action' | 'risk'
  label: string
  detail: string
}

export interface LinkedEntity {
  id: string
  title: string
  type: string
}

export interface WorkspaceContextLink {
  linkedMeetings: LinkedEntity[]
  linkedDecisions: LinkedEntity[]
  linkedProjects: LinkedEntity[]
  linkedDocuments: LinkedEntity[]
  owners: { name: string; role?: string }[]
  dependencies: DependencyItem[]
  risks: string[]
}
