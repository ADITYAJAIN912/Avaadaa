import type { CalendarEvent } from '../../types/calendar'
import { getEventsForDate } from '../../utils/calendar'
import { TODAY } from '../../data/constants'
import { getCategoryTheme } from './categoryTheme'

interface WeekViewProps {
  weekDates: string[]
  events: CalendarEvent[]
  selectedEventId: string | null
  onSelectEvent: (event: CalendarEvent) => void
}

export function WeekView({ weekDates, events, selectedEventId, onSelectEvent }: WeekViewProps) {
  return (
    <section className="card-surface reveal-fade flex flex-1 min-h-0 flex-col overflow-hidden p-0 border border-[var(--border-subtle)]">
      <header className="shrink-0 border-b border-[var(--border-subtle)] bg-neutral-bg/50 px-6 py-4">
        <h2 className="text-body font-bold text-neutral-text">Week Overview</h2>
      </header>

      <div className="flex-1 min-h-0 grid grid-cols-7 divide-x divide-[var(--border-subtle)]">
        {weekDates.map(date => {
          const dayEvents = getEventsForDate(events, date)
          const isToday = date === TODAY
          const d = new Date(date)
          const weekdayStr = d.toLocaleDateString('en-GB', { weekday: 'short' })
          const dayNum = d.toLocaleDateString('en-GB', { day: 'numeric' })
          
          return (
            <div key={date} className={`flex flex-col min-h-0 h-full ${isToday ? 'bg-[#F3F3EA]/30' : ''}`}>
              <div className="shrink-0 sticky top-0 z-10 bg-surface/95 backdrop-blur-md py-3 px-2 border-b border-[var(--border-subtle)]/50 text-center">
                <div className={`text-[10px] font-bold uppercase tracking-wider ${isToday ? 'text-brand-teal' : 'text-neutral-muted'}`}>
                  {weekdayStr}
                </div>
                <div className={`mt-0.5 text-body-lg font-bold ${isToday ? 'text-brand-teal' : 'text-neutral-text'}`}>
                  {dayNum}
                </div>
              </div>
              
              <div className="flex-1 min-h-0 overflow-y-auto p-2 pb-12 scroll-smooth">
                {dayEvents.length === 0 ? (
                  <div className="py-4 text-center text-micro font-medium text-neutral-muted">
                    No events
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {dayEvents.map(event => {
                      const theme = getCategoryTheme(event.category)
                      const selected = selectedEventId === event.id
                      return (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() => onSelectEvent(event)}
                          className={`group focus-ring flex flex-col w-full text-left rounded-lg p-2 transition-colors hover:bg-[#F3F3EA] ${selected ? 'bg-[#F3F3EA] ring-1 ring-inset ring-brand-teal/30' : ''}`}
                        >
                          <div className="flex gap-2 h-full">
                            <div className={`shrink-0 w-1 rounded-full ${theme.dot}`} />
                            <div className="min-w-0 flex-1">
                              <div className="font-mono text-[10px] font-semibold tracking-wider text-neutral-muted group-hover:text-neutral-text transition-colors">
                                {event.time}
                              </div>
                              <h4 className="text-[12px] font-bold text-neutral-text leading-tight mt-0.5 line-clamp-2">
                                {event.title}
                              </h4>
                              <p className="text-[10px] font-medium text-neutral-muted truncate mt-0.5">
                                {event.attendees.length > 0 ? `${event.attendees.length} attendees` : 'Personal'}
                              </p>
                              <div className={`mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border ${theme.border} ${theme.wash} ${theme.text}`}>
                                {theme.label || event.category}
                              </div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
