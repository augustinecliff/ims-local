import { z } from 'zod'

export const alertSeveritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])

export const alertStatusSchema = z.enum([
  'ACTIVE',
  'PENDING_REVIEW',
  'RESOLVED',
])

export const alertSchema = z.object({
  id: z.string(),
  instrumentId: z.string(),
  fundId: z.string().optional(),
  severity: alertSeveritySchema,
  status: alertStatusSchema,
  threshold: z.string(),
  triggeredAt: z.iso.datetime().optional(),
  resolvedAt: z.iso.datetime().optional(),
  resolutionNote: z.string().optional(),
})

export const alertListSchema = z.array(alertSchema)

export type AlertDto = z.infer<typeof alertSchema>
