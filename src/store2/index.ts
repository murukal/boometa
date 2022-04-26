import { createStore } from '~/relax'

import { App } from './App'
import { Tenant } from './Tenant'

export interface State {
  // 应用信息
  App: App
  // 租户信息
  Tenant: Tenant
}

const store = createStore(App, Tenant)

export default store
