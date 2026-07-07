import { motion } from 'framer-motion'

import { fluidSpringSoft } from '../animations/variants'
import {
  pointsToAreaPath,
  pointsToSvgPath,
  useLiveLineSeries,
} from '../hooks/useLiveLineSeries'

interface LiveLineGraphProps {
  label?: string
  width?: number
  height?: number
  pointCount?: number
  color?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose'
  volatility?: number
}

const COLORS = {
  cyan: { stroke: '#22d3ee', fill: 'rgba(34,211,238,0.2)' },
  violet: { stroke: '#a78bfa', fill: 'rgba(167,139,250,0.2)' },
  emerald: { stroke: '#34d399', fill: 'rgba(52,211,153,0.2)' },
  amber: { stroke: '#fbbf24', fill: 'rgba(251,191,36,0.2)' },
  rose: { stroke: '#fb7185', fill: 'rgba(251,113,133,0.2)' },
}

export function LiveLineGraph({
  label = 'Price',
  width = 280,
  height = 72,
  pointCount = 32,
  color = 'cyan',
  volatility = 10,
}: LiveLineGraphProps) {
  const points = useLiveLineSeries(pointCount, true, 400, volatility)
  const palette = COLORS[color]
  const linePath = pointsToSvgPath(points, width, height)
  const areaPath = pointsToAreaPath(points, width, height)
  const last = points[points.length - 1] ?? 0
  const prev = points[points.length - 3] ?? last
  const up = last >= prev

  return (
    <motion.div
      className="live-line"
      layout
      transition={fluidSpringSoft}
    >
      <div className="live-line__header">
        <span className="live-line__label">{label}</span>
        <motion.span
          className={`live-line__value live-line__value--${up ? 'up' : 'down'}`}
          animate={{ opacity: 1, y: 0 }}
          transition={fluidSpringSoft}
        >
          {up ? '▲' : '▼'} {last.toFixed(1)}
        </motion.span>
      </div>
      <svg
        className="live-line__svg"
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
      >
        <motion.path
          d={areaPath}
          fill={palette.fill}
          animate={{ d: areaPath }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke={palette.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ d: linePath }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </motion.div>
  )
}
