import { createStore } from '~/relax'

import { App } from './App'
import { Encryptor } from './Encryptor'
import { Menu } from './Menu'
import { Tenant } from './Tenant'
import { UserProfile } from './UserProfile'

export interface State {
  // 应用信息
  App: App
  // 租户信息
  Tenant: Tenant
  // 加密器
  Encryptor: Encryptor
  // 菜单
  Menu: Menu
  // 用户信息
  UserProfile: UserProfile
}

const store = createStore(App, Tenant, Encryptor, Menu, UserProfile)

export default store
