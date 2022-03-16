import { Action } from './action'
import getInitialState from './store'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      // 登录
      return action.data
    case 'LOGOUT':
      // 退出登录
      return action.data
    default:
      // 未被监测到的action
      return state
  }
}

export default reducer
