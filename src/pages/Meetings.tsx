import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CalendarX, Zap } from 'lucide-react'
import { TODAY } from '../data/constants'
import type { Meeting } from '../types/meeting'
import { isMeetingPastOrCompleted, sortMeetingsChronologically } from '../utils/meetings'
import { getDayGroup } from '../utils/helpers'
import { FilterChips, type DateFilter } from '../components/meetings/FilterChips'
import { ViewToggle } from '../components/ui/ViewToggle'
import { Toggle } from '../components/ui/Toggle'
import { DayGroupSection } from '../components/meetings/DayGroupSection'
import { SearchInput } from '../components/ui/SearchInput'
import { EmptyState } from '../components/ui/EmptyState'
import { MeetingsPageSkeleton } from '../components/ui/Skeleton'
import { useMeetings } from '../context/MeetingsContext'
import { usePageLoading } from '../hooks/usePageLoading'

type DayGroupKey = 'Today' | 'Tomorrow' | 'This Week'

const filterToGroups: Record<Exclude<DateFilter, 'custom'>, DayGroupKey[]> = {
  today: ['Today'],
  tomorrow: ['Tomorrow'],
  'this-week': ['Today', 'Tomorrow', 'This Week'],
}

export function Meetings() {
  const isLoading = usePageLoading(450)
  const [searchParams] = useSearchParams()
  const { meetings, updateAutoJoin, setAutoJoinForIds } = useMeetings()
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState<DateFilter>('today')
  const [customDate, setCustomDate] = useState(TODAY)
  const [view, setView] = useState<'list' | 'grid'>('list')

  useEffect(() => {
    const f = searchParams.get('filter')
    if (f === 'today') setDateFilter('today')
    else if (f === 'tomorrow') setDateFilter('tomorrow')
    else if (f === 'this-week') setDateFilter('this-week')
  }, [searchParams])

  const filtered = useMemo(() => {
    return meetings
      .filter((m) => {
        if (!search) return true
        const q = search.toLowerCase()
        return (
          m.title.toLowerCase().includes(q) ||
          m.host.toLowerCase().includes(q)
        )
      })
      .filter((m) => {
        if (dateFilter === 'custom') return m.date === customDate
        const group = getDayGroup(m.date)
        if (!group) return false
        return filterToGroups[dateFilter].includes(group)
      })
      .sort(sortMeetingsChronologically)
  }, [meetings, search, dateFilter, customDate])

  const grouped = useMemo(() => {
    const groups: Record<DayGroupKey, Meeting[]> = {
      Today: [],
      Tomorrow: [],
      'This Week': [],
    }
    for (const m of filtered) {
      const g = getDayGroup(m.date)
      if (g) groups[g].push(m)
    }
    for (const key of Object.keys(groups) as DayGroupKey[]) {
      groups[key].sort(sortMeetingsChronologically)
    }
    return groups
  }, [filtered])

  const actionableMeetings = useMemo(
    () => filtered.filter((m) => !isMeetingPastOrCompleted(m)),
    [filtered],
  )

  const autoJoinOnCount = useMemo(
    () => actionableMeetings.filter((m) => m.autoJoin).length,
    [actionableMeetings],
  )

  const autoJoinBannerState = useMemo(() => {
    const total = actionableMeetings.length
    if (total === 0) return 'all-off' as const
    if (autoJoinOnCount === 0) return 'all-off' as const
    if (autoJoinOnCount === total) return 'all-on' as const
    return 'mixed' as const
  }, [actionableMeetings.length, autoJoinOnCount])

  function handleAutoJoinChange(id: string, value: boolean) {
    updateAutoJoin(id, value)
  }

  function handleGlobalAutoJoin(value: boolean) {
    setAutoJoinForIds(
      actionableMeetings.map((m) => m.id),
      value,
    )
  }

  const standardSections: { label: DayGroupKey; date: string }[] = [
    { label: 'Today', date: '2026-06-29' },
    { label: 'Tomorrow', date: '2026-06-30' },
    { label: 'This Week', date: '2026-07-01' },
  ]

  if (isLoading) {
    return <MeetingsPageSkeleton />
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <SearchInput
          shortcutId="meetings-search"
          placeholder="Search meetings by title, attendee or platform"
          value={search}
          onChange={setSearch}
        />
        <FilterChips
          value={dateFilter}
          onChange={setDateFilter}
          customDate={customDate}
          onCustomDateChange={setCustomDate}
        />
        <ViewToggle
          options={[
            { value: 'list', label: 'List' },
            { value: 'grid', label: 'Grid' },
          ]}
          value={view}
          onChange={setView}
        />
      </div>

      <div className="flex min-h-11 items-center justify-between rounded-xl border border-brand-teal/20 bg-brand-tealLight/70 px-4 py-2.5 shadow-elevation-1 ease-premium">
        <div className="flex items-center gap-2 text-body text-neutral-text">
          <Zap className="h-4 w-4 shrink-0 text-brand-teal" strokeWidth={1.75} />
          {autoJoinBannerState === 'all-on' && 'Auto Join meetings enabled'}
          {autoJoinBannerState === 'all-off' && 'Auto Join meetings disabled'}
          {autoJoinBannerState === 'mixed' &&
            `Auto Join enabled for ${autoJoinOnCount} of ${actionableMeetings.length} meetings`}
        </div>
        <Toggle
          checked={autoJoinBannerState === 'all-on'}
          indeterminate={autoJoinBannerState === 'mixed'}
          onChange={handleGlobalAutoJoin}
          ariaLabel="Auto join all meetings in current filter"
        />
      </div>

      <div className="space-y-5">
        {dateFilter === 'custom' ? (
          <DayGroupSection
            label="Custom"
            date={customDate}
            meetings={filtered}
            view={view}
            onAutoJoinChange={handleAutoJoinChange}
          />
        ) : (
          standardSections
            .filter((s) => filterToGroups[dateFilter].includes(s.label))
            .map((s) => (
              <DayGroupSection
                key={s.label}
                label={s.label}
                date={s.date}
                meetings={grouped[s.label]}
                view={view}
                onAutoJoinChange={handleAutoJoinChange}
              />
            ))
        )}
      </div>

      {filtered.length === 0 && (
        <EmptyState
          icon={CalendarX}
          title="No meetings found"
          description="Nothing matches your current search or date filter."
          actionHint="Try clearing the search box or switching to This Week."
        />
      )}
    </div>
  )
}
