import { MeetingsPageSkeleton } from '../components/ui/Skeleton'
import { ExecutiveMeetingWorkspace } from '../components/meetings/workspace/ExecutiveMeetingWorkspace'
import { useMeetings } from '../context/MeetingsContext'
import { usePageLoading } from '../hooks/usePageLoading'

export function Meetings() {
  const isLoading = usePageLoading(450)
  const { meetings } = useMeetings()

  if (isLoading) {
    return <MeetingsPageSkeleton />
  }

  return <ExecutiveMeetingWorkspace meetings={meetings} />
}
