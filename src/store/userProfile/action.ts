// project
import getInitialState, { UserProfile } from './store'
import { whoAmI } from '~/apis/auth'
import { ActionType } from '../reducer'

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
    type: ActionType.Authenticate,
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
  type: ActionType.Logout,
  data: { isLogin: false, user: null, token: null }
})

/**
 * 传递token
 */
export const setToken = (): Action => {
  return {
    type: ActionType.SetToken,
    data: getInitialState()
  }
}
