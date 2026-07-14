import { Skeleton } from './Skeleton'

export function HomeSkeleton() {
  return (
    <div className="flex h-full w-full flex-col min-h-0 animate-in fade-in duration-300">
      {/* Greet row */}
      <div className="mb-5 flex shrink-0 items-end justify-between gap-4">
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-10 w-64" />
        </div>
        <Skeleton className="h-[46px] w-32 rounded-[12px]" />
      </div>

      {/* Bento grid */}
      <div className="grid flex-1 min-h-0 grid-cols-1 gap-3.5 overflow-y-auto lg:grid-cols-12 lg:grid-rows-[auto_auto_minmax(0,1fr)] lg:overflow-hidden pb-4 lg:pb-0">
        {/* Hero tile */}
        <Skeleton className="rounded-lg lg:col-span-8 lg:row-span-2 h-64 lg:h-auto" />

        {/* Stat tiles */}
        <Skeleton className="rounded-lg lg:col-span-4 lg:row-span-1 h-32 lg:h-auto" />
        <Skeleton className="rounded-lg lg:col-span-4 lg:row-span-1 h-32 lg:h-auto" />

        {/* Schedule tile */}
        <Skeleton className="rounded-lg lg:col-span-7 lg:row-span-1 h-64 lg:h-auto" />

        {/* Right column (Actions & AI) */}
        <div className="flex flex-col gap-3.5 lg:col-span-5 lg:row-span-1 min-h-0">
          <Skeleton className="rounded-lg flex-1 min-h-0 h-48 lg:h-auto" />
          <Skeleton className="rounded-lg shrink-0 h-36" />
        </div>
      </div>
    </div>
  )
}

export function CalendarSkeleton() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-3.5 pb-10 animate-in fade-in duration-300">
      <Skeleton className="h-16 w-full rounded-xl shrink-0" />
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col lg:flex-row gap-6 lg:gap-8">
        <Skeleton className="w-full lg:w-72 shrink-0 h-full rounded-xl hidden lg:block" />
        <Skeleton className="flex-1 h-full rounded-xl" />
      </div>
    </div>
  )
}

export function MeetingsSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-4 animate-in fade-in duration-300">
      <div className="flex shrink-0 items-center justify-between">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
      <Skeleton className="h-12 w-full rounded-xl shrink-0" />
      <div className="flex-1 overflow-hidden">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    </div>
  )
}
