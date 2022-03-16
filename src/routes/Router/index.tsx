// react
import { useEffect, useMemo, useState } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// router
import { RouteObject, useRoutes } from 'react-router-dom'
// projetc
import Loadable from '../../components/Loadable'
import { getMenus } from '../../redux/menus/action'
import { accountRoutes, essayRoutes, notFoundRoutes, roadmapRoutes } from './assets'
import type { State } from '../../redux'
import type { MenuTreeNode } from '../../typings/menu'

const Router = () => {
  const [isReady, setIsReady] = useState(false)
  const isLogin = useSelector<State>((state) => state.userProfile.isLogin)
  const tenantCode = useSelector<State, string>((state) => state.tenant.code)
  const menus = useSelector<State, MenuTreeNode[]>((state) => state.menus)
  const dispatch = useDispatch()

  const onFetch = async () => {
    dispatch(await getMenus(tenantCode))
  }

  /** 渲染 */
  useEffect(() => {
    isLogin && onFetch().finally(() => setIsReady(true))
    !isLogin && setIsReady(true)
  }, [isLogin])

  /** 认证权限后动态生成路由 */
  const authorizatedRoutes = useMemo<RouteObject>(() => {
    const menusToRoutes = (menus: MenuTreeNode[], routes: RouteObject[] = []) => {
      return menus.reduce((total, menu) => {
        // 存在子节点递归
        menu.children && menusToRoutes(menu.children, total)

        // 菜单存在路由，添加到路由表中
        menu.route &&
          total.push({
            path: menu.route.to,
            element: Loadable(menu.route.component)
          })

        return total
      }, routes)
    }

    return {
      path: '/',
      element: Loadable('layouts/Layout'),
      children: menusToRoutes(menus)
    }
  }, [menus])

  // 渲染路由
  const routes = useRoutes([authorizatedRoutes, accountRoutes, essayRoutes, roadmapRoutes, notFoundRoutes])

  /** 直接利用router hooks 返回对应的dom */
  return <>{isReady && routes}</>
}

export default Router
