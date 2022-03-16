// redux
import { combineReducers } from 'redux'
// project
import tenant from './tenant/reducer'
import menus from './menus/reducer'
import userProfile from './userProfile/reducer'
import encryptor from './encryptor/reducer'

const reducer = combineReducers({
  tenant,
  menus,
  userProfile,
  encryptor
})

export default reducer
