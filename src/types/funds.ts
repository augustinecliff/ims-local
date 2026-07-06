export const FUND_IDS = [
  'almasi',
  'mmf',
  'thamani-equity',
  'africa-equity',
  'global-equity',
  'global-sharia',
  'mubruk-sharia',
] as const

export type FundId = (typeof FUND_IDS)[number]

export interface FundDefinition {
  id: FundId
  name: string
  currency: 'KES' | 'ZAR' | 'USD'
}

export const FUNDS: Record<FundId, FundDefinition> = {
  almasi: { id: 'almasi', name: 'Almasi', currency: 'KES' },
  mmf: { id: 'mmf', name: 'Money Market Fund', currency: 'KES' },
  'thamani-equity': {
    id: 'thamani-equity',
    name: 'Thamani Equity',
    currency: 'KES',
  },
  'africa-equity': {
    id: 'africa-equity',
    name: 'Africa Equity',
    currency: 'KES',
  },
  'global-equity': {
    id: 'global-equity',
    name: 'Global Equity',
    currency: 'USD',
  },
  'global-sharia': {
    id: 'global-sharia',
    name: 'Global Sharia',
    currency: 'USD',
  },
  'mubruk-sharia': {
    id: 'mubruk-sharia',
    name: 'Mubruk Sharia',
    currency: 'KES',
  },
}
