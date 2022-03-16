// react
import { useLayoutEffect } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// project
import Router from './routes/Router'
import { authenticate } from './redux/userProfile/action'
import { getRsaPublicKey } from './apis'
import { setTenant } from './redux/tenant/action'
import { setRsaPublicKey } from './redux/encryptor/action'
import { getTenant } from './apis/tenant'
import { whoAmI } from './apis/account'
import type { State } from './redux'

const App = () => {
  const dispatch = useDispatch()
  const tenantCode = useSelector<State, string>((state) => state.tenant.code)

  const onFetch = async () => {
    // 在redux中存储rsa公钥
    dispatch(setRsaPublicKey((await getRsaPublicKey()).data))

    // 在redux中存储租户信息
    dispatch(setTenant((await getTenant(tenantCode)).data))

    // 在redux中存储用户信息
    dispatch(authenticate((await whoAmI()).data))
  }

  console.log('app function run')

  /** 初始化渲染 */
  useLayoutEffect(() => {
    console.log('useLayoutEffect run')
    onFetch()
  }, [])

  return <Router />
}

export default App
