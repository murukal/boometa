import { ActionCode, ResourceCode } from '..'

export { default as Tenant } from './Tenant'

export interface Authorized {
  resourceCode: ResourceCode
  actionCodes: ActionCode[]
}
