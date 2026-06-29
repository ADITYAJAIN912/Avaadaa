import type { LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCountUp } from '../../hooks/useCountUp'
import { Card } from './Card'

interface StatCardProps {
  value: number | string
  label: string
  icon: LucideIcon
  to: string
  trend?: string
  trendPositive?: boolean
  animate?: boolean
}

export function StatCard({
  value,
  label,
  icon: Icon,
  to,
  trend,
  trendPositive,
  animate = true,
}: StatCardProps) {
  const navigate = useNavigate()
  const numericValue = typeof value === 'number' ? value : null
  const animated = useCountUp(numericValue ?? 0, 700, animate && numericValue !== null)

  return (
    <Card
      variant="interactive"
      as="button"
      type="button"
      onClick={() => navigate(to)}
      className="group focus-ring flex min-h-[6.75rem] w-full flex-col p-4 text-left"
      aria-label={`${label}, ${numericValue !== null ? value : String(value)}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-caption font-medium leading-snug text-neutral-muted">{label}</span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-bg/80 ease-premium group-hover:bg-brand-tealLight/50">
          <Icon
            className="h-3 w-3 text-neutral-muted/50 ease-premium group-hover:text-brand-teal/70"
            strokeWidth={1.5}
          />
        </span>
      </div>
      <span className="mt-1.5 text-stat font-bold tabular-nums tracking-tight text-neutral-text">
        {numericValue !== null ? animated : value}
      </span>
      {trend ? (
        <span
          className={`mt-1 text-caption leading-snug ${
            trendPositive ? 'text-brand-teal' : 'text-neutral-muted'
          }`}
        >
          {trend}
        </span>
      ) : (
        <span className="mt-1 text-caption leading-snug text-transparent" aria-hidden>
          —
        </span>
      )}
    </Card>
  )
}
