interface SectionHeaderProps {
  title: string
  badge?: string | number
  className?: string
}

export function SectionHeader({ title, badge, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <h3 className="text-section-title">{title}</h3>
      {badge !== undefined && (
        <span className="badge-pill bg-neutral-bg text-neutral-muted ring-1 ring-neutral-border/60">
          {badge}
        </span>
      )}
    </div>
  )
}
