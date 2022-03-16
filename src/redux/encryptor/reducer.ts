import { Action } from './action'
import getInitialState from './store'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case 'SET_RSA_PUBLIC_KEY':
      // 获取菜单数据
      return state.setPublicKey(action.data)
    default:
      // 未被识别的操作
      return state
  }
}

export default reducer
