import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'

import {
  sceneTransition,
  sceneTransitionReduced,
  titleSwap,
} from '../animations/variants'
import { usePreview } from '../context/usePreview'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { isSceneNav } from '../types'
import { ComingSoonBadge } from './ComingSoonBadge'
import { SceneGraphWall } from './SceneGraphWall'
import { EngagementScene } from '../scenes/EngagementScene'
import { InvestmentScene } from '../scenes/InvestmentScene'
import { PortfolioScene } from '../scenes/PortfolioScene'
import { ResearchScene } from '../scenes/ResearchScene'
import { RiskScene } from '../scenes/RiskScene'

function SceneContent({ nav }: { nav: string }) {
  switch (nav) {
    case 'portfolio':
      return <PortfolioScene />
    case 'research':
      return <ResearchScene />
    case 'investment':
      return <InvestmentScene />
    case 'risk':
      return <RiskScene />
    case 'engagement':
      return <EngagementScene />
    default:
      return <ComingSoonBadge module={nav} />
  }
}

export function PreviewSceneHost() {
  const { state } = usePreview()
  const { activeNav } = state
  const reducedMotion = useReducedMotion()
  const transition = reducedMotion ? sceneTransitionReduced : sceneTransition

  return (
    <LayoutGroup>
      <div className="preview-scene-host" data-active-nav={activeNav}>
        <SceneGraphWall />
        <div className="preview-scene-host__panel-slot">
          <AnimatePresence mode="sync">
            <motion.div
              key={activeNav}
              className="preview-scene preview-scene--panel"
              initial={transition.initial}
              animate={transition.animate}
              exit={transition.exit}
              transition={transition.transition}
            >
              <SceneContent nav={activeNav} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </LayoutGroup>
  )
}

export function PreviewTopbarTitle() {
  const { state } = usePreview()
  const isLive = isSceneNav(state.activeNav)

  const titles: Record<string, string> = {
    portfolio: 'Portfolio',
    research: 'Research',
    investment: 'Investment',
    risk: 'Risk',
    engagement: 'Engagement',
    foundation: 'Foundation',
    admin: 'Admin',
    personalization: 'Personalization',
  }

  const title = titles[state.activeNav] ?? 'Preview'

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state.activeNav}
        className="preview-topbar__title"
        initial={titleSwap.initial}
        animate={titleSwap.animate}
        exit={titleSwap.exit}
        transition={titleSwap.transition}
      >
        {title}
        {isLive && <span className="preview-topbar__live"> · live</span>}
      </motion.div>
    </AnimatePresence>
  )
}
