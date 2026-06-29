import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import { mockMeetings } from '../data/mockMeetings'
import type { Meeting } from '../types/meeting'
import {
  getUpcomingMeetings,
  getRecentMeetingToday,
  getMeetingsThisWeekFrom,
  countUpcomingToday,
} from '../utils/meetings'

interface MeetingsContextValue {
  meetings: Meeting[]
  updateAutoJoin: (id: string, value: boolean) => void
  setAutoJoinForIds: (ids: string[], value: boolean) => void
  upcomingForHome: Meeting[]
  recentToday: Meeting | undefined
  meetingsThisWeekCount: number
  upcomingTodayCount: number
}

const MeetingsContext = createContext<MeetingsContextValue | null>(null)

export function MeetingsProvider({ children }: { children: ReactNode }) {
  // TODO(backend): hydrate from GET /api/v1/meetings instead of mockMeetings
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings)

  const updateAutoJoin = useCallback((id: string, value: boolean) => {
    setMeetings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, autoJoin: value } : m)),
    )
  }, [])

  const setAutoJoinForIds = useCallback((ids: string[], value: boolean) => {
    const idSet = new Set(ids)
    setMeetings((prev) =>
      prev.map((m) => (idSet.has(m.id) ? { ...m, autoJoin: value } : m)),
    )
  }, [])

  const upcomingForHome = useMemo(() => getUpcomingMeetings(meetings, 3), [meetings])
  const recentToday = useMemo(() => getRecentMeetingToday(meetings), [meetings])
  const meetingsThisWeekCount = useMemo(() => getMeetingsThisWeekFrom(meetings).length, [meetings])
  const upcomingTodayCount = useMemo(() => countUpcomingToday(meetings), [meetings])

  return (
    <MeetingsContext.Provider
      value={{
        meetings,
        updateAutoJoin,
        setAutoJoinForIds,
        upcomingForHome,
        recentToday,
        meetingsThisWeekCount,
        upcomingTodayCount,
      }}
    >
      {children}
    </MeetingsContext.Provider>
  )
}

export function useMeetings() {
  const ctx = useContext(MeetingsContext)
  if (!ctx) throw new Error('useMeetings must be used within MeetingsProvider')
  return ctx
}
