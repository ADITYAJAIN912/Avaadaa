/**
 * Avaada Design System — public API
 *
 * Usage:
 * - CSS: import tokens via index.css (tokens.css + components.css)
 * - Tailwind: use theme utilities (text-body, shadow-elevation-1, etc.)
 * - TS: import { primitives, semantic, statusTokens } from '@/design-system'
 */

export { primitives } from './primitives'
export type { Primitives } from './primitives'

export { semantic, statusTokens } from './semantic'
export type { Semantic } from './semantic'

export {
  workspaceAi,
  workspaceIcon,
  workspaceLayout,
  ws,
  wsBadge,
  wsCount,
  priorityBadgeTone,
  riskBadgeTone,
  queueCardClass,
} from './workspace'
