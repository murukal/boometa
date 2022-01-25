import { Action } from './actions'
import getInitialState from './store'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      // 登录
      return action.data
    case 'LOGOUT':
      // 退出登录
      return action.data
    case 'PASS_TOKEN':
      // 初始化token
      return action.data
    default:
      // 未被监测到的action
      return state
  }
}

export default reducer
