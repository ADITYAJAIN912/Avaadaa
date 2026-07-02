import { useCallback, useEffect, useRef, useState } from 'react'
import { workspaceAi } from '../../design-system/workspace'
import {
  calculateSafeInitialPosition,
  clampPanelWidth,
  dragPanelPosition,
  estimatePanelHeight,
  getViewportSize,
  handleViewportResize,
  resizePanelFromLeftEdge,
  type PanelPoint,
} from './floatingPanelViewport'

type FloatingInteraction =
  | { kind: 'drag'; startX: number; startY: number; startLeft: number; startTop: number }
  | { kind: 'resize'; startX: number; startLeft: number; startTop: number; startWidth: number }

interface UseWorkspaceFloatingPanelOptions {
  open: boolean
  enabled?: boolean
}

/** Shared drag/resize state for floating Avaada AI panels. */
export function useWorkspaceFloatingPanel({
  open,
  enabled = true,
}: UseWorkspaceFloatingPanelOptions) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>(workspaceAi.defaultWidth)
  const [position, setPosition] = useState<PanelPoint>({ x: 0, y: workspaceAi.defaultTop })
  const [ready, setReady] = useState(false)
  const [interaction, setInteraction] = useState<FloatingInteraction | null>(null)

  const positionRef = useRef(position)
  const widthRef = useRef(width)

  useEffect(() => {
    positionRef.current = position
  }, [position])

  useEffect(() => {
    widthRef.current = width
  }, [width])

  const measurePanelHeight = useCallback((): number => {
    const measured = panelRef.current?.getBoundingClientRect().height
    if (measured && measured > 0) return measured
    return estimatePanelHeight()
  }, [])

  const applyViewportConstraints = useCallback(() => {
    const height = measurePanelHeight()
    const result = handleViewportResize(positionRef.current, widthRef.current, height)
    positionRef.current = result.position
    widthRef.current = result.width
    setPosition(result.position)
    setWidth(result.width)
  }, [measurePanelHeight])

  useEffect(() => {
    if (!open) {
      setReady(false)
    }
  }, [open])

  useEffect(() => {
    if (!open || ready || !enabled) return

    const height = estimatePanelHeight()
    const initialWidth = clampPanelWidth(widthRef.current)
    const initial = calculateSafeInitialPosition(initialWidth, height)
    widthRef.current = initialWidth
    positionRef.current = initial
    setWidth(initialWidth)
    setPosition(initial)
    setReady(true)
  }, [open, ready, enabled])

  useEffect(() => {
    if (!open || !ready) return

    const frame = requestAnimationFrame(() => {
      applyViewportConstraints()
    })

    return () => cancelAnimationFrame(frame)
  }, [open, ready, applyViewportConstraints])

  useEffect(() => {
    if (!open || !ready) return

    const onViewportResize = () => {
      applyViewportConstraints()
    }

    window.addEventListener('resize', onViewportResize)
    return () => window.removeEventListener('resize', onViewportResize)
  }, [open, ready, applyViewportConstraints])

  useEffect(() => {
    if (!interaction) return

    const onPointerMove = (event: PointerEvent) => {
      const viewport = getViewportSize()
      const height = measurePanelHeight()

      if (interaction.kind === 'drag') {
        const next = dragPanelPosition(
          interaction.startLeft,
          interaction.startTop,
          event.clientX - interaction.startX,
          event.clientY - interaction.startY,
          widthRef.current,
          viewport,
          height,
        )
        positionRef.current = next
        setPosition(next)
        return
      }

      const result = resizePanelFromLeftEdge(
        interaction.startLeft,
        interaction.startWidth,
        interaction.startTop,
        event.clientX - interaction.startX,
        viewport,
        height,
      )
      positionRef.current = result.position
      widthRef.current = result.width
      setPosition(result.position)
      setWidth(result.width)
    }

    const onPointerUp = () => setInteraction(null)

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [interaction, measurePanelHeight])

  const startDrag = (event: { clientX: number; clientY: number; preventDefault: () => void }) => {
    event.preventDefault()
    setInteraction({
      kind: 'drag',
      startX: event.clientX,
      startY: event.clientY,
      startLeft: positionRef.current.x,
      startTop: positionRef.current.y,
    })
  }

  const startResize = (event: { clientX: number; preventDefault: () => void }) => {
    event.preventDefault()
    setInteraction({
      kind: 'resize',
      startX: event.clientX,
      startLeft: positionRef.current.x,
      startTop: positionRef.current.y,
      startWidth: widthRef.current,
    })
  }

  return {
    panelRef,
    width,
    position,
    ready,
    startDrag,
    startResize,
    setInteraction,
  }
}
