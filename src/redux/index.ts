import { createStore } from 'redux'
import reducer from './reducer'
import { TenantState } from './tenant/store'
import { MenuTreeNodes } from '../typings/menu'
import { UserProfile } from './userProfile/store'

/**
 * 项目下的redux树
 */
export interface State {
  tenant: TenantState
  menus: MenuTreeNodes
  userProfile: UserProfile
}

const store = createStore(reducer)

export default store
