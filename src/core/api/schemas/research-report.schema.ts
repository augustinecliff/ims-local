import { z } from 'zod'

export const reportStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])

export const researchReportSchema = z.object({
  id: z.string(),
  title: z.string(),
  authorId: z.string(),
  status: reportStatusSchema,
  publishedAt: z.iso.datetime().optional(),
  updatedAt: z.iso.datetime(),
})

export const researchReportListSchema = z.array(researchReportSchema)

export type ResearchReportDto = z.infer<typeof researchReportSchema>
