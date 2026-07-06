import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'

import { FUNDS } from '@/types/funds'

import { usePreview } from '../context/usePreview'
import { PREVIEW_HOLDINGS } from '../mock-data'

const ORBIT_TICKERS = PREVIEW_HOLDINGS.slice(0, 6).map((h) => h.instrument)

export function PortfolioScene() {
  const { state } = usePreview()
  const { portfolio, fundId } = state
  const fund = FUNDS[fundId]

  return (
    <div className="trailer-stage trailer-stage--portfolio">
      <motion.div
        className="trailer-hero-metric"
        key={portfolio.heroValue}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      >
        <span className="trailer-hero-metric__label">{fund.name}</span>
        <span className="trailer-hero-metric__value">{portfolio.heroValue}</span>
        <span className="trailer-hero-metric__sub">NAV · {fund.currency}</span>
      </motion.div>

      {portfolio.orbitOn && (
        <div className="trailer-orbit trailer-orbit--compact">
          {ORBIT_TICKERS.map((t, i) => (
            <motion.span
              key={t}
              className="trailer-orbit__item"
              style={{ '--i': i } as CSSProperties}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  )
}
