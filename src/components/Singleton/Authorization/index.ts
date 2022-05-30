// project
import { ActionCode, ResourceCode } from '~/pages/boomemory/Authorizations'
import type { Resource } from '~/typings/boomemory/auth'

export { default } from './Authorization'

export interface Authorized {
  resourceCode: ResourceCode
  actionCodes: ActionCode[]
}

export interface ExtraProps {
  tenantCode?: string
  resources?: Resource[]
}
