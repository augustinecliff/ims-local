import { adminRoutes } from '@/modules/admin'
import { engagementRoutes } from '@/modules/engagement'
import { foundationRoutes } from '@/modules/foundation'
import { investmentRoutes } from '@/modules/investment'
import { personalizationRoutes } from '@/modules/personalization'
import { portfolioRoutes } from '@/modules/portfolio'
import { researchRoutes } from '@/modules/research'
import { riskRoutes } from '@/modules/risk'

import { previewRoute } from '@/preview'

import { indexRoute } from './routes/index-route'
import { loginRoute } from './routes/login-route'

export const moduleRoutes = [
  indexRoute,
  loginRoute,
  previewRoute,
  ...foundationRoutes,
  ...researchRoutes,
  ...investmentRoutes,
  ...portfolioRoutes,
  ...riskRoutes,
  ...engagementRoutes,
  ...adminRoutes,
  ...personalizationRoutes,
]
