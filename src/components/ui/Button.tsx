import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-teal text-white shadow-elevation-1 hover:bg-brand-teal/90 btn-premium',
  secondary:
    'border border-neutral-border/80 bg-white text-neutral-text shadow-elevation-1 hover:bg-neutral-bg btn-premium',
  ghost: 'text-neutral-muted hover:bg-neutral-bg/80 hover:text-neutral-text btn-premium',
  icon: 'p-2.5 text-neutral-muted hover:bg-neutral-bg/80 hover:text-neutral-text btn-premium',
}

export function Button({
  variant = 'secondary',
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const base =
    'focus-ring inline-flex items-center justify-center gap-2 rounded-xl text-body font-medium ease-premium disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function IconButton({
  children,
  className = '',
  'aria-label': ariaLabel,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`focus-ring relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-muted ease-premium hover:bg-white hover:text-neutral-text disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
