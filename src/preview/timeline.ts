import type { ChatMessage, PreviewAction, PreviewState, TimelineEvent } from './types'

/** Game-trailer montage — ~60s loop (base timeline × pace). Pace 6 = 4× slower than prior 1.5. */
export const TIMELINE_PACE = 6
export const LOOP_DURATION_MS = 10_000 * TIMELINE_PACE
export const PROGRESS_TICK_MS = 50
export const MAX_FLYOUTS = 14
export const MAX_NOTIFICATIONS = 5

export function createInitialPreviewState(): PreviewState {
  return {
    activeNav: 'portfolio',
    fundId: 'mmf',
    loopProgress: 0,
    isPaused: false,
    flashTitle: null,
    shake: false,
    flyouts: [],
    flyoutSeq: 0,
    notifications: [],
    notifSeq: 0,
    portfolio: { beat: 0, heroValue: '—', orbitOn: false },
    research: { beat: 0, keywords: [], headline: '' },
    investment: { beat: 0, side: 'buy', instrument: '', flash: 'idle' },
    risk: { beat: 0, alertStack: 0, alarm: false },
    engagement: { beat: 0, bubbles: [], focusClient: null, chatMessages: [], typing: false },
  }
}

function fund(fundId: PreviewState['fundId']): PreviewAction {
  return { type: 'PATCH', patch: { fundId } }
}

function chat(
  id: number,
  from: 'client' | 'rm' | 'system',
  name: string,
  text: string,
  time: string,
): ChatMessage {
  return { id, from, name, text, time }
}

function scene(at: number, navId: PreviewState['activeNav']): TimelineEvent {
  return { at, action: { type: 'PATCH', patch: { activeNav: navId } } }
}

export const PREVIEW_TIMELINE: TimelineEvent[] = [
  // Portfolio
  scene(0, 'portfolio'),
  { at: 120, action: fund('mmf') },
  { at: 280, action: { type: 'PATCH_PORTFOLIO', patch: { beat: 1, heroValue: '1.24B', orbitOn: true } } },
  { at: 550, action: fund('almasi') },
  { at: 680, action: { type: 'PATCH_PORTFOLIO', patch: { beat: 2, heroValue: '4.82B' } } },
  { at: 900, action: { type: 'PATCH_PORTFOLIO', patch: { beat: 3 } } },

  // Research
  scene(1_200, 'research'),
  { at: 1_350, action: { type: 'PATCH_RESEARCH', patch: { beat: 1, headline: 'East Africa Telecom Q3', keywords: ['OVERWEIGHT'] } } },
  { at: 1_600, action: { type: 'PATCH_RESEARCH', patch: { beat: 2, keywords: ['OVERWEIGHT', 'TELCO', 'FCF'] } } },
  { at: 1_900, action: { type: 'PATCH_RESEARCH', patch: { beat: 3, keywords: ['OVERWEIGHT', 'TELCO', 'FCF', 'DIVIDEND'] } } },

  // Investment
  scene(2_200, 'investment'),
  { at: 2_350, action: { type: 'PATCH_INVESTMENT', patch: { beat: 1, instrument: 'Safaricom PLC', side: 'buy', flash: 'lock' } } },
  { at: 2_600, action: { type: 'PATCH_INVESTMENT', patch: { beat: 2, flash: 'fire' } } },
  { at: 2_850, action: { type: 'PATCH_INVESTMENT', patch: { beat: 3, flash: 'hit' } } },
  { at: 3_100, action: { type: 'PATCH_INVESTMENT', patch: { beat: 4, side: 'sell', flash: 'idle' } } },

  // Risk
  scene(3_400, 'risk'),
  { at: 3_550, action: { type: 'PATCH_RISK', patch: { beat: 1, alertStack: 1, alarm: true } } },
  { at: 3_700, action: { type: 'PATCH_RISK', patch: { alertStack: 2 } } },
  { at: 3_850, action: { type: 'PATCH_RISK', patch: { alertStack: 3 } } },
  { at: 4_000, action: { type: 'PATCH_RISK', patch: { beat: 2, alertStack: 4 } } },
  { at: 4_200, action: { type: 'PATCH_RISK', patch: { beat: 3, alarm: false } } },

  // Engagement
  scene(4_500, 'engagement'),
  {
    at: 4_650,
    action: {
      type: 'PATCH_ENGAGEMENT',
      patch: {
        beat: 1,
        focusClient: 'Acacia Pension',
        chatMessages: [chat(1, 'client', 'Acacia Pension', 'Please send our Q2 holdings statement.', '09:14')],
        typing: false,
      },
    },
  },
  {
    at: 4_900,
    action: {
      type: 'PATCH_ENGAGEMENT',
      patch: {
        beat: 2,
        typing: true,
        chatMessages: [chat(1, 'client', 'Acacia Pension', 'Please send our Q2 holdings statement.', '09:14')],
      },
    },
  },
  {
    at: 5_100,
    action: {
      type: 'PATCH_ENGAGEMENT',
      patch: {
        typing: false,
        chatMessages: [
          chat(1, 'client', 'Acacia Pension', 'Please send our Q2 holdings statement.', '09:14'),
          chat(2, 'rm', 'You', 'Absolutely — scheduling review for next week.', '09:15'),
        ],
      },
    },
  },
  {
    at: 5_350,
    action: {
      type: 'PATCH_ENGAGEMENT',
      patch: {
        beat: 3,
        focusClient: 'Horizon Endowment',
        chatMessages: [
          chat(1, 'client', 'Acacia Pension', 'Please send our Q2 holdings statement.', '09:14'),
          chat(2, 'rm', 'You', 'Absolutely — scheduling review for next week.', '09:15'),
          chat(3, 'client', 'Horizon Endowment', 'Interested in a new mandate discussion.', '09:18'),
        ],
      },
    },
  },
  {
    at: 5_600,
    action: {
      type: 'PATCH_ENGAGEMENT',
      patch: {
        typing: true,
      },
    },
  },
  {
    at: 5_800,
    action: {
      type: 'PATCH_ENGAGEMENT',
      patch: {
        typing: false,
        chatMessages: [
          chat(1, 'client', 'Acacia Pension', 'Please send our Q2 holdings statement.', '09:14'),
          chat(2, 'rm', 'You', 'Absolutely — scheduling review for next week.', '09:15'),
          chat(3, 'client', 'Horizon Endowment', 'Interested in a new mandate discussion.', '09:18'),
          chat(4, 'rm', 'You', 'Happy to set up a call — Thursday 10am?', '09:19'),
        ],
      },
    },
  },

  // Stinger
  scene(6_200, 'foundation'),
  scene(6_700, 'admin'),
  scene(7_200, 'personalization'),
]
