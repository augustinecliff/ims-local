import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const INTRO_MS = 6_000

interface PreviewIntroProps {
  visible: boolean
  onComplete: () => void
}

export function PreviewIntro({ visible, onComplete }: PreviewIntroProps) {
  useEffect(() => {
    if (!visible) return
    const id = setTimeout(onComplete, INTRO_MS)
    return () => clearTimeout(id)
  }, [visible, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preview-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="preview-intro__vignette" />
          <div className="preview-intro__scanlines" />

          <motion.div
            className="preview-intro__card"
            initial={{ opacity: 0, scale: 0.82, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="preview-intro__eyebrow"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.22em' }}
              transition={{ delay: 0.15, duration: 0.45 }}
            >
              Arvocap
            </motion.span>

            <motion.h1
              className="preview-intro__title"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 280, damping: 22 }}
            >
              IMS
            </motion.h1>

            <motion.div
              className="preview-intro__badge"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.35 }}
            >
              <span className="preview-intro__badge-dot" />
              Coming Soon
            </motion.div>

            <motion.p
              className="preview-intro__subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.4 }}
            >
              Investment Management System · Phase 1
            </motion.p>
          </motion.div>

          <motion.div
            className="preview-intro__loader"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: INTRO_MS / 1000 - 0.35, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
