// project
import { UserProfile } from './store'
import { getUser } from '../../apis/account'
import { TOKEN } from '../../assets'
import store from '..'

export type ActionType = 'AUTHENTICATE' | 'LOGOUT' | 'PASS_TOKEN'

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
    type: 'AUTHENTICATE',
    data: {
      isLogin: !res.code,
      user: res.data,
      token: store.getState().userProfile.token
    }
  }
}

export const logout = (): Action => {
  // 清楚浏览器的缓存
  localStorage.removeItem(TOKEN)
  sessionStorage.removeItem(TOKEN)

  return {
    type: 'LOGOUT',
    data: { isLogin: false, user: null, token: '' }
  }
}

// 将客户端的token初始化到redux中
export const passToken = (): Action => {
  const token = localStorage.getItem(TOKEN) || sessionStorage.getItem(TOKEN)

  return {
    type: 'PASS_TOKEN',
    data: {
      isLogin: false,
      user: null,
      token: token || ''
    }
  }
}
