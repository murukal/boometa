// redux
import { createStore } from 'redux'
// project
import reducer from './reducer'
import JSEncrypt from 'jsencrypt'
import type { AppProfile } from './app/store'
import type { Menu } from '../typings/menu'
import type { UserProfile } from './userProfile/store'
import type { Tenant } from '../typings/tenant'

/**
 * 项目下的redux树
 */
export interface State {
  // 应用信息
  app: AppProfile
  // 租户信息
  tenant: Tenant
  // 菜单数据
  menus: Menu[]
  // 用户信息
  userProfile: UserProfile
  // 加密器
  encryptor: JSEncrypt
}

const store = createStore(reducer)

export default store
