import { motion } from 'framer-motion'

import { popIn, fluidSpringSnappy } from '../animations/variants'

export function ComingSoonBadge({ module }: { module: string }) {
  return (
    <div className="preview-coming-soon">
      <motion.span
        className="preview-badge"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="preview-badge__dot" />
        Coming soon
      </motion.span>
      <motion.h2
        className="preview-coming-soon__title"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={fluidSpringSnappy}
      >
        {module}
      </motion.h2>
      <motion.p
        className="preview-coming-soon__subtitle"
        initial={popIn.initial}
        animate={popIn.animate}
        transition={{ ...popIn.transition, delay: 0.08 }}
      >
        Next on the Arvocap IMS roadmap — built for African capital markets.
      </motion.p>
    </div>
  )
}
