import { Outlet } from '@tanstack/react-router'

import { ProtectedRoute } from './ProtectedRoute'

export function RootLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  )
}
