import type { ActionItemStatus } from '../types/actionItem'
import type { MeetingStatus } from '../types/meeting'
import type { ActionPriority } from './actionItemMeta'

export type BadgeVariant =
  | 'default'
  | 'source'
  | 'completed'
  | 'scheduled'
  | 'upcoming'
  | 'pending'
  | 'blocked'
  | 'in-process'
  | 'priority-high'
  | 'priority-medium'
  | 'priority-low'
  | 'artifact'
  | 'danger'
  | 'count'

export function badgeVariantForMeetingStatus(
  status: MeetingStatus | string,
  isPast: boolean,
): BadgeVariant {
  if (isPast) return 'completed'
  if (status === 'Scheduled') return 'scheduled'
  if (status === 'Upcoming') return 'upcoming'
  return 'default'
}

export function badgeVariantForActionStatus(status: ActionItemStatus): BadgeVariant {
  switch (status) {
    case 'Pending':
      return 'pending'
    case 'In Process':
      return 'in-process'
    case 'Blocked':
      return 'blocked'
    case 'Done':
      return 'completed'
    default:
      return 'default'
  }
}

export function priorityBadgeVariant(
  priority: ActionPriority,
): 'priority-high' | 'priority-medium' | 'priority-low' {
  switch (priority) {
    case 'High':
      return 'priority-high'
    case 'Medium':
      return 'priority-medium'
    default:
      return 'priority-low'
  }
}
