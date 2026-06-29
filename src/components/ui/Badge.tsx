import type { ReactNode } from 'react'
import type { ActionItemStatus } from '../../types/actionItem'
import type { Meeting } from '../../types/meeting'
import type { ActionPriority } from '../../utils/actionItemMeta'
import type { BadgeVariant } from '../../utils/badgeVariants'
import {
  badgeVariantForActionStatus,
  badgeVariantForMeetingStatus,
  priorityBadgeVariant,
} from '../../utils/badgeVariants'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: 'badge-pill bg-neutral-border/50 text-neutral-muted',
  source: 'badge-pill bg-neutral-bg text-neutral-muted ring-1 ring-neutral-border/70',
  completed: 'badge-pill bg-neutral-bg/90 text-neutral-muted/90 ring-1 ring-neutral-border/60',
  scheduled: 'badge-pill bg-brand-tealLight/80 text-brand-teal ring-1 ring-brand-teal/10',
  upcoming: 'badge-pill bg-brand-tealLight/80 text-brand-teal ring-1 ring-brand-teal/10',
  pending: 'badge-pill bg-amber-50/90 text-amber-800/90 ring-1 ring-amber-200/70',
  blocked: 'badge-pill bg-red-50/90 text-red-800/90 ring-1 ring-red-200/70',
  'in-process': 'badge-pill bg-blue-50/80 text-blue-800/90 ring-1 ring-blue-200/60',
  'priority-high': 'badge-pill bg-red-50/80 text-red-800/85 ring-1 ring-red-200/60',
  'priority-medium': 'badge-pill bg-amber-50/80 text-amber-800/85 ring-1 ring-amber-200/60',
  'priority-low': 'badge-pill bg-neutral-bg text-neutral-muted ring-1 ring-neutral-border/60',
  artifact: 'badge-pill bg-brand-tealLight/70 text-brand-teal',
  danger: 'badge-pill bg-status-danger text-white',
  count: 'badge-pill min-w-[20px] bg-status-danger px-1.5 text-white',
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`ease-premium ${variants[variant]} ${className}`}>{children}</span>
  )
}

interface MeetingStatusBadgeProps {
  meeting: Meeting
  isPast: boolean
  className?: string
}

export function MeetingStatusBadge({ meeting, isPast, className }: MeetingStatusBadgeProps) {
  const statusLabel = isPast
    ? 'Completed'
    : meeting.status === 'Scheduled'
      ? 'Scheduled'
      : meeting.status

  return (
    <Badge
      variant={badgeVariantForMeetingStatus(meeting.status, isPast)}
      className={className}
    >
      {statusLabel}
    </Badge>
  )
}

interface ActionStatusBadgeProps {
  status: ActionItemStatus
  className?: string
}

export function ActionStatusBadge({ status, className }: ActionStatusBadgeProps) {
  return (
    <Badge variant={badgeVariantForActionStatus(status)} className={className}>
      {status}
    </Badge>
  )
}

interface PriorityBadgeProps {
  priority: ActionPriority
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  return (
    <Badge variant={priorityBadgeVariant(priority)} className={className}>
      {priority}
    </Badge>
  )
}
