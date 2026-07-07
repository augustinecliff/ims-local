import { motion } from 'framer-motion'

import { fluidSpringSoft } from '../animations/variants'
import { useLiveBars } from '../hooks/useLiveBars'

const BAR_GRADIENTS = [
  'linear-gradient(180deg, #22d3ee, #3b82f6)',
  'linear-gradient(180deg, #a78bfa, #ec4899)',
  'linear-gradient(180deg, #34d399, #14b8a6)',
  'linear-gradient(180deg, #fbbf24, #f59e0b)',
  'linear-gradient(180deg, #fb7185, #ef4444)',
]

interface LiveBarGraphProps {
  label?: string
  barCount?: number
  variant?: 'default' | 'compact' | 'wide'
  live?: boolean
}

export function LiveBarGraph({
  label = 'Live',
  barCount = 12,
  variant = 'default',
  live = true,
}: LiveBarGraphProps) {
  const heights = useLiveBars(barCount, live)

  return (
    <motion.div
      className={`live-bars live-bars--${variant}`}
      layout
      transition={fluidSpringSoft}
    >
      <div className="live-bars__header">
        <span className="live-bars__pulse" />
        <span className="live-bars__label">{label}</span>
        <span className="live-bars__tag">LIVE</span>
      </div>
      <div className="live-bars__chart">
        {heights.map((h, i) => (
          <motion.div
            key={i}
            className="live-bars__bar"
            style={{ background: BAR_GRADIENTS[i % BAR_GRADIENTS.length] }}
            animate={{ height: `${h}%` }}
            transition={fluidSpringSoft}
          />
        ))}
      </div>
    </motion.div>
  )
}
