import { createPlaceholderRoute } from '@/core/routing/create-placeholder-route'

export const investmentRoutes = [
  createPlaceholderRoute('/investment/trades/new', 'investment.trade-new'),
  createPlaceholderRoute('/investment/trades/$tradeId', 'investment.trade-detail'),
  createPlaceholderRoute(
    '/investment/trades/$tradeId/approve',
    'investment.trade-approve',
  ),
  createPlaceholderRoute('/investment/history', 'investment.history'),
]
