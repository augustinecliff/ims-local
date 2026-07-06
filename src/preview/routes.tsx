import { createRoute } from '@tanstack/react-router'

import { rootRoute } from '@/core/routing/root-route'

import { PreviewPage } from './pages/PreviewPage'

export const previewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/preview',
  component: PreviewPage,
})
