// project
import { Tenant } from '~/typings/tenant'

const getInitialState = (): Tenant => ({
  // 租户信息
  code: 'BOOMETA',
  name: '',
  isAuthorizate: false
})

export default getInitialState
