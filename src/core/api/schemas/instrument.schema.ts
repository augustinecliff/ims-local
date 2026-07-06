import { z } from 'zod'

export const assetTypeSchema = z.enum(['EQUITY', 'BOND', 'MMF', 'OTHER'])

export const instrumentSchema = z.object({
  id: z.string(),
  code: z.string(),
  isin: z.string().optional(),
  name: z.string(),
  exchange: z.string(),
  sector: z.string().optional(),
  industry: z.string().optional(),
  assetType: assetTypeSchema,
})

export const instrumentListSchema = z.array(instrumentSchema)

export type InstrumentDto = z.infer<typeof instrumentSchema>
