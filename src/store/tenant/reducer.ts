import { ActionType } from '../reducer'
import getInitialState from './store'
import type { Action } from './action'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case ActionType.SetTenant:
      // 混合生成新的state
      return Object.assign({}, state, action.data)
    default:
      // 未被识别到的操作
      return state
  }
}

export default reducer
