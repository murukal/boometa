// redux
import { combineReducers } from 'redux'
// project
import tenant from './tenant/reducer'
import menus from './menus/reducer'
import userProfile from './userProfile/reducer'
import encryptor from './encryptor/reducer'
import app from './app/reducer'

export enum ActionType {
  // app
  Initialized = 'initialized',
  // tenant
  SetTenant = 'set-tenant',
  // menu
  SetMenus = 'set-menus',
  ResetMenus = 'reset-menus',
  // user
  Authenticate = 'authenticate',
  Logout = 'logout',
  SetToken = 'set-token',
  // encryptor
  SetRsaPublicKey = 'set-rsa-public-key'
}

const reducer = combineReducers({
  app,
  tenant,
  menus,
  userProfile,
  encryptor
})

export default reducer
