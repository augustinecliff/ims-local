import { createPlaceholderRoute } from '@/core/routing/create-placeholder-route'

export const riskRoutes = [
  createPlaceholderRoute('/risk/$fundId', 'risk.dashboard'),
  createPlaceholderRoute('/risk/$fundId/stress-tests', 'risk.stress-tests'),
  createPlaceholderRoute('/risk/$fundId/correlation', 'risk.correlation'),
]
