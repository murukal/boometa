// react
import { useLayoutEffect, useState } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// project
import Router from './routes/Router'
import { getTenant } from './redux/tenant/actions'
import { authenticate, passToken } from './redux/userProfile/actions'
import { useQuery } from '@apollo/client'
import { INITIALIZE } from './apis/base'

const App = () => {
  const dispatch = useDispatch()
  const tenantCode = useSelector((state) => state.tenant.code)
  const [isReady, setIsReady] = useState(false)

  const { data, loading: isLoading } = useQuery(INITIALIZE)

  const onFetch = async () => {
    // 将客户端的token存储到redux中
    dispatch(passToken())

    // 获取租户信息
    dispatch(await getTenant(tenantCode))

    // 获取用户数据
    dispatch(await authenticate())
  }

  useLayoutEffect(() => {
    onFetch().finally(() => setIsReady(true))
  }, [])

  return <>{isLoading && <Router />}</>
}

export default App
