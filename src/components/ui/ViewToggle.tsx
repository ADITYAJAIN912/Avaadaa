import { SegmentedControl, type SegmentedControlOption } from './SegmentedControl'

interface ViewToggleOption<T extends string> {
  value: T
  label: string
}

interface ViewToggleProps<T extends string> {
  options: ViewToggleOption<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel?: string
  size?: 'sm' | 'md'
  className?: string
}

export function ViewToggle<T extends string>({
  options,
  value,
  onChange,
  ariaLabel = 'View mode',
  size = 'md',
  className,
}: ViewToggleProps<T>) {
  return (
    <SegmentedControl
      options={options as SegmentedControlOption<T>[]}
      value={value}
      onChange={onChange}
      ariaLabel={ariaLabel}
      size={size}
      className={className}
    />
  )
}
