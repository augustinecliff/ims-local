import { Navigate, useRouterState } from '@tanstack/react-router'

import { useAuthStore } from '@/core/stores'

const PUBLIC_PATHS = ['/login', '/preview', '/'] as const

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoading = useAuthStore((state) => state.isLoading)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  if (pathname === '/') {
    return <Navigate to="/preview" replace />
  }

  if (PUBLIC_PATHS.includes(pathname as (typeof PUBLIC_PATHS)[number])) {
    return children
  }

  if (isLoading) {
    return <div data-testid="auth-loading" hidden />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}
