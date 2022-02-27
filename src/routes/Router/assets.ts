// router
import type { RouteObject } from 'react-router-dom'
// project
import Loadable from '../../components/Loadable'

/** 认证 */
export const accountRoutes: RouteObject = {
  path: '/account',
  element: Loadable('pages/Account'),
  children: [
    { path: 'login', element: Loadable('pages/Account/Login') },
    { path: 'register', element: Loadable('pages/Account/Register') }
  ]
}

/** 文章 */
export const essayRoutes: RouteObject = {
  path: '/essay',
  element: Loadable('layouts/Layout'),
  children: [
    {
      index: true,
      element: Loadable('pages/Essay')
    },
    {
      path: '/essay/:id',
      element: Loadable('pages/Essay')
    }
  ]
}

/** 路线 */
export const roadmapRoutes: RouteObject = {
  path: '/boomap',
  element: Loadable('pages/Boomap')
}
