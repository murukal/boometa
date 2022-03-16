// project
import { Tenant } from '../../typings/tenant'

// store 在原先的数据结构基础上 补充

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
