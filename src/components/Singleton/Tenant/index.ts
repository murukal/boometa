// project
import type { Tenant } from '~/typings/tenant'

export { default } from './Tenant'

export const getInitialTenant = (): Tenant => ({
  id: 0,
  code: '',
  name: '',
  isAuthorizate: false
})

export interface FormValues {
  code: string
  name: string
  isAuthorizate: boolean
}
