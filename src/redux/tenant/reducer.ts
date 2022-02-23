import { Action } from './actions'
import getInitialState from './store'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case 'GET_TENANT':
      // 租户获取失败
      if (!action.data) return state
      // 设置加密器
      state.encryptor.setPublicKey(action.data.publicKey)
      // 混合生成新的state
      return Object.assign({}, state, action.data)
    default:
      // 未被识别到的操作
      return state
  }
}

export default reducer
