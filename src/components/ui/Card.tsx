import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

type CardVariant = 'default' | 'interactive' | 'container'
type CardElement = 'div' | 'section' | 'article' | 'button'

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  variant?: CardVariant
  as?: CardElement
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

const variantClasses: Record<Exclude<CardVariant, 'container'>, string> = {
  default: 'card-surface',
  interactive: 'card-surface-interactive',
}

export function Card({
  children,
  variant = 'default',
  as: Tag = 'div',
  className = '',
  type,
  ...props
}: CardProps) {
  if (variant === 'container') {
    return (
      <Tag className={`panel-surface flex flex-col ${className}`} {...props}>
        <div className="surface-clip flex min-h-0 flex-1 flex-col">{children}</div>
      </Tag>
    )
  }

  return (
    <Tag
      className={`${variantClasses[variant]} ${className}`}
      {...(Tag === 'button' ? { type: type ?? 'button' } : {})}
      {...props}
    >
      {children}
    </Tag>
  )
}
