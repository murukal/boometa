// project
import { getTenant } from '~/apis/tenant'
import type { Tenant } from '~/typings/tenant'

export type ActionType = 'SET_TENANT'

export interface Action {
  type: ActionType
  data?: Tenant | null
}

export const setTenant = async (tenantCode: string): Promise<Action> => {
  const result = await getTenant(tenantCode)

  return {
    type: 'SET_TENANT',
    data: result.data?.tenant
  }
}
