import type { BusinessImpactDimensions } from '../../../../types/decisionIntelligence'
import { ws } from '../workspaceUi'

interface BusinessImpactBlockProps {
  impact: BusinessImpactDimensions
}

const dimensions: { key: keyof BusinessImpactDimensions; label: string }[] = [
  { key: 'operational', label: 'Operational' },
  { key: 'financial', label: 'Financial' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'compliance', label: 'Compliance' },
  { key: 'customer', label: 'Customer' },
]

export function BusinessImpactBlock({ impact }: BusinessImpactBlockProps) {
  const filled = dimensions.filter(({ key }) => impact[key])

  if (filled.length === 0) return null

  return (
    <div className="mt-3">
      <p className={ws.label}>Business impact</p>
      <dl className="mt-2 grid gap-2 sm:grid-cols-2">
        {filled.map(({ key, label }) => (
          <div key={key} className="min-w-0">
            <dt className="text-micro font-medium text-neutral-muted">{label}</dt>
            <dd className="mt-0.5 text-small leading-relaxed text-neutral-text">{impact[key]}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
