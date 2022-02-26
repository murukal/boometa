// react
import { useMemo } from 'react'
// redux
import { useSelector } from 'react-redux'
// router
import { RouteObject, useRoutes } from 'react-router-dom'
// projetc
import { MenuTreeNode } from '../typings/menu'
import Loadable from '../components/Loadable'
import { accounts } from './accounts'
import { customizes } from './customizes'
import { roadmaps } from './roadmaps'

const Router = () => {
  const menus = useSelector((state) => state.menus)

  const routes = useMemo((): RouteObject => {
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
        .concat(customizes)
        .concat([
          {
            path: '*',
            element: Loadable('layouts/Layout')
          }
        ])
    }
  }, [menus])

  return useRoutes([routes, accounts, roadmaps])
}

export default Router
