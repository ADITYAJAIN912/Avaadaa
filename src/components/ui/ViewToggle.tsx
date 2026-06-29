interface ViewToggleOption<T extends string> {
  value: T
  label: string
}

interface ViewToggleProps<T extends string> {
  options: ViewToggleOption<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel?: string
}

export function ViewToggle<T extends string>({
  options,
  value,
  onChange,
  ariaLabel = 'View mode',
}: ViewToggleProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex h-9 shrink-0 items-center rounded-xl border border-neutral-border/70 bg-white p-0.5 shadow-elevation-1"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={`focus-ring inline-flex h-8 items-center rounded-lg px-3 text-caption font-medium ease-premium ${
            value === opt.value
              ? 'bg-brand-tealLight text-brand-teal shadow-elevation-1'
              : 'text-neutral-muted hover:bg-neutral-bg/80 hover:text-neutral-text'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
