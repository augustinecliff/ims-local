import { useEffect } from 'react'

import { env } from '@/core/lib'
import { useAuthStore } from '@/core/stores'

import { mockAuthUser } from './mock-user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser)
  const setLoading = useAuthStore((state) => state.setLoading)

  useEffect(() => {
    if (env.mockAuth) {
      setUser(mockAuthUser)
      return
    }

    // Keycloak integration lands in Phase 1
    setLoading(false)
  }, [setLoading, setUser])

  return children
}
