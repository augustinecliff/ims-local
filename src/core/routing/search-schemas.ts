import { z } from 'zod'

import { FUND_IDS } from '@/types'

export const fundSearchSchema = z.object({
  fund: z.enum(FUND_IDS).optional(),
})

export const portfolioSearchSchema = z.object({
  fund: z.enum(FUND_IDS).optional(),
  date: z.iso.date().optional(),
  currency: z.enum(['KES', 'ZAR', 'USD']).optional(),
})

export const emptySearchSchema = z.object({})

export type FundSearch = z.infer<typeof fundSearchSchema>
export type PortfolioSearch = z.infer<typeof portfolioSearchSchema>
