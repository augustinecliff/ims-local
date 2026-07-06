import { useEffect, useState } from 'react'

import { useSmoothedArray } from './useSmoothedArray'

function seedSeries(pointCount: number): number[] {
  return Array.from({ length: pointCount }, (_, i) => 50 + Math.sin(i * 0.4) * 20)
}

export function useLiveLineSeries(
  pointCount: number,
  active: boolean,
  intervalMs = 400,
  volatility = 8,
) {
  const [targets, setTargets] = useState(() => seedSeries(pointCount))

  useEffect(() => {
    if (!active) return

    const id = setInterval(() => {
      setTargets((prev) => {
        const last = prev[prev.length - 1] ?? 50
        const next = Math.max(8, Math.min(92, last + (Math.random() - 0.48) * volatility))
        return [...prev.slice(1), next]
      })
    }, intervalMs)

    return () => clearInterval(id)
  }, [active, intervalMs, volatility, pointCount])

  return useSmoothedArray(targets, active, 0.14)
}

export function pointsToSvgPath(
  values: number[],
  width: number,
  height: number,
  padding = 4,
): string {
  if (values.length < 2) return ''

  const innerW = width - padding * 2
  const innerH = height - padding * 2
  const step = innerW / (values.length - 1)

  const pts = values.map((v, i) => ({
    x: padding + i * step,
    y: padding + innerH - (v / 100) * innerH,
  }))

  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`

  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const cpx = (prev.x + curr.x) / 2
    d += ` C ${cpx.toFixed(1)},${prev.y.toFixed(1)} ${cpx.toFixed(1)},${curr.y.toFixed(1)} ${curr.x.toFixed(1)},${curr.y.toFixed(1)}`
  }

  return d
}

export function pointsToAreaPath(
  values: number[],
  width: number,
  height: number,
  padding = 4,
): string {
  const line = pointsToSvgPath(values, width, height, padding)
  if (!line) return ''

  const innerW = width - padding * 2
  const bottom = height - padding
  const lastX = padding + innerW
  return `${line} L ${lastX},${bottom} L ${padding},${bottom} Z`
}
