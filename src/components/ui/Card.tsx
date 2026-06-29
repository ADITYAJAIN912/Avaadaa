import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

type CardVariant = 'default' | 'interactive' | 'container'
type CardElement = 'div' | 'section' | 'article' | 'button'

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  variant?: CardVariant
  as?: CardElement
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

const variantClasses: Record<CardVariant, string> = {
  default: 'card-surface',
  interactive: 'card-surface-interactive card-hover-lift',
  container: 'container-surface',
}

export function Card({
  children,
  variant = 'default',
  as: Tag = 'div',
  className = '',
  type,
  ...props
}: CardProps) {
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
