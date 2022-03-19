// react
import { useEffect, useState } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// project
import Router from './routes/Router'
import { authenticate, setToken } from './redux/userProfile/action'
import { setTenant } from './redux/tenant/action'
import { setRsaPublicKey } from './redux/encryptor/action'
import type { State } from './redux'
import { setMenus } from './redux/menus/action'

const App = () => {
  const dispatch = useDispatch()
  const tenantCode = useSelector<State, string>((state) => state.tenant.code)
  const [isReady, setIsReady] = useState(false)

  const onFetch = async () => {
    // 在redux中存储token
    dispatch(setToken())

    // 在redux中存储rsa公钥
    dispatch(await setRsaPublicKey())

    // 在redux中存储租户信息
    dispatch(await setTenant(tenantCode))

    // 在redux中存储菜单信息
    dispatch(await setMenus())

    // 在redux中存储用户信息
    dispatch(await authenticate())

    setIsReady(true)
  }

  /** 初始化渲染 */
  useEffect(() => {
    onFetch()
  }, [])

  return <>{isReady && <Router />}</>
}

export default App
