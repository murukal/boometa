// project
import { TOKEN } from '~/assets'
import store from '~/store'
import { authenticate, setToken } from '~/store/userProfile/action'

/**
 * 浏览器存储token
 */
export const storeToken = async (token?: string, isAutoLogin?: boolean) => {
  if (!token) return

  if (isAutoLogin) {
    localStorage.setItem(TOKEN, token)
  } else {
    sessionStorage.setItem(TOKEN, token)
  }

  // token
  store.dispatch(setToken())

  // 用户信息
  store.dispatch(await authenticate())
}
