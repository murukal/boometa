// react
import { useLayoutEffect } from 'react'
// redux
import { useDispatch } from 'react-redux'
// project
import Router from './routes/Router'
import { authenticate } from './redux/userProfile/action'
import { useApolloClient } from '@apollo/client'
import { RSA_PUBLIC_KEY } from './apis'
import { setTenant } from './redux/tenant/action'
import { setRsaPublicKey } from './redux/encryptor/action'
import { TENANT } from './apis/tenant'
import { WHO_AM_I } from './apis/account'

const App = () => {
  const dispatch = useDispatch()
  const client = useApolloClient()

  const onFetch = async () => {
    // 获取rsa公钥
    const { data: rsaPublicKey } = await client.query({
      query: RSA_PUBLIC_KEY
    })

    // 在redux中存储rsa公钥
    dispatch(setRsaPublicKey(rsaPublicKey))

    // 获取租户信息
    const { data: tenant } = await client.query({
      query: TENANT
    })

    // 在redux中存储租户信息
    dispatch(setTenant(tenant))

    // 获取用户信息
    const { data: user } = await client.query({
      query: WHO_AM_I
    })

    // 在redux中存储用户信息
    dispatch(authenticate(user))
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
