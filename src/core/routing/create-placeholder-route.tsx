import { createRoute } from '@tanstack/react-router'
import type { z } from 'zod'

import { rootRoute } from './root-route'
import { RoutePlaceholder } from './RoutePlaceholder'

export function createPlaceholderRoute(
  path: string,
  routeId: string,
  validateSearch?: z.ZodType,
) {
  return createRoute({
    getParentRoute: () => rootRoute,
    path,
    ...(validateSearch
      ? { validateSearch: (search) => validateSearch.parse(search) }
      : {}),
    component: () => <RoutePlaceholder routeId={routeId} />,
  })
}
