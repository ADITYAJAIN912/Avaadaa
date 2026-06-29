interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  compact?: boolean
}

export function PageHeader({ eyebrow, title, subtitle, compact = false }: PageHeaderProps) {
  return (
    <header className={compact ? 'space-y-0.5' : 'space-y-1'}>
      {eyebrow && <p className="text-caption text-neutral-muted">{eyebrow}</p>}
      <h2 className="text-page-title font-semibold tracking-tight text-neutral-text">{title}</h2>
      {subtitle && <p className="text-body text-neutral-muted">{subtitle}</p>}
    </header>
  )
}
