import { getTenant as queryTenant } from '../../apis/tenant'
import type { Tenant } from '../../typings/tenant'

export type ActionType = 'GET_TENANT'

export interface Action {
  type: ActionType
  data?: Tenant | null
}

export const getTenant = async (code: string): Promise<Action> => {
  const res = await queryTenant(code)

  return {
    type: 'GET_TENANT',
    data: res.data
  }
}
