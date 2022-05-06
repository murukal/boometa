// react
import { useMemo } from 'react'
// redux
import { useSelector } from 'react-redux'
// router
import { RouteObject, useRoutes } from 'react-router-dom'
// projetc
import Loadable from '~/components/Loadable'
import { accountRoutes, essayRoutes, notFoundRoutes, roadmapRoutes } from '.'
import type { State } from '~/redux'
import type { Menu } from '~/typings/menu'

const Router = () => {
  const menus = useSelector<State, Menu[]>((state) => state.menu.menus)

  /** 认证权限后动态生成路由 */
  const authorizatedRoutes = useMemo<RouteObject>(() => {
    const getRoutesFromMenus = (menus: Menu[], routes: RouteObject[] = []) =>
      menus.reduce((total, menu) => {
        // 存在子节点递归
        menu.children && getRoutesFromMenus(menu.children, total)

        // 菜单存在路由，添加到路由表中
        if (menu.to && menu.component) {
          total.push({
            path: menu.to,
            element: Loadable(menu.component)
          })
        }

        // 返回
        return total
      }, routes)

    return {
      path: '/',
      element: Loadable('layouts/Layout'),
      children: getRoutesFromMenus(menus)
    }
  }, [menus])

  // 渲染路由
  const routes = useRoutes([authorizatedRoutes, accountRoutes, essayRoutes, roadmapRoutes, notFoundRoutes])

  /** 直接利用router hooks 返回对应的dom */
  return routes
}

export default Router
