import { Tenant } from '../../../typings/tenant'

export const getInitialTenant = (): Tenant => ({
  _id: '',
  code: '',
  name: '',
  isAuthorizate: false,
  publicKey: ''
})

export interface FormValues {
  code: string
  name: string
  isAuthorizate: boolean
}
