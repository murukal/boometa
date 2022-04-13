import { ActionType } from '../reducer'
import { Action } from './action'
import getInitialState from './store'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case ActionType.SetMenus:
      // 获取菜单数据
      return action.data
    case ActionType.ResetMenus:
      return []
    default:
      // 未被识别的操作
      return state
  }
}

export default reducer
