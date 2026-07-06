import { FUND_IDS } from '@/types'
import type { AuthUser } from '@/types'

export const mockAuthUser: AuthUser = {
  id: 'mock-user-1',
  email: 'pm@arvocap.local',
  displayName: 'Mock Portfolio Manager',
  roles: ['PORTFOLIO_MANAGER', 'ANALYST'],
  permittedFundIds: [...FUND_IDS],
}
