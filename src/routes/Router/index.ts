// react
import { useMemo } from 'react'
// redux
import { useStore } from 'react-redux'
// router
import { RouteObject, useRoutes } from 'react-router-dom'
// projetc
import { MenuTreeNode } from '../../typings/menu'
import Loadable from '../../components/Loadable'
import { accountRoutes } from './Account'

const Router = () => {
  const store = useStore()

  const routes = useMemo((): RouteObject => {
    const menusToRoutes = (menus: MenuTreeNode[], routes: RouteObject[] = []) => {
      return menus.reduce((total, menu) => {
        // 存在子节点递归
        menu.children && menusToRoutes(menu.children, total)

        // 菜单存在路由时，添加到路由表中
        menu.to &&
          total.push({
            path: menu.to,
            element: Loadable(menu.componentPath || '')
          })

        return total
      }, routes)
    }

    return {
      path: '/',
      element: Loadable('layouts/Layout'),
      children: menusToRoutes(store.getState().menus)
    }
  }, [store])

  return useRoutes([routes, accountRoutes])
}

export default Router
