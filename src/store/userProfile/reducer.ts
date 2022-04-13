import { ActionType } from '../reducer'
import { Action } from './action'
import getInitialState from './store'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case ActionType.Authenticate:
      // 登录
      return action.data
    case ActionType.Logout:
      // 退出登录
      return action.data
    case ActionType.SetToken:
      // 初始化token
      return action.data
    default:
      // 未被监测到的action
      return state
  }
}

export default reducer
