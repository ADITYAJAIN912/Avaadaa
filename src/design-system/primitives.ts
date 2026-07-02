/**
 * Avaada Design System — primitive tokens (raw values)
 * Use semantic tokens in UI code; primitives for documentation and theme wiring.
 */

export const primitives = {
  color: {
    white: '#ffffff',
    black: '#0f172a',
    brand: {
      navy: '#0f2a4a',
      teal: '#10a37f',
      tealHover: '#0d8f6f',
      tealMuted: '#e6f7f1',
      tealSubtle: '#f0faf6',
    },
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    status: {
      success: '#16a34a',
      successMuted: '#f0fdf4',
      warning: '#d97706',
      warningMuted: '#fffbeb',
      danger: '#dc2626',
      dangerMuted: '#fef2f2',
      info: '#2563eb',
      infoMuted: '#eff6ff',
    },
  },

  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
  } as const,

  radius: {
    none: '0',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  } as const,

  fontSize: {
    micro: '0.625rem',
    small: '0.6875rem',
    caption: '0.75rem',
    body: '0.875rem',
    bodyLg: '1rem',
    headingSm: '1.125rem',
    headingMd: '1.25rem',
    headingLg: '1.5rem',
    displaySm: '1.875rem',
    displayMd: '2rem',
  } as const,

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  } as const,

  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
  } as const,

  shadow: {
    none: 'none',
    xs: '0 1px 2px rgba(15, 23, 42, 0.04)',
    sm: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)',
    md: '0 2px 4px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.07)',
    lg: '0 4px 8px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.08)',
  } as const,

  icon: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
  } as const,

  controlHeight: {
    xs: '1.75rem',
    sm: '2rem',
    md: '2.25rem',
    lg: '2.5rem',
    xl: '2.75rem',
  } as const,

  duration: {
    instant: 80,
    fast: 120,
    normal: 200,
    slow: 320,
    slower: 480,
  } as const,

  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    inOut: 'cubic-bezier(0.45, 0, 0.55, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  } as const,

  zIndex: {
    base: 0,
    raised: 10,
    dropdown: 20,
    sticky: 30,
    overlay: 40,
    modal: 50,
    toast: 60,
  } as const,
} as const

export type Primitives = typeof primitives
