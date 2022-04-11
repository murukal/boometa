// project
import { ActionCode, ResourceCode } from '..'
import type { Resource } from '~/typings/auth'

export { default } from './Authorization'

export interface Authorized {
  resourceCode: ResourceCode
  actionCodes: ActionCode[]
}

export interface ExtraProps {
  tenantCode?: string
  resources?: Resource[]
}
