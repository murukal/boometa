// project
import getInitialState, { UserProfile } from './store'
import { whoAmI } from '../../apis/auth'

export type ActionType = 'AUTHENTICATE' | 'LOGOUT' | 'SET_TOKEN'

export interface Action {
  type: ActionType
  data: UserProfile
}

/**
 * 存储用户信息
 */
export const authenticate = async (): Promise<Action> => {
  // 查询用户信息
  const { data } = await whoAmI()
  const user = data?.whoAmI

  // 根据查询的用户信息生成redux的aciton
  return {
    type: 'AUTHENTICATE',
    data: {
      isLogin: !!user,
      user,
      token: getInitialState().token
    }
  }
}

/**
 * 退出登录
 */
export const logout = (): Action => ({
  type: 'LOGOUT',
  data: { isLogin: false, user: null, token: null }
})

/**
 * 传递token
 */
export const setToken = (): Action => {
  return {
    type: 'SET_TOKEN',
    data: getInitialState()
  }
}
