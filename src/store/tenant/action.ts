// project
import { getTenant } from '~/apis/tenant'
import { ActionType } from '../reducer'
import type { Tenant } from '~/typings/tenant'

export interface Action {
  type: ActionType
  data?: Tenant | null
}

export const setTenant = async (code: string): Promise<Action> => {
  const result = await getTenant(code)

  return {
    type: ActionType.SetTenant,
    data: result.data?.tenant
  }
}
