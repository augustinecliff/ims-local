import type { FundId } from './funds'

export type ImsRole =
  | 'PORTFOLIO_MANAGER'
  | 'ANALYST'
  | 'ADMIN'
  | 'RISK_OFFICER'
  | 'VIEWER'

export interface AuthUser {
  id: string
  email: string
  displayName: string
  roles: ImsRole[]
  permittedFundIds: FundId[]
}
