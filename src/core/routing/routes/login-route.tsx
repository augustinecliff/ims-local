import { createRoute } from '@tanstack/react-router'

import { rootRoute } from '../root-route'
import { RoutePlaceholder } from '../RoutePlaceholder'

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => <RoutePlaceholder routeId="login" />,
})
