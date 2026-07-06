import { useAuthStore } from '@/core/stores'
import type { AuthUser, ImsRole } from '@/types'

export function usePermissions() {
  const user = useAuthStore((state) => state.user)

  const hasRole = (role: ImsRole) => user?.roles.includes(role) ?? false

  const hasFundAccess = (fundId: AuthUser['permittedFundIds'][number]) =>
    user?.permittedFundIds.includes(fundId) ?? false

  return {
    user,
    hasRole,
    hasFundAccess,
    isAuthenticated: user !== null,
  }
}
