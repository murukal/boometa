import { useStore } from 'react-redux'
import { getMetadataStorage } from './MetadataStorage'
import * as redux from 'redux'
import { ClassDeclaration } from 'typescript'

type Dispatch = (name: string, param: any) => void

export const useDispatch = (): Dispatch => {
  const dispatch = useStore().dispatch
  const actions = getMetadataStorage().actions

  return async (name, params) => {
    const action = actions.find((action) => action.actionName === name)

    if (!action || !action.trigger) return

    const state = await action.trigger(params)

    dispatch({
      type: action.actionName,
      state
    })
  }
}

/**
 * reducer
 */
const reducer = (state: any) => {
  console.log('state=====', state)

  /**
   * 抛弃原生的reducer
   * 原因：没有办法处理异步操作
   */

  /**
   * state没有被初始化时
   * 根据action传入的type，对state进行实例化
   */
  if (!state) {
  }

  return state
}

export const createStore = (...args: Function[]) =>
  redux.createStore(redux.combineReducers(Object.fromEntries(args.map((arg) => [arg.name, reducer]))))
