import { QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider } from '@/core/auth'
import { queryClient } from '@/core/api'
import { ErrorBoundary } from '@/core/errors'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </AuthProvider>
    </QueryClientProvider>
  )
}
