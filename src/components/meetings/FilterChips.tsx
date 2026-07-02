import { TODAY } from '../../data/constants'
import { ws } from '../../design-system/workspace'
import { SegmentedControl } from '../ui/SegmentedControl'

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
    <div className="flex flex-wrap items-center gap-2">
      <SegmentedControl
        options={filters}
        value={value}
        onChange={onChange}
        ariaLabel="Date filter"
      />
      {value === 'custom' && onCustomDateChange && (
        <input
          type="date"
          value={customDate}
          onChange={(e) => onCustomDateChange(e.target.value)}
          className={ws.controlInput}
          aria-label="Pick a custom date"
        />
      )}
    </div>
  )
}
