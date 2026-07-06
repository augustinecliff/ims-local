import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'

import { staggerChild, staggerContainer } from '../animations/variants'
import { usePreview } from '../context/usePreview'
import { usePreviewBreakpoint } from '../hooks/usePreviewBreakpoint'
import { LiveBarGraph } from './LiveBarGraph'
import { LiveLineGraph } from './LiveLineGraph'

const LINE_CHARTS = [
  { label: 'NSE 20 Index', color: 'cyan' as const, volatility: 9 },
  { label: 'Safaricom', color: 'emerald' as const, volatility: 12 },
  { label: 'Equity Bank', color: 'violet' as const, volatility: 10 },
  { label: 'KCB Group', color: 'amber' as const, volatility: 11 },
  { label: 'MMF Yield', color: 'rose' as const, volatility: 7 },
  { label: 'Africa Equity', color: 'cyan' as const, volatility: 13 },
]

const NAV_ACCENT: Record<string, string> = {
  portfolio: 'var(--pv-cyan)',
  research: 'var(--pv-violet)',
  investment: 'var(--pv-amber)',
  risk: 'var(--pv-rose)',
  engagement: 'var(--pv-emerald)',
}

export function SceneGraphWall() {
  const { state } = usePreview()
  const breakpoint = usePreviewBreakpoint()
  const accent = NAV_ACCENT[state.activeNav] ?? 'var(--pv-cyan)'
  const chartHeight = breakpoint === 'sm' ? 52 : breakpoint === 'md' ? 64 : 88
  const pointCount = breakpoint === 'sm' ? 28 : 40

  return (
    <div
      className="scene-graph-wall"
      style={{ '--graph-accent': accent } as CSSProperties}
    >
      <div className="scene-graph-wall__header">
        <span className="scene-graph-wall__pulse" />
        <span>Market overview</span>
        <span className="scene-graph-wall__live">LIVE</span>
      </div>
      <motion.div
        key={`grid-${state.activeNav}`}
        className="scene-graph-wall__grid"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {LINE_CHARTS.map((c) => (
          <motion.div key={c.label} variants={staggerChild}>
            <LiveLineGraph
              label={c.label}
              color={c.color}
              height={chartHeight}
              volatility={c.volatility}
              pointCount={pointCount}
            />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        key={`bars-${state.activeNav}`}
        className="scene-graph-wall__bars"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={staggerChild}>
          <LiveBarGraph label="Intraday volume" barCount={24} variant="wide" />
        </motion.div>
        <motion.div variants={staggerChild}>
          <LiveBarGraph label="Sector rotation" barCount={16} variant="wide" />
        </motion.div>
        <motion.div variants={staggerChild}>
          <LiveBarGraph label="FX flow" barCount={12} variant="compact" />
        </motion.div>
      </motion.div>
    </div>
  )
}
