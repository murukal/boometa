import * as ReactRedux from 'react-redux'
import * as Redux from 'redux'

type Dispatch = <P>(moduleKey: string, actionKey: string, params?: P) => void

/**
 * dispatch
 */
export const createDispatch = (store: Redux.Store): Dispatch => {
  return async (moduleKey, actionKey, params) => {
    const state = store.getState()
    const module = state[moduleKey]
    if (!module) return
    const action = module[actionKey].bind(module)
    if (!action) return
    await action(params)

    // 发起redux突变
    // 在突变中深拷贝模块上下文
    store.dispatch({
      type: actionKey
    })
  }
}

/**
 * hooks
 */
export const useDispatch = (): Dispatch => {
  const store = ReactRedux.useStore()
  return createDispatch(store)
}
