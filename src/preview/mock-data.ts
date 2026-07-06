import type { FundId } from '@/types/funds'

export interface HoldingRow {
  instrument: string
  sector: string
  weight: number
  value: number
  change: number
}

export interface KpiCard {
  label: string
  value: number
  suffix: string
  change: number
}

export interface ResearchReport {
  id: string
  title: string
  author: string
  date: string
  paragraphs: string[]
}

export interface RiskAlert {
  id: string
  severity: 'high' | 'medium' | 'low'
  title: string
  fund: string
}

export interface ClientCard {
  id: string
  name: string
  aum: string
  lastContact: string
  status: 'active' | 'pending' | 'review'
}

export const PREVIEW_HOLDINGS: HoldingRow[] = [
  {
    instrument: 'Safaricom PLC',
    sector: 'Telecom',
    weight: 8.4,
    value: 1240000,
    change: 2.1,
  },
  {
    instrument: 'Equity Bank',
    sector: 'Financials',
    weight: 6.2,
    value: 918000,
    change: -0.8,
  },
  {
    instrument: 'EABL',
    sector: 'Consumer',
    weight: 5.1,
    value: 756000,
    change: 1.4,
  },
  {
    instrument: 'KCB Group',
    sector: 'Financials',
    weight: 4.8,
    value: 712000,
    change: 0.3,
  },
  {
    instrument: 'BAT Kenya',
    sector: 'Consumer',
    weight: 3.9,
    value: 578000,
    change: -1.2,
  },
  {
    instrument: 'Co-operative Bank',
    sector: 'Financials',
    weight: 3.5,
    value: 519000,
    change: 0.9,
  },
  {
    instrument: 'NCBA Group',
    sector: 'Financials',
    weight: 3.1,
    value: 461000,
    change: 1.1,
  },
  {
    instrument: 'Bamburi Cement',
    sector: 'Industrials',
    weight: 2.8,
    value: 415000,
    change: -0.4,
  },
]

export const PREVIEW_KPIS: KpiCard[] = [
  { label: 'NAV', value: 4.82, suffix: 'B KES', change: 1.8 },
  { label: 'YTD Return', value: 12.4, suffix: '%', change: 0.6 },
  { label: 'Sharpe Ratio', value: 1.42, suffix: '', change: 0.08 },
  { label: 'Cash', value: 8.2, suffix: '%', change: -0.3 },
]

export const PREVIEW_REPORTS: ResearchReport[] = [
  {
    id: 'rpt-001',
    title: 'East Africa Telecom Outlook Q3',
    author: 'A. Mwangi',
    date: '2026-06-28',
    paragraphs: [
      'Mobile money penetration continues to drive revenue resilience across Kenyan telcos, with Safaricom maintaining dominant market share in data and M-Pesa.',
      'Regulatory headwinds on mobile lending may compress near-term margins, but diversified fintech partnerships offset pressure on core voice revenues.',
      'We maintain an overweight stance on sector leaders with strong free cash flow and progressive dividend policies.',
    ],
  },
  {
    id: 'rpt-002',
    title: 'Banking Sector Credit Quality Review',
    author: 'J. Otieno',
    date: '2026-06-25',
    paragraphs: [
      'NPL ratios have stabilised below 14% system-wide, with tier-1 banks showing improved provisioning coverage.',
    ],
  },
]

export const PREVIEW_ALERTS: RiskAlert[] = [
  {
    id: 'alt-1',
    severity: 'high',
    title: 'Single-name concentration breach',
    fund: 'Thamani Equity',
  },
  {
    id: 'alt-2',
    severity: 'medium',
    title: 'FX exposure above limit',
    fund: 'Global Equity',
  },
  {
    id: 'alt-3',
    severity: 'low',
    title: 'Liquidity buffer approaching floor',
    fund: 'MMF',
  },
  {
    id: 'alt-4',
    severity: 'medium',
    title: 'Sector tilt vs benchmark',
    fund: 'Africa Equity',
  },
]

export const PREVIEW_CLIENTS: ClientCard[] = [
  {
    id: 'cli-1',
    name: 'Acacia Pension Fund',
    aum: 'KES 2.1B',
    lastContact: '2 days ago',
    status: 'active',
  },
  {
    id: 'cli-2',
    name: 'Savannah Family Office',
    aum: 'USD 48M',
    lastContact: '1 week ago',
    status: 'review',
  },
  {
    id: 'cli-3',
    name: 'Horizon Endowment',
    aum: 'KES 890M',
    lastContact: 'Today',
    status: 'pending',
  },
]

export const FUND_KPIS: Record<FundId, KpiCard[]> = {
  almasi: PREVIEW_KPIS,
  mmf: [
    { label: 'NAV', value: 1.24, suffix: 'B KES', change: 0.4 },
    { label: '7-Day Yield', value: 9.8, suffix: '%', change: 0.1 },
    { label: 'WAM', value: 42, suffix: ' days', change: -2 },
    { label: 'Cash', value: 12.1, suffix: '%', change: 0.2 },
  ],
  'thamani-equity': PREVIEW_KPIS,
  'africa-equity': PREVIEW_KPIS,
  'global-equity': [
    { label: 'NAV', value: 86.2, suffix: 'M USD', change: 2.3 },
    { label: 'YTD Return', value: 15.1, suffix: '%', change: 1.2 },
    { label: 'Sharpe Ratio', value: 1.58, suffix: '', change: 0.12 },
    { label: 'Cash', value: 4.5, suffix: '%', change: -0.8 },
  ],
  'global-sharia': PREVIEW_KPIS,
  'mubruk-sharia': PREVIEW_KPIS,
}
