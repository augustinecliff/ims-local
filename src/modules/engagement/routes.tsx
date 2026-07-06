import { createPlaceholderRoute } from '@/core/routing/create-placeholder-route'

export const engagementRoutes = [
  createPlaceholderRoute('/engagement/alerts', 'engagement.alerts'),
  createPlaceholderRoute('/engagement/watchlist', 'engagement.watchlist'),
  createPlaceholderRoute(
    '/engagement/company/$instrumentId',
    'engagement.company',
  ),
  createPlaceholderRoute(
    '/engagement/reports/builder',
    'engagement.report-builder',
  ),
  createPlaceholderRoute('/engagement/news', 'engagement.news'),
  createPlaceholderRoute('/engagement/calendar', 'engagement.calendar'),
]
