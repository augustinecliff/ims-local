import type { FundId } from '@/types'

export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  instruments: {
    all: ['instruments'] as const,
    list: (filters?: Record<string, unknown>) =>
      ['instruments', 'list', filters] as const,
    detail: (instrumentId: string) =>
      ['instruments', 'detail', instrumentId] as const,
  },
  funds: {
    all: ['funds'] as const,
    definitions: ['funds', 'definitions'] as const,
    nav: (fundId: FundId, date?: string) =>
      ['funds', 'nav', fundId, date] as const,
  },
  trades: {
    all: ['trades'] as const,
    pendingApproval: (fundId?: FundId) =>
      ['trades', 'pending-approval', fundId] as const,
    detail: (tradeId: string) => ['trades', 'detail', tradeId] as const,
  },
  research: {
    reports: (filters?: Record<string, unknown>) =>
      ['research', 'reports', filters] as const,
    report: (reportId: string) => ['research', 'reports', reportId] as const,
  },
  risk: {
    snapshot: (fundId: FundId, date?: string) =>
      ['risk', 'snapshot', fundId, date] as const,
  },
  alerts: {
    all: ['alerts'] as const,
    board: ['alerts', 'board'] as const,
  },
} as const
