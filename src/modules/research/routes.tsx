import { createPlaceholderRoute } from '@/core/routing/create-placeholder-route'

export const researchRoutes = [
  createPlaceholderRoute('/research/reports', 'research.reports'),
  createPlaceholderRoute('/research/reports/$reportId', 'research.report-detail'),
  createPlaceholderRoute(
    '/research/reports/$reportId/edit',
    'research.report-edit',
  ),
  createPlaceholderRoute('/research/screener', 'research.screener'),
  createPlaceholderRoute('/research/coverage', 'research.coverage'),
]
