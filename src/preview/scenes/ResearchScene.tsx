import { motion } from 'framer-motion'

import { usePreview } from '../context/usePreview'

export function ResearchScene() {
  const { state } = usePreview()
  const { research } = state

  return (
    <div className="trailer-stage trailer-stage--research">
      {research.headline && (
        <motion.h2
          className="trailer-headline trailer-headline--panel"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {research.headline}
        </motion.h2>
      )}
      <div className="trailer-keywords trailer-keywords--panel">
        {research.keywords.map((kw, i) => (
          <motion.span
            key={kw}
            className="trailer-keyword"
            initial={{ opacity: 0, scale: 1.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            {kw}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
