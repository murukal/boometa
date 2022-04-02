// project
import { Tenant } from '~/typings/tenant'

const getInitialState = (): Tenant => ({
  // 租户信息
  id: 0,
  code: 'BOOMETA',
  name: '',
  isAuthorizate: false,
  createdAt: '',
  updatedAt: ''
})

export default getInitialState
