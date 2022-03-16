import { Tenant } from '../../../typings/tenant'

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
