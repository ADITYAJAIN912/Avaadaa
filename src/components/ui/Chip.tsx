interface ChipProps {
  label: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export function Chip({ label, active = false, onClick, className = '' }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`chip focus-ring ${active ? 'chip-active' : 'chip-inactive'} ${className}`}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}
