import { Tenant } from '../../../typings/tenant'

export const getInitialSingleton = (): Tenant => ({
  _id: '',
  code: '',
  description: '',
  publicKey: ''
})
