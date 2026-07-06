import { useEffect, useRef, useState } from 'react'

/** Ease display values toward targets every frame for fluid motion */
export function useSmoothedArray(
  targets: number[],
  active: boolean,
  smoothing = 0.12,
): number[] {
  const [display, setDisplay] = useState(targets)
  const targetsRef = useRef(targets)

  useEffect(() => {
    targetsRef.current = targets
  }, [targets])

  useEffect(() => {
    if (!active) return

    let frame = 0
    const tick = () => {
      const next = targetsRef.current
      setDisplay((prev) => {
        if (prev.length !== next.length) return next

        const len = next.length
        const out = new Array<number>(len)
        let settled = true
        for (let i = 0; i < len; i++) {
          const from = prev[i] ?? next[i]
          const to = next[i]
          const delta = to - from
          if (Math.abs(delta) > 0.05) settled = false
          out[i] = from + delta * smoothing
        }
        if (settled) return next
        return out
      })
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, smoothing, targets.length])

  if (display.length !== targets.length) {
    return targets
  }

  return display
}
