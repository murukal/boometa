import { Tenant } from '../../../typings/tenant'

export interface Props {
  singleton: Tenant
  onSubmitted?: Function
}

export const getInitialSingleton = (): Tenant => ({
  _id: '',
  code: '',
  description: '',
  publicKey: ''
})
