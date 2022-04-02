import { Action } from './action'
import getInitialState from './store'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case 'SET_MENUS':
      // 获取菜单数据
      return action.data
    default:
      // 未被识别的操作
      return state
  }
}

export default reducer
