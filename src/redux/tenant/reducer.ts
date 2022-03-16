import { Action } from './action'
import getInitialState from './store'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case 'SET_TENANT':
      // 混合生成新的state
      return Object.assign({}, state, action.data)
    default:
      // 未被识别到的操作
      return state
  }
}

export default reducer
