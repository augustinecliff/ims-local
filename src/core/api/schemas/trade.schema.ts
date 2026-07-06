import { z } from 'zod'

import { FUND_IDS } from '@/types'

export const tradeDirectionSchema = z.enum(['BUY', 'SELL'])

export const tradeStatusSchema = z.enum([
  'DRAFT',
  'PENDING_APPROVAL',
  'APPROVED',
  'REJECTED',
  'EXECUTED',
])

export const tradeSchema = z.object({
  id: z.string(),
  fundId: z.enum(FUND_IDS),
  instrumentId: z.string(),
  direction: tradeDirectionSchema,
  quantity: z.string(),
  price: z.string(),
  status: tradeStatusSchema,
  rationale: z.string().optional(),
  createdAt: z.iso.datetime(),
})

export const tradeListSchema = z.array(tradeSchema)

export type TradeDto = z.infer<typeof tradeSchema>
