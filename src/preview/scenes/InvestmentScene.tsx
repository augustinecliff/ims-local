import { motion } from 'framer-motion'

import { usePreview } from '../context/usePreview'

export function InvestmentScene() {
  const { state } = usePreview()
  const { investment } = state

  return (
    <div className="trailer-stage trailer-stage--investment">
      <motion.div
        className={`trailer-action-flash trailer-action-flash--panel trailer-action-flash--${investment.flash}`}
        animate={
          investment.flash === 'hit'
            ? { scale: [1, 1.08, 1] }
            : investment.flash === 'fire'
              ? { scale: [1, 1.03, 1] }
              : {}
        }
        transition={{ duration: 0.3, repeat: investment.flash === 'fire' ? Infinity : 0 }}
      >
        <span className={`trailer-side trailer-side--sm trailer-side--${investment.side}`}>
          {investment.side}
        </span>
        {investment.instrument && (
          <span className="trailer-instrument">{investment.instrument}</span>
        )}
        {investment.flash === 'hit' && <span className="trailer-hit trailer-hit--sm">EXECUTED</span>}
      </motion.div>
    </div>
  )
}
