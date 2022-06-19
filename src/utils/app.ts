// project
import { TENANT_CODE, TOKEN } from '~/assets'
import { store } from '~/redux'
import { initialized } from '~/redux/app'
import { setRsaPublicKey } from '~/redux/app'
import { authenticate, setToken } from '~/redux/user-profile'
import { initialize as initializeMenu } from '~/redux/menu'

/**
 * 应用初始化
 */
export const initialize = async () => {
  const dispatch = store.dispatch
  // 在redux中存储token
  dispatch(setToken(localStorage.getItem(TOKEN) || sessionStorage.getItem(TOKEN)))
  // 在redux中存储rsa公钥
  await dispatch(setRsaPublicKey())
  // 在redux中存储菜单信息
  await dispatch(initializeMenu(TENANT_CODE))
  // 在redux中存储用户信息
  await dispatch(authenticate())
  // 在redux中存储应用初始化标识
  dispatch(initialized())
}

/**
 * 应用再次初始化
 */
export const reinitialize = async (token: string, isAutoLogin?: boolean) => {
  // 清除浏览器缓存中的token
  localStorage.removeItem(TOKEN)
  sessionStorage.removeItem(TOKEN)

  if (isAutoLogin) {
    localStorage.setItem(TOKEN, token)
  } else {
    sessionStorage.setItem(TOKEN, token)
  }

  const dispatch = store.dispatch
  // 在redux中存储token
  dispatch(setToken(token))
  // 用户信息
  await dispatch(authenticate())
  // 在redux中存储菜单信息
  await dispatch(initializeMenu(TENANT_CODE))
}

/**
 * 退出登陆
 */
export const signOut = async () => {
  // 清楚浏览器的缓存
  localStorage.removeItem(TOKEN)
  sessionStorage.removeItem(TOKEN)

  window.location.replace('/account/login')
}
