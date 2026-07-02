import type { HTMLAttributes } from 'react'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-neutral-border/70 ${className}`}
      aria-hidden
      {...props}
    />
  )
}

export function HomePageSkeleton() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-2.5 lg:max-h-[calc(100dvh-8.25rem)]">
      <Skeleton className="h-[4rem] w-full rounded-xl" />
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[5rem] rounded-xl" />
        ))}
      </div>
      <div className="grid min-h-[20rem] flex-1 grid-cols-1 gap-2.5 lg:grid-cols-5">
        <Skeleton className="h-full min-h-[16rem] rounded-xl lg:col-span-3" />
        <Skeleton className="h-full min-h-[16rem] rounded-xl lg:col-span-2" />
      </div>
    </div>
  )
}

export function MeetingsPageSkeleton() {
  return (
    <div className="mx-auto flex h-[calc(100dvh-8.25rem)] max-w-[90rem] flex-col gap-2 overflow-hidden">
      <div className="panel-surface shrink-0 px-4 py-2">
        <div className="ds-skeleton h-5 w-56 rounded-md" />
        <div className="ds-skeleton mt-2 h-3 w-40 rounded-md" />
        <div className="mt-3 flex gap-2">
          <div className="ds-skeleton h-8 w-48 rounded-lg" />
          <div className="ds-skeleton ml-auto h-8 w-52 rounded-lg" />
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 lg:grid-cols-[minmax(0,23fr)_minmax(0,58fr)_minmax(0,19fr)]">
        <div className="panel-surface flex max-h-[42vh] flex-col lg:max-h-none">
          <div className="bg-surface-sunken/50 px-4 py-2">
            <div className="ds-skeleton h-4 w-28 rounded-md" />
            <div className="ds-skeleton mt-1.5 h-3 w-20 rounded-md" />
          </div>
          <div className="space-y-2 p-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="ds-skeleton h-16 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="panel-surface flex min-h-0 flex-col">
          <div className="bg-surface-sunken/50 px-4 py-2">
            <div className="ds-skeleton h-3 w-24 rounded-md" />
            <div className="ds-skeleton mt-1.5 h-5 w-3/4 max-w-md rounded-md" />
            <div className="ds-skeleton mt-1.5 h-3 w-40 rounded-md" />
          </div>
          <div className="space-y-3 p-4">
            <div className="ds-skeleton h-36 rounded-lg" />
            <div className="ds-skeleton h-24 rounded-lg" />
            <div className="ds-skeleton h-20 rounded-lg" />
            <div className="ds-skeleton h-20 rounded-lg" />
          </div>
        </div>

        <div className="panel-surface hidden min-h-0 flex-col lg:flex">
          <div className="bg-surface-sunken/50 px-4 py-2">
            <div className="ds-skeleton h-4 w-20 rounded-md" />
            <div className="ds-skeleton mt-1.5 h-3 w-32 rounded-md" />
          </div>
          <div className="space-y-2 p-3">
            <div className="ds-skeleton h-24 rounded-lg" />
            <div className="ds-skeleton h-32 rounded-lg" />
            <div className="ds-skeleton h-28 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ActionItemsPageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row">
        <Skeleton className="h-11 flex-1 rounded-xl" />
        <Skeleton className="h-11 w-80 rounded-xl" />
        <Skeleton className="h-11 w-36 rounded-xl" />
      </div>
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-96 w-full rounded-2xl" />
    </div>
  )
}

export function CalendarPageSkeleton() {
  return (
    <div className="mx-auto flex h-[calc(100dvh-7rem)] max-w-7xl flex-col gap-2.5 overflow-hidden lg:h-[calc(100dvh-6.5rem)]">
      <div className="h-20 shrink-0 animate-pulse rounded-xl bg-neutral-border/70" />
      <div className="flex min-h-0 flex-1 gap-2.5">
        <div className="flex-1 animate-pulse rounded-xl bg-neutral-border/70" />
        <div className="w-72 animate-pulse rounded-xl bg-neutral-border/70" />
      </div>
    </div>
  )
}
