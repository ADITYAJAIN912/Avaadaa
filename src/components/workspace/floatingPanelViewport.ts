import { workspaceAi } from '../../design-system/workspace'

export const VIEWPORT_MARGIN = 16

export interface PanelPoint {
  x: number
  y: number
}

export interface ViewportSize {
  width: number
  height: number
}

export function getViewportSize(): ViewportSize {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

/** Matches CSS: min(78dvh, 48rem) capped by viewport minus margins. */
export function estimatePanelHeight(viewportHeight = window.innerHeight): number {
  const fromDvh = viewportHeight * 0.78
  const fromRem = 48 * 16
  const fromViewport = viewportHeight - VIEWPORT_MARGIN * 2
  return Math.min(fromDvh, fromRem, fromViewport)
}

export function calculateMaxPanelWidth(viewportWidth = window.innerWidth): number {
  return Math.min(workspaceAi.maxWidth, viewportWidth - VIEWPORT_MARGIN * 2)
}

export function clampPanelWidth(width: number, viewportWidth = window.innerWidth): number {
  const max = calculateMaxPanelWidth(viewportWidth)
  const min = Math.min(workspaceAi.minWidth, max)
  return Math.min(max, Math.max(min, width))
}

export function clampPanelPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  viewport: ViewportSize = getViewportSize(),
): PanelPoint {
  const maxX = Math.max(VIEWPORT_MARGIN, viewport.width - width - VIEWPORT_MARGIN)
  const maxY = Math.max(VIEWPORT_MARGIN, viewport.height - height - VIEWPORT_MARGIN)

  return {
    x: Math.min(Math.max(VIEWPORT_MARGIN, x), maxX),
    y: Math.min(Math.max(VIEWPORT_MARGIN, y), maxY),
  }
}

export function calculateSafeInitialPosition(
  width: number,
  height: number,
  viewport: ViewportSize = getViewportSize(),
): PanelPoint {
  const clampedWidth = clampPanelWidth(width, viewport.width)
  const preferredY = Math.max(VIEWPORT_MARGIN, workspaceAi.defaultTop)
  const preferredX = viewport.width - clampedWidth - VIEWPORT_MARGIN

  return clampPanelPosition(preferredX, preferredY, clampedWidth, height, viewport)
}

export function handleViewportResize(
  position: PanelPoint,
  width: number,
  height: number,
  viewport: ViewportSize = getViewportSize(),
): { position: PanelPoint; width: number } {
  const clampedWidth = clampPanelWidth(width, viewport.width)
  const clampedPosition = clampPanelPosition(
    position.x,
    position.y,
    clampedWidth,
    height,
    viewport,
  )

  return { position: clampedPosition, width: clampedWidth }
}

export function resizePanelFromLeftEdge(
  startLeft: number,
  startWidth: number,
  startTop: number,
  deltaX: number,
  viewport: ViewportSize = getViewportSize(),
  measuredHeight?: number,
): { position: PanelPoint; width: number } {
  const height = measuredHeight ?? estimatePanelHeight(viewport.height)
  const rightEdge = startLeft + startWidth

  let nextWidth = clampPanelWidth(startWidth - deltaX, viewport.width)
  let nextLeft = rightEdge - nextWidth

  if (nextLeft < VIEWPORT_MARGIN) {
    nextLeft = VIEWPORT_MARGIN
    nextWidth = clampPanelWidth(rightEdge - VIEWPORT_MARGIN, viewport.width)
  }

  if (nextLeft + nextWidth > viewport.width - VIEWPORT_MARGIN) {
    nextWidth = clampPanelWidth(viewport.width - VIEWPORT_MARGIN - nextLeft, viewport.width)
  }

  const position = clampPanelPosition(nextLeft, startTop, nextWidth, height, viewport)

  return { position, width: nextWidth }
}

export function dragPanelPosition(
  startLeft: number,
  startTop: number,
  deltaX: number,
  deltaY: number,
  width: number,
  viewport: ViewportSize = getViewportSize(),
  measuredHeight?: number,
): PanelPoint {
  const height = measuredHeight ?? estimatePanelHeight(viewport.height)
  return clampPanelPosition(
    startLeft + deltaX,
    startTop + deltaY,
    width,
    height,
    viewport,
  )
}
