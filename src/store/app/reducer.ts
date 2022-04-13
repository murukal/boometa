import { ActionType } from '../reducer'
import getInitialState from './store'
import type { Action } from './action'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case ActionType.Initialized:
      return {
        ...state,
        isInitialized: true
      }
    default:
      // 未被识别的操作
      return state
  }
}

export default reducer
