// react
import { useEffect, useState } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// project
import Router from './routes'
import { getTenant } from './redux/tenant/actions'
import { getMenus } from './redux/menus/actions'
import { authenticate, passToken } from './redux/userProfile/actions'

const App = () => {
  const dispatch = useDispatch()
  const tenantCode = useSelector((state) => state.tenant.code)
  const [isReady, setIsReady] = useState(false)

  const onFetch = async () => {
    // 将客户端的token存储到redux中
    dispatch(passToken())

    // 获取租户信息
    dispatch(await getTenant(tenantCode))

    // 获取菜单数据
    dispatch(await getMenus(tenantCode))

    // 获取用户数据
    dispatch(await authenticate())
  }

  // 初次渲染
  useEffect(() => {
    onFetch().finally(() => {
      // 数据准备完成，展示主页面
      setIsReady(true)
    })
  }, [])

  return <>{isReady && <Router />}</>
}

export default App
