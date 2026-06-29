import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0F2A4A',
          teal: '#10A37F',
          tealLight: '#E6F7F1',
        },
        status: {
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#3B82F6',
        },
        neutral: {
          bg: '#F8FAFC',
          border: '#E2E8F0',
          muted: '#64748B',
          text: '#0F172A',
        },
      },
      fontSize: {
        caption: ['12px', { lineHeight: '1.5' }],
        meta: ['12px', { lineHeight: '1.5' }],
        body: ['14px', { lineHeight: '1.5' }],
        base: ['16px', { lineHeight: '1.5' }],
        'card-title': ['18px', { lineHeight: '1.4' }],
        section: ['24px', { lineHeight: '1.3' }],
        'topbar-title': ['22px', { lineHeight: '1.3' }],
        'page-title': ['32px', { lineHeight: '1.25' }],
        stat: ['30px', { lineHeight: '1.15' }],
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'elevation-1': '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)',
        'elevation-2': '0 2px 4px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.07)',
        'elevation-3': '0 4px 8px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.08)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
} satisfies Config
