// project
import type { Tenant } from '~/typings/tenant'

export { default } from './Tenant'

export const getInitialTenant = (): Tenant => ({
  code: '',
  name: ''
})

export interface FormValues {
  code: string
  name: string
}
