import { createPlaceholderRoute } from '@/core/routing/create-placeholder-route'

export const adminRoutes = [
  createPlaceholderRoute(
    '/admin/instruments/onboard',
    'admin.instrument-onboard',
  ),
  createPlaceholderRoute('/admin/approval-chains', 'admin.approval-chains'),
  createPlaceholderRoute('/admin/users', 'admin.users'),
]
