import * as Redux from 'redux'
import { getMetadataStorage, Type } from './MetadataStorage'

/**
 * reducer
 */
const createReducer = (name: string) => (state: any, action: any) => {
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
    return { ...state }
  }
}

/**
 * 创建全局上下文
 */
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

/**
 * hooks
 */
export * from './hooks'

/**
 * decorators
 */
export * from './decorators'
