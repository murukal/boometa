import { Action, ActionType } from './actions'
import getInitialState from './store'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case ActionType.SET_TENANT:
      // 设置加密器
      state.encrypter.setPublicKey(action.data.publicKey)
      // 混合生成新的state
      return Object.assign({}, state, action.data)
    default:
      // 未被识别到的操作
      return state
  }
}

export default reducer
