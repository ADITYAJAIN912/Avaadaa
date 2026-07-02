/**
 * Avaada Design System — semantic tokens
 * Map UI intent → CSS variables. Prefer these names in new code.
 */

export const semantic = {
  surface: {
    canvas: 'var(--surface-canvas)',
    default: 'var(--surface-default)',
    raised: 'var(--surface-raised)',
    sunken: 'var(--surface-sunken)',
    overlay: 'var(--surface-overlay)',
    accent: 'var(--surface-accent)',
    accentStrong: 'var(--surface-accent-strong)',
  },

  text: {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    tertiary: 'var(--text-tertiary)',
    disabled: 'var(--text-disabled)',
    inverse: 'var(--text-inverse)',
    accent: 'var(--text-accent)',
    link: 'var(--text-link)',
  },

  border: {
    default: 'var(--border-default)',
    subtle: 'var(--border-subtle)',
    strong: 'var(--border-strong)',
    accent: 'var(--border-accent)',
    focus: 'var(--border-focus)',
  },

  interactive: {
    hover: 'var(--interactive-hover)',
    active: 'var(--interactive-active)',
    selected: 'var(--interactive-selected)',
  },

  elevation: {
    0: 'var(--elevation-0)',
    1: 'var(--elevation-1)',
    2: 'var(--elevation-2)',
    3: 'var(--elevation-3)',
  },

  /** Typography roles — pair with Tailwind text-* utilities */
  typography: {
    pageTitle: 'text-display-md font-semibold tracking-tight text-primary',
    sectionTitle: 'text-heading-sm font-semibold tracking-tight text-primary',
    cardTitle: 'text-body font-semibold text-primary',
    body: 'text-body text-primary',
    bodySecondary: 'text-body text-secondary',
    caption: 'text-caption text-tertiary',
    label: 'text-micro font-medium uppercase tracking-wider text-tertiary',
    stat: 'text-display-sm font-bold tabular-nums tracking-tight text-primary',
    metadata: 'text-small text-tertiary',
  },

  /** Component size presets */
  button: {
    sm: 'h-control-sm px-3 text-caption',
    md: 'h-control-md px-4 text-body',
    lg: 'h-control-lg px-5 text-body-lg',
  },

  icon: {
    inline: 'h-icon-xs w-icon-xs',
    button: 'h-icon-sm w-icon-sm',
    default: 'h-icon-md w-icon-md',
    emphasis: 'h-icon-lg w-icon-lg',
    empty: 'h-icon-xl w-icon-xl',
  },

  radius: {
    control: 'rounded-sm',
    chip: 'rounded-md',
    panel: 'rounded-lg',
    pill: 'rounded-full',
  },

  motion: {
    colors: 'transition-colors duration-fast ease-default',
    opacity: 'transition-opacity duration-normal ease-out',
    transform: 'transition-transform duration-normal ease-out',
    all: 'transition-all duration-normal ease-out',
  },
} as const

/** Status semantic colors for badges, indicators, calendar categories */
export const statusTokens = {
  success: { bg: 'var(--color-success-muted)', text: 'var(--color-success)', border: 'var(--color-success)' },
  warning: { bg: 'var(--color-warning-muted)', text: 'var(--color-warning)', border: 'var(--color-warning)' },
  danger: { bg: 'var(--color-danger-muted)', text: 'var(--color-danger)', border: 'var(--color-danger)' },
  info: { bg: 'var(--color-info-muted)', text: 'var(--color-info)', border: 'var(--color-info)' },
  neutral: { bg: 'var(--surface-sunken)', text: 'var(--text-tertiary)', border: 'var(--border-default)' },
} as const

export type Semantic = typeof semantic
