import { useMemo, useEffect, useRef } from 'react'
import type { CalendarDayCell } from '../../utils/calendar'
import type { CalendarEvent } from '../../types/calendar'
import { getEventsForDate, getWeekdayLabels } from '../../utils/calendar'
import { getCategoryTheme } from './categoryTheme'

interface MonthGridProps {
  cells: CalendarDayCell[]
  events: CalendarEvent[]
  selectedDate: string
  onSelectDate: (date: string) => void
  onSelectEvent: (event: CalendarEvent) => void
  onPeekDate: (date: string) => void
}

export function MonthGrid({ cells, events, selectedDate, onSelectDate, onSelectEvent }: MonthGridProps) {
  const weekdays = getWeekdayLabels()
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollTop = 0
    }
  }, [selectedDate])
  
  const agendaEvents = useMemo(() => {
    // Look ahead up to 14 days to provide a dense schedule list
    const upcoming = cells.filter(c => c.date >= selectedDate).slice(0, 14)
    return upcoming.map(c => ({
      date: c.date,
      isToday: c.isToday,
      dayLabel: new Date(c.date).toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' }),
      events: getEventsForDate(events, c.date)
    })).filter(group => group.events.length > 0 || group.date === selectedDate)
  }, [cells, events, selectedDate])

  const { todayCount, weekCount } = useMemo(() => {
    const today = new Date().toISOString().split('T')[0] // or use a passed TODAY constant if available, but since we don't have it imported, we'll just use the first cell's month to approximate, or actually just look at the selectedDate's count? 
    // Wait, let's use the first cell that has isToday
    const todayCell = cells.find(c => c.isToday)
    const todayDate = todayCell ? todayCell.date : selectedDate
    
    const todayCount = events.filter(e => e.date === todayDate).length
    
    const tTime = new Date(`${todayDate}T00:00:00`).getTime()
    const weekCount = events.filter(e => {
      const dTime = new Date(`${e.date}T00:00:00`).getTime()
      return dTime >= tTime && dTime < tTime + 7 * 86400000
    }).length
    
    return { todayCount, weekCount }
  }, [events, cells, selectedDate])

  return (
    <div className="flex h-full flex-col lg:flex-row gap-6 lg:gap-8 overflow-hidden reveal-fade">
      {/* Left Sidebar: Navigation Context */}
      <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
        <div className="card-surface p-5 border border-[var(--border-subtle)] bg-surface shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-body font-bold text-neutral-text">Select Date</h2>
          </div>
          <div className="grid grid-cols-7 gap-y-1 mb-2">
            {weekdays.map(day => (
              <div key={day} className="text-center font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-muted">
                {day.slice(0, 1)}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-0.5">
            {cells.map((cell) => {
              const dayEvents = getEventsForDate(events, cell.date)
              const isSelected = cell.date === selectedDate
              const muted = !cell.isCurrentMonth
              const hasEvents = dayEvents.length > 0
              
              return (
                <button
                  key={cell.date}
                  type="button"
                  onClick={() => onSelectDate(cell.date)}
                  className={`
                    focus-ring relative mx-auto flex h-8 w-8 items-center justify-center rounded-full text-small font-medium tabular-nums transition-all duration-150
                    ${isSelected ? 'bg-brand-teal text-neutral-inverse font-bold' : 'hover:bg-neutral-bg text-neutral-text'}
                    ${muted && !isSelected ? 'text-neutral-muted/50' : ''}
                    ${cell.isToday && !isSelected ? 'text-brand-teal ring-1 ring-inset ring-brand-teal/30' : ''}
                  `}
                >
                  {cell.day}
                  {hasEvents && !isSelected && (
                    <span className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${cell.isToday ? 'bg-brand-teal' : 'bg-[#CBD8CB]'}`} />
                  )}
                </button>
              )
            })}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-medium text-neutral-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-[#CBD8CB]" />
            Days with scheduled events
          </div>
        </div>

        <div className="card-surface p-5 border border-[var(--border-subtle)] bg-surface shadow-sm flex-1 hidden lg:flex flex-col overflow-hidden">
           <h3 className="text-caption font-bold text-neutral-text mb-3">Schedule Overview</h3>
           <p className="text-small text-neutral-muted leading-relaxed">
             You have <strong className="text-neutral-text font-bold">{todayCount}</strong> events today and a total of <strong className="text-neutral-text font-bold">{weekCount}</strong> events scheduled over the next 7 days. Keep an eye on your high-priority items.
           </p>
        </div>
      </div>

      {/* Right: Corporate Agenda View (High Density List) */}
      <div className="flex-1 card-surface border border-[var(--border-subtle)] bg-surface shadow-sm overflow-hidden flex flex-col p-0">
        <div className="border-b border-[var(--border-subtle)] px-6 py-4 bg-[#F3F3EA]/30">
           <h2 className="text-body font-bold text-neutral-text">Timeline</h2>
        </div>
        <div ref={timelineRef} className="flex-1 overflow-y-auto px-6 pb-6 scroll-smooth">
          {agendaEvents.map(group => (
            <div key={group.date} className="mt-2 first:mt-0">
              <div className="sticky top-0 z-10 -mx-6 px-6 mb-1 bg-surface py-2 border-b border-[var(--border-subtle)]">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-baseline gap-2">
                    <span className={`text-body-lg font-bold ${group.isToday ? 'text-brand-teal' : 'text-neutral-text'}`}>
                      {group.isToday ? 'Today' : group.dayLabel.split(',')[0]}
                    </span>
                    {!group.isToday && (
                      <span className="text-small font-medium text-neutral-muted">
                        {group.dayLabel.split(',')[1]}
                      </span>
                    )}
                  </h3>
                  {group.isToday && (
                    <div className="flex items-center gap-1.5 text-brand-teal">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
                      </span>
                      <span className="text-micro font-bold uppercase tracking-wider">Now</span>
                    </div>
                  )}
                </div>
              </div>
              
              {group.events.length === 0 ? (
                <div className="py-6 text-body font-medium text-neutral-muted">
                  No scheduled events for this day.
                </div>
              ) : (
                <div className="flex flex-col">
                  {group.events.map(event => {
                    const theme = getCategoryTheme(event.category)
                    return (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => onSelectEvent(event)}
                        className="group focus-ring flex w-full items-center gap-5 rounded-lg px-2 py-3 text-left transition-colors hover:bg-[#F3F3EA]"
                      >
                        <div className="w-20 shrink-0 font-mono text-[11.5px] font-semibold tracking-wider text-neutral-muted group-hover:text-neutral-text transition-colors">
                          {event.time}
                        </div>
                        
                        <div className={`shrink-0 w-1 h-9 rounded-full ${theme.dot}`} />
                        
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h4 className="text-body font-bold text-neutral-text truncate">
                            {event.title}
                          </h4>
                          <p className="text-small font-medium text-neutral-muted truncate mt-0.5">
                            {event.host} · {event.attendees.length > 0 ? `${event.attendees.length} attendees` : 'Personal'}
                          </p>
                        </div>

                        <div className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${theme.border} ${theme.wash} ${theme.text}`}>
                          {theme.label || event.category}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
