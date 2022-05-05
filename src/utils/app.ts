// project
import { TOKEN } from '~/assets'
import { store } from '~/redux'
import { initialized } from '~/redux/app'
import { setRsaPublicKey } from '~/redux/encryptor'
import { authenticate } from '~/redux/user-profile'
import { initialize as initializeMenu } from '~/redux/menu'

/**
 * 应用初始化
 */
export const initialize = async () => {
  const dispatch = store.dispatch
  // 在redux中存储token
  // dispatch(setToken())
  // 在redux中存储rsa公钥
  dispatch(setRsaPublicKey())
  // 在redux中存储菜单信息
  dispatch(initializeMenu('BOOMETA'))
  // 在redux中存储用户信息
  dispatch(authenticate())
  // 在redux中存储应用初始化标识
  dispatch(initialized())
}

/**
 * 应用再次初始化
 */
export const reinitialize = async (token?: string, isAutoLogin?: boolean) => {
  if (!token) return
  if (isAutoLogin) {
    localStorage.setItem(TOKEN, token)
  } else {
    sessionStorage.setItem(TOKEN, token)
  }

  // const dispatch = store.dispatch
  // // 在redux中存储token
  // dispatch(setToken())
  // // 用户信息
  // dispatch(await authenticate())
  // // 在redux中存储菜单信息
  // dispatch(await setMenus())
}

/**
 * 退出登陆
 */
export const signOut = async () => {
  // 清楚浏览器的缓存
  localStorage.removeItem(TOKEN)
  sessionStorage.removeItem(TOKEN)

  // const dispatch = store.dispatch
  // // 在redux中退出登陆
  // dispatch(logout())
  // // 在redux中重置菜单信息
  // dispatch(resetMenus())
}
