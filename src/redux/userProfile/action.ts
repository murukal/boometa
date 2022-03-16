// project
import getInitialState, { UserProfile } from './store'
import { TOKEN } from '../../assets'
import type { User } from '../../typings/user'

export type ActionType = 'AUTHENTICATE' | 'LOGOUT'

export interface Action {
  type: ActionType
  data: UserProfile
}

/**
 * 存储用户信息
 */
export const authenticate = (user?: User | null): Action => {
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
export const logout = (): Action => {
  // 清楚浏览器的缓存
  localStorage.removeItem(TOKEN)
  sessionStorage.removeItem(TOKEN)

  return {
    type: 'LOGOUT',
    data: { isLogin: false, user: null, token: null }
  }
}
