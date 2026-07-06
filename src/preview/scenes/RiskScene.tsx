import { motion } from 'framer-motion'

import { PREVIEW_ALERTS } from '../mock-data'
import { usePreview } from '../context/usePreview'

export function RiskScene() {
  const { state } = usePreview()
  const { risk } = state

  return (
    <div className={`trailer-stage trailer-stage--risk ${risk.alarm ? 'trailer-stage--alarm' : ''}`}>
      <div className="trailer-alert-stack trailer-alert-stack--panel">
        {PREVIEW_ALERTS.slice(0, risk.alertStack).map((a, i) => (
          <motion.div
            key={a.id}
            className={`trailer-alert-banner trailer-alert-banner--${a.severity}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            {a.title}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
