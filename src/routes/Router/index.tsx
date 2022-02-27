// react
import { useEffect, useMemo } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// router
import { RouteObject, useRoutes } from 'react-router-dom'
// projetc
import { MenuTreeNode } from '../../typings/menu'
import Loadable from '../../components/Loadable'
import { getMenus } from '../../redux/menus/actions'
import { accountRoutes, essayRoutes, notFoundRoutes, roadmapRoutes } from './assets'

const Router = () => {
  const isLogin = useSelector((state) => state.userProfile.isLogin)
  const tenantCode = useSelector((state) => state.tenant.code)
  const menus = useSelector((state) => state.menus)
  const dispatch = useDispatch()

  const onFetch = async () => {
    dispatch(await getMenus(tenantCode))
  }

  /** 渲染 */
  useEffect(() => {
    isLogin && onFetch()
  }, [isLogin])

  /** 认证权限后动态生成路由 */
  const authorizatedRoutes = useMemo<RouteObject>(() => {
    const menusToRoutes = (menus: MenuTreeNode[], routes: RouteObject[] = []) => {
      return menus.reduce((total, menu) => {
        // 存在子节点递归
        menu.children && menusToRoutes(menu.children, total)

        // 菜单存在路由时，添加到路由表中
        menu.to &&
          total.push({
            path: menu.to,
            element: Loadable(menu.component || '')
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

  /** 直接利用router hooks 返回对应的dom */
  return useRoutes([authorizatedRoutes, accountRoutes, essayRoutes, roadmapRoutes, notFoundRoutes])
}

export default Router
