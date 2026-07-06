import type { FundId } from '@/types/funds'

export const PREVIEW_NAV_IDS = [
  'portfolio',
  'research',
  'investment',
  'risk',
  'engagement',
  'foundation',
  'admin',
  'personalization',
] as const

export type PreviewNavId = (typeof PREVIEW_NAV_IDS)[number]

export const SCENE_NAV_IDS = [
  'portfolio',
  'research',
  'investment',
  'risk',
  'engagement',
] as const

export type SceneNavId = (typeof SCENE_NAV_IDS)[number]

export type FlyoutTone = 'cyan' | 'violet' | 'amber' | 'rose' | 'emerald' | 'gold'

export interface Flyout {
  id: number
  text: string
  tone: FlyoutTone
  x: number
  y: number
}

export function isSceneNav(nav: PreviewNavId): nav is SceneNavId {
  return (SCENE_NAV_IDS as readonly string[]).includes(nav)
}

export interface PortfolioSceneState {
  beat: number
  heroValue: string
  orbitOn: boolean
}

export interface ResearchSceneState {
  beat: number
  keywords: string[]
  headline: string
}

export interface InvestmentSceneState {
  beat: number
  side: 'buy' | 'sell'
  instrument: string
  flash: 'idle' | 'lock' | 'fire' | 'hit'
}

export interface RiskSceneState {
  beat: number
  alertStack: number
  alarm: boolean
}

export interface ChatMessage {
  id: number
  from: 'client' | 'rm' | 'system'
  name: string
  text: string
  time: string
}

export interface SimNotification {
  id: number
  title: string
  body: string
  tone: FlyoutTone
}

export interface EngagementSceneState {
  beat: number
  bubbles: string[]
  focusClient: string | null
  chatMessages: ChatMessage[]
  typing: boolean
}

export interface PreviewState {
  activeNav: PreviewNavId
  fundId: FundId
  loopProgress: number
  isPaused: boolean
  flashTitle: string | null
  shake: boolean
  flyouts: Flyout[]
  flyoutSeq: number
  notifications: SimNotification[]
  notifSeq: number
  portfolio: PortfolioSceneState
  research: ResearchSceneState
  investment: InvestmentSceneState
  risk: RiskSceneState
  engagement: EngagementSceneState
}

export type PreviewAction =
  | { type: 'PATCH'; patch: Partial<PreviewState> }
  | { type: 'PATCH_PORTFOLIO'; patch: Partial<PortfolioSceneState> }
  | { type: 'PATCH_RESEARCH'; patch: Partial<ResearchSceneState> }
  | { type: 'PATCH_INVESTMENT'; patch: Partial<InvestmentSceneState> }
  | { type: 'PATCH_RISK'; patch: Partial<RiskSceneState> }
  | { type: 'PATCH_ENGAGEMENT'; patch: Partial<EngagementSceneState> }
  | { type: 'SPAWN_FLYOUT'; text: string; tone: FlyoutTone }
  | { type: 'SPAWN_NOTIFICATION'; title: string; body: string; tone: FlyoutTone }
  | { type: 'RESET'; initial: PreviewState }

export type TimelineEvent = {
  at: number
  action: PreviewAction
}
