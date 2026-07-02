import type {
  MeetingContext,
  MeetingContextCommitment,
  MeetingContextDecision,
} from './meetingContext'

type DecisionSeed = Omit<
  MeetingContextDecision,
  'businessImpact' | 'relatedProject' | 'approvalStatus' | 'confidence'
> &
  Partial<
    Pick<
      MeetingContextDecision,
      'businessImpact' | 'relatedProject' | 'approvalStatus' | 'confidence'
    >
  >

type CommitmentSeed = Omit<MeetingContextCommitment, 'dependencies' | 'priority'> &
  Partial<Pick<MeetingContextCommitment, 'dependencies' | 'priority'>>

/** Raw mock shape before review enrichment in getMeetingContextById. */
export type MeetingContextSeed = Omit<
  MeetingContext,
  | 'brief'
  | 'timelineHighlights'
  | 'signals'
  | 'decisions'
  | 'commitments'
  | 'intelligence'
> & {
  brief?: MeetingContext['brief']
  timelineHighlights?: MeetingContext['timelineHighlights']
  signals?: MeetingContext['signals']
  decisions: DecisionSeed[]
  commitments: CommitmentSeed[]
}
