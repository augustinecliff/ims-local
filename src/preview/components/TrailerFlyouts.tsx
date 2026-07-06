import { motion } from 'framer-motion'

import { usePreview } from '../context/usePreview'

export function TrailerFlyouts() {
  const { state } = usePreview()

  return (
    <div className="trailer-flyouts" aria-hidden>
      {state.flyouts.map((f) => (
        <motion.div
          key={f.id}
          className={`trailer-flyout trailer-flyout--${f.tone}`}
          style={{ left: `${f.x}%`, top: `${f.y}%` }}
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.18 }}
        >
          {f.text}
        </motion.div>
      ))}
    </div>
  )
}
