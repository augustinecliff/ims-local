import { createRouter } from '@tanstack/react-router'

import { moduleRoutes } from './module-routes'
import { rootRoute } from './root-route'

const routeTree = rootRoute.addChildren(moduleRoutes)

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
