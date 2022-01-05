import { Tenant } from '../../typings/tenant'

export enum ActionType {
  SET_TENANT = 'SET_TENANT'
}

export interface Action {
  type: ActionType
  data: Tenant
}

export const setTenant = (tenant: Tenant): Action => ({
  type: ActionType.SET_TENANT,
  data: tenant
})
