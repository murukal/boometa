// project
import type { Tenant } from '~/typings/boomemory/tenant'

export { default } from './Tenant'

export const getInitialTenant = (): Tenant => ({
  code: '',
  name: ''
})

export interface FormValues {
  code: string
  name: string
}
