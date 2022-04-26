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

const store = createStore(reducer)

export default store
