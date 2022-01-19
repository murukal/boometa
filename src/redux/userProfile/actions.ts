// project
import { UserProfile } from './store'
import { getUser } from '../../apis/account'
import { TOKEN } from '../../assets'
import { Authentication } from '../../typings/user'

export enum ActionType {
  AUTHENTICATE = 'AUTHENTICATE',
  LOGOUT = 'LOGOUT'
}

export interface Action {
  type: ActionType
  data: UserProfile
}

// 获取到token之后，进行用户的认证
export const authenticate = async (): Promise<Action> => {
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
  sessionStorage.removeItem(TOKEN)
  localStorage.removeItem(TOKEN)

  return {
    type: ActionType.LOGOUT,
    data: { isLogin: false, user: null }
  }
}
