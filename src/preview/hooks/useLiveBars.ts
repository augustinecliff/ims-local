import { useEffect, useState } from 'react'

import { useSmoothedArray } from './useSmoothedArray'

function randomHeights(count: number, min = 25, max = 95): number[] {
  return Array.from({ length: count }, () => min + Math.random() * (max - min))
}

export function useLiveBars(count: number, active: boolean, intervalMs = 420) {
  const [targets, setTargets] = useState(() => randomHeights(count))

  useEffect(() => {
    if (!active) return

    const id = setInterval(() => {
      setTargets(randomHeights(count))
    }, intervalMs)

    return () => clearInterval(id)
  }, [count, active, intervalMs])

  return useSmoothedArray(targets, active, 0.16)
}
