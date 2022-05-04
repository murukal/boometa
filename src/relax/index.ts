import * as ReactRedux from 'react-redux'
import * as Redux from 'redux'
import { getMetadataStorage, Type } from './MetadataStorage'

type Dispatch = <P>(moduleKey: string, actionKey: string, params?: P) => void

/**
 * dispatch
 */
export const createDispatch = (store: Redux.Store): Dispatch => {
  return async (moduleKey, actionKey, params) => {
    const state = store.getState()
    const module = state[moduleKey]

    if (!module) return

    const action = module[actionKey]

    if (!action) return

    await action(params)

    // 发起redux变更
    // store.dispatch({
    //   type: actionName
    // })
  }
}

/**
 * hooks
 */
export const useDispatch = (): Dispatch => {
  const store = ReactRedux.useStore()
  return createDispatch(store)
}

/**
 * reducer
 */
const createReducer = (name: string) => (state: any, action: any) => {
  console.log('state=====', state)
  console.log('action=====', action)

  /**
   * 抛弃原生的reducer
   * 原因：没有办法处理异步操作
   */

  /**
   * state没有被初始化时
   * 根据action传入的type，对state进行实例化
   */
  if (!state) {
    const target = getMetadataStorage().modules.find((module) => module.name === name)?.target

    if (!target) {
      console.error(`没有对module: ${name}使用装饰器！`)
      return null
    }

    return new target()
  } else {
    return state
  }
}

export const createStore = (...args: Type[]) =>
  Redux.createStore(
    Redux.combineReducers(
      Object.fromEntries(
        args.map((arg) => {
          return [arg.name, createReducer(arg.name)]
        })
      )
    )
  )
