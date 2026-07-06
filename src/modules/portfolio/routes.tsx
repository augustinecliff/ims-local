import { createPlaceholderRoute } from '@/core/routing/create-placeholder-route'
import { portfolioSearchSchema } from '@/core/routing/search-schemas'

export const portfolioRoutes = [
  createPlaceholderRoute(
    '/portfolio/mmf',
    'portfolio.mmf',
    portfolioSearchSchema,
  ),
  createPlaceholderRoute(
    '/portfolio/equities',
    'portfolio.equities',
    portfolioSearchSchema,
  ),
  createPlaceholderRoute(
    '/portfolio/almasi',
    'portfolio.almasi',
    portfolioSearchSchema,
  ),
]
