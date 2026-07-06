import type { CSSProperties } from 'react'
import { LayoutGroup, motion } from 'framer-motion'

import { layoutSpring } from '../animations/variants'
import { usePreview } from '../context/usePreview'
import { PREVIEW_NAV_IDS, isSceneNav, type PreviewNavId } from '../types'

const NAV_LABELS: Record<PreviewNavId, string> = {
  portfolio: 'Portfolio',
  research: 'Research',
  investment: 'Investment',
  risk: 'Risk',
  engagement: 'Engagement',
  foundation: 'Foundation',
  admin: 'Admin',
  personalization: 'Personalization',
}

const NAV_ICONS: Record<PreviewNavId, string> = {
  portfolio: '◈',
  research: '◇',
  investment: '▣',
  risk: '△',
  engagement: '◎',
  foundation: '○',
  admin: '○',
  personalization: '○',
}

const NAV_ACCENT: Record<PreviewNavId, string> = {
  portfolio: 'var(--pv-cyan)',
  research: 'var(--pv-violet)',
  investment: 'var(--pv-amber)',
  risk: 'var(--pv-rose)',
  engagement: 'var(--pv-emerald)',
  foundation: 'var(--pv-muted)',
  admin: 'var(--pv-muted)',
  personalization: 'var(--pv-muted)',
}

export function PreviewSidebar() {
  const { state } = usePreview()
  const { activeNav } = state

  return (
    <aside className="preview-sidebar">
      <div className="preview-sidebar__brand">
        <motion.div
          className="preview-sidebar__logo"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          Arvocap IMS
        </motion.div>
        <div className="preview-sidebar__tagline">Investment Management</div>
      </div>
      <LayoutGroup id="preview-nav">
        <nav className="preview-sidebar__nav" aria-label="Module navigation">
          {PREVIEW_NAV_IDS.map((id) => {
            const isActive = activeNav === id
            const isSoon = !isSceneNav(id)
            return (
              <motion.div
                key={id}
                className={[
                  'preview-nav-item',
                  isActive ? 'preview-nav-item--active' : '',
                  isSoon ? 'preview-nav-item--soon' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={isActive ? ({ '--nav-accent': NAV_ACCENT[id] } as CSSProperties) : undefined}
                aria-current={isActive ? 'page' : undefined}
                layout
                transition={layoutSpring}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-glow"
                    className="preview-nav-item__glow"
                    transition={layoutSpring}
                  />
                )}
                <span className="preview-nav-item__icon">{NAV_ICONS[id]}</span>
                {NAV_LABELS[id]}
              </motion.div>
            )
          })}
        </nav>
      </LayoutGroup>
      <div className="preview-sidebar__footer">
        <span className="preview-live-dot" /> Trailer preview
      </div>
    </aside>
  )
}
