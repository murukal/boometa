// redux
import { createStore } from 'redux'
// project
import reducer from './reducer'
import type { MenuTreeNode } from '../typings/menu'
import type { UserProfile } from './userProfile/store'
import type { Tenant } from '../typings/tenant'
import JSEncrypt from 'jsencrypt'

/**
 * 项目下的redux树
 */
export interface State {
  // 租户信息
  tenant: Tenant
  // 菜单数据
  menus: MenuTreeNode[]
  // 用户信息
  userProfile: UserProfile
  // 加密器
  encryptor: JSEncrypt
}

const store = createStore(reducer)

export default store
