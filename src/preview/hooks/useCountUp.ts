import { useEffect, useState } from 'react'

export function useCountUp(
  target: number,
  enabled: boolean,
  durationMs = 600,
  decimals = 1,
): string {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return

    const start = performance.now()
    let frame: number

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - (1 - t) ** 3
      setValue(target * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, enabled, durationMs])

  if (!enabled) {
    return (0).toFixed(decimals)
  }

  return value.toFixed(decimals)
}
