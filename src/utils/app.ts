// project
import { TOKEN } from '~/assets'
import { createDispatch } from '~/relax'
import store from '~/store'
import { initialized } from '~/store/app/action'
import { setRsaPublicKey } from '~/store/encryptor/action'
import { resetMenus, setMenus } from '~/store/menus/action'
import { setTenant } from '~/store/tenant/action'
import { authenticate, logout, setToken } from '~/store/userProfile/action'
import st2 from '~/store2'

/**
 * 应用初始化
 */
export const initialize = async () => {
  const dispatch = store.dispatch
  // 在redux中存储token
  dispatch(setToken())
  // 在redux中存储rsa公钥
  dispatch(await setRsaPublicKey())
  // 在redux中存储租户信息
  dispatch(await setTenant(store.getState().tenant.code))
  // 在redux中存储菜单信息
  dispatch(await setMenus())
  // 在redux中存储用户信息
  dispatch(await authenticate())
  // 在redux中存储应用初始化标识
  dispatch(initialized())

  createDispatch(st2)('ss', 'initialized')
  createDispatch(st2)('ss', 'initialized')
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

  const dispatch = store.dispatch
  // 在redux中存储token
  dispatch(setToken())
  // 用户信息
  dispatch(await authenticate())
  // 在redux中存储菜单信息
  dispatch(await setMenus())
}

/**
 * 退出登陆
 */
export const signOut = async () => {
  // 清楚浏览器的缓存
  localStorage.removeItem(TOKEN)
  sessionStorage.removeItem(TOKEN)

  const dispatch = store.dispatch
  // 在redux中退出登陆
  dispatch(logout())
  // 在redux中重置菜单信息
  dispatch(resetMenus())
}
