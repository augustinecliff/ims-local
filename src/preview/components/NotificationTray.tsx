import { AnimatePresence, motion } from 'framer-motion'

import { usePreview } from '../context/usePreview'

export function NotificationTray() {
  const { state } = usePreview()

  return (
    <div className="notif-tray" aria-live="polite">
      <AnimatePresence>
        {state.notifications.map((n, i) => (
          <motion.div
            key={n.id}
            className={`notif-tray__item notif-tray__item--${n.tone}`}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            style={{ zIndex: 10 + i }}
          >
            <div className="notif-tray__icon" />
            <div className="notif-tray__content">
              <div className="notif-tray__title">{n.title}</div>
              <div className="notif-tray__body">{n.body}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
