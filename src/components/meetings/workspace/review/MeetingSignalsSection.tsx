import type { MeetingSignal, MeetingSignalType } from '../../../../types/meetingContext'

interface MeetingSignalsSectionProps {
  signals: MeetingSignal[]
}

const signalTone: Record<MeetingSignalType, string> = {
  risk: 'bg-red-50 text-status-danger hover:bg-red-100/80',
  consensus: 'bg-emerald-50 text-status-success hover:bg-emerald-100/80',
  topic: 'bg-blue-50 text-status-info hover:bg-blue-100/80',
  followup: 'bg-amber-50 text-status-warning hover:bg-amber-100/80',
}

export function MeetingSignalsSection({ signals }: MeetingSignalsSectionProps) {
  if (signals.length === 0) {
    return (
      <p className="text-caption text-neutral-muted">No signals detected for this meeting.</p>
    )
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {signals.map((signal) => (
        <span
          key={signal.id}
          className={`inline-flex items-center rounded-md px-2 py-1 text-small font-medium transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:shadow-xs ${signalTone[signal.type]}`}
        >
          {signal.label}
        </span>
      ))}
    </div>
  )
}
