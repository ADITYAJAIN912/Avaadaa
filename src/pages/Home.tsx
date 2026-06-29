import { Calendar, Mail, CheckSquare, Clock } from 'lucide-react'
import { StatCard } from '../components/ui/StatCard'
import { UpcomingSection } from '../components/home/UpcomingRow'
import { RecentItem } from '../components/home/RecentItem'
import { PageHeader } from '../components/ui/PageHeader'
import { HomePageSkeleton } from '../components/ui/Skeleton'
import { USER_NAME } from '../data/constants'
import { getOpenActionCount } from '../data/mockActionItems'
import { formatLongDate } from '../utils/helpers'
import { useMeetings } from '../context/MeetingsContext'
import { usePageLoading } from '../hooks/usePageLoading'

export function Home() {
  const isLoading = usePageLoading(400)
  const {
    upcomingForHome,
    recentToday,
    meetingsThisWeekCount,
    upcomingTodayCount,
    updateAutoJoin,
  } = useMeetings()

  const openActions = getOpenActionCount()

  if (isLoading) {
    return <HomePageSkeleton />
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        eyebrow="Welcome back,"
        title={USER_NAME}
        subtitle={formatLongDate()}
        compact
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          value={meetingsThisWeekCount}
          label="Meetings this week"
          icon={Calendar}
          to="/meetings?filter=this-week"
          trend="+3 compared to last week"
          trendPositive
        />
        <StatCard
          value={47}
          label="Emails Delivered"
          icon={Mail}
          to="/meetings"
          trend="+12% this month"
          trendPositive
        />
        <StatCard
          value={openActions}
          label="My Open Actions"
          icon={CheckSquare}
          to="/action-items?filter=open"
          trend="3 due today"
        />
        <StatCard
          value={upcomingTodayCount}
          label="Upcoming"
          icon={Clock}
          to="/meetings?filter=today"
          trend="Remaining today"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UpcomingSection meetings={upcomingForHome} onAutoJoinChange={updateAutoJoin} />
        </div>
        {recentToday && (
          <div className="lg:col-span-1">
            <RecentItem meeting={recentToday} />
          </div>
        )}
      </div>
    </div>
  )
}
