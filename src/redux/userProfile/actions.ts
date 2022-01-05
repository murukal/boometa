import { UserProfile } from './store'
import { Authentication, getUser } from '../../apis/account'

export enum ActionType {
  AUTHENTICATE = 'AUTHENTICATE',
  LOGOUT = 'LOGOUT'
}

export interface Action {
  type: ActionType
  data: UserProfile
}

// 获取到token之后，进行用户的认证
export const authenticate = async (
  authenticate: Authentication = {
    token: localStorage.getItem('BOOM_AUTH_TOKEN') || ''
  }
): Promise<Action> => {
  // 设置浏览器内存
  localStorage.removeItem('BOOM_AUTH_TOKEN')
  localStorage.setItem('BOOM_AUTH_TOKEN', authenticate.token)

  // 读取用户信息
  const res = await getUser()

  // 生成token
  return {
    type: ActionType.AUTHENTICATE,
    data: {
      isLogin: !res.code,
      user: res.data
    }
  }
}

export const logout = (): Action => {
  // 清楚浏览器的缓存
  localStorage.removeItem('BOOM_AUTH_TOKEN')

  return {
    type: ActionType.LOGOUT,
    data: { isLogin: false, user: null }
  }
}
