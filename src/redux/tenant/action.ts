// project
import type { Tenant } from '../../typings/tenant'

export type ActionType = 'SET_TENANT'

export interface Action {
  type: ActionType
  data?: Tenant | null
}

export const setTenant = (data: Tenant): Action => ({
  type: 'SET_TENANT',
  data
})
