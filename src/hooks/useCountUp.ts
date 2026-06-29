import { useEffect, useState } from 'react'

export function useCountUp(
  target: number,
  duration = 700,
  enabled = true,
): number {
  const [value, setValue] = useState(enabled ? 0 : target)

  useEffect(() => {
    if (!enabled || target === 0) {
      setValue(target)
      return
    }

    let frame = 0
    const start = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(eased * target))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, enabled])

  return value
}
