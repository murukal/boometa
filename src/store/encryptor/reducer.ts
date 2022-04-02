import { Action } from './action'
import getInitialState from './store'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case 'SET_RSA_PUBLIC_KEY':
      // 获取菜单数据
      action.data && state.setPublicKey(action.data)
  }

  return state
}

export default reducer
