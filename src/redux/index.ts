// redux
import { createStore } from 'redux'
// project
import reducer from './reducer'
import { TenantState } from './tenant/store'
import { MenuTreeNode } from '../typings/menu'
import { UserProfile } from './userProfile/store'

/**
 * 项目下的redux树
 */
export interface State {
  tenant: TenantState
  menus: MenuTreeNode[]
  userProfile: UserProfile
}

const store = createStore(reducer)

export default store
