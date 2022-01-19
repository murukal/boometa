// react
import { useEffect, useState } from 'react'
// redux
import { useDispatch, useStore } from 'react-redux'
// project
import Router from './routes'
import { getTenant } from './apis/tenant'
import { setTenant } from './redux/tenant/actions'
import { getMenuTree } from './apis/menu'
import { setMenus } from './redux/menus/actions'
import { authenticate } from './redux/userProfile/actions'

const App = () => {
  const dispatch = useDispatch()
  const store = useStore()
  const [isReady, setIsReady] = useState(false)

  const onFetch = async () => {
    // 获取租户信息
    const tenantRes = await getTenant(store.getState().tenant.code)
    // 租户未入驻
    if (!tenantRes.data) return
    // 租户已入驻
    dispatch(setTenant(tenantRes.data))

    // 获取菜单数据
    const menuRes = await getMenuTree(tenantRes.data._id)
    // 菜单数据为空
    if (!menuRes.data) return
    // 缓存菜单数据
    dispatch(setMenus(menuRes.data.nodes || []))

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
