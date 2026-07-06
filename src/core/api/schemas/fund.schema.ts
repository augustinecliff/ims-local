import { z } from 'zod'

import { FUND_IDS } from '@/types'

export const fundSchema = z.object({
  id: z.enum(FUND_IDS),
  name: z.string(),
  currency: z.enum(['KES', 'ZAR', 'USD']),
  nav: z.string().optional(),
  navDate: z.iso.date().optional(),
})

export const fundListSchema = z.array(fundSchema)

export type FundDto = z.infer<typeof fundSchema>
