import { TODAY } from '../../data/constants'
import { Chip } from '../ui/Chip'

export type DateFilter = 'today' | 'tomorrow' | 'this-week' | 'custom'

interface FilterChipsProps {
  value: DateFilter
  onChange: (value: DateFilter) => void
  customDate?: string
  onCustomDateChange?: (date: string) => void
}

const filters: { value: DateFilter; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'this-week', label: 'This Week' },
  { value: 'custom', label: 'Custom' },
]

export function FilterChips({
  value,
  onChange,
  customDate = TODAY,
  onCustomDateChange,
}: FilterChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Date filter">
      {filters.map((f) => (
        <Chip
          key={f.value}
          label={f.label}
          active={value === f.value}
          onClick={() => onChange(f.value)}
        />
      ))}
      {value === 'custom' && onCustomDateChange && (
        <input
          type="date"
          value={customDate}
          onChange={(e) => onCustomDateChange(e.target.value)}
          className="focus-ring rounded-xl border border-neutral-border bg-white px-3 py-2 text-body text-neutral-text shadow-sm ease-premium outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          aria-label="Pick a custom date"
        />
      )}
    </div>
  )
}
