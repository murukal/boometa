// redux
import { combineReducers } from 'redux'
// project
import tenant from './tenant/reducer'
import menus from './menus/reducer'
import userProfile from './userProfile/reducer'

const reducer = combineReducers({
  tenant,
  menus,
  userProfile
})

export default reducer
