import {
  AlertTriangle,
  CheckCircle2,
  CircleDollarSign,
  Flag,
  MessageSquare,
  Rocket,
  type LucideIcon,
} from 'lucide-react'
import type { TimelineHighlight } from '../../../../types/meetingContext'
import { ws } from '../workspaceUi'

interface TimelineHighlightsSectionProps {
  highlights: TimelineHighlight[]
}

interface TimelineMeta {
  icon: LucideIcon
  markerClass: string
  iconClass: string
}

function resolveTimelineMeta(label: string, index: number, total: number): TimelineMeta {
  const lower = label.toLowerCase()

  if (/risk|escalat|concern|block/i.test(lower)) {
    return {
      icon: AlertTriangle,
      markerClass: 'bg-status-warning ring-4 ring-amber-50',
      iconClass: 'text-status-warning',
    }
  }
  if (/approv|confirm|consensus|sign.?off/i.test(lower)) {
    return {
      icon: CheckCircle2,
      markerClass: 'bg-brand-teal ring-4 ring-brand-tealLight/80',
      iconClass: 'text-brand-teal',
    }
  }
  if (/budget|cost|fund|spend/i.test(lower)) {
    return {
      icon: CircleDollarSign,
      markerClass: 'bg-status-info ring-4 ring-blue-50',
      iconClass: 'text-status-info',
    }
  }
  if (/deploy|engineer|technical|release/i.test(lower)) {
    return {
      icon: Rocket,
      markerClass: 'bg-status-info ring-4 ring-blue-50',
      iconClass: 'text-status-info',
    }
  }
  if (index === total - 1) {
    return {
      icon: Flag,
      markerClass: 'bg-brand-teal ring-4 ring-brand-tealLight/80',
      iconClass: 'text-brand-teal',
    }
  }
  return {
    icon: MessageSquare,
    markerClass: 'bg-neutral-border ring-4 ring-white',
    iconClass: 'text-neutral-muted',
  }
}

export function TimelineHighlightsSection({ highlights }: TimelineHighlightsSectionProps) {
  return (
    <div className="relative pl-0.5">
      <div
        className="absolute bottom-2 left-[4.25rem] top-2 w-px bg-gradient-to-b from-transparent via-neutral-border/60 to-brand-teal/30"
        aria-hidden
      />
      <ul className="space-y-0">
        {highlights.map((item, index) => {
          const meta = resolveTimelineMeta(item.label, index, highlights.length)
          const Icon = meta.icon

          return (
            <li
              key={item.id}
              className="group relative flex gap-3 pb-4 transition-[padding] duration-200 last:pb-0"
            >
              <span
                className={`w-12 shrink-0 pt-1 text-right text-small font-medium tabular-nums transition-colors duration-200 ${ws.meta} group-hover:text-neutral-text`}
              >
                {item.time}
              </span>

              <div className="relative z-[1] flex w-7 shrink-0 justify-center pt-0.5">
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-transform duration-200 group-hover:scale-110 ${meta.markerClass}`}
                  aria-hidden
                />
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-start gap-2">
                  <Icon
                    className={`mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:scale-105 ${meta.iconClass}`}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <p className="text-caption leading-snug text-neutral-text transition-colors duration-200 group-hover:text-neutral-text">
                    {item.label}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
