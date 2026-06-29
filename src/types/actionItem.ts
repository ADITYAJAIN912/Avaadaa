export type ActionItemStatus = 'Pending' | 'In Process' | 'Blocked' | 'Done'

export interface ActionItem {
  id: string
  meetingTitle: string
  date: string
  time: string
  actionsCount: number
  openCount: number
  status: ActionItemStatus
}
