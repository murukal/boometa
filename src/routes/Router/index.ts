// router
import type { RouteObject } from 'react-router-dom'
// project
import Loadable from '~/components/Loadable'

export { default } from './Router'

/**
 * 认证
 */
export const accountRoutes: RouteObject = {
  path: '/account',
  element: Loadable('pages/boomemory/Account'),
  children: [
    { path: 'login', element: Loadable('pages/boomemory/Account/Login') },
    { path: 'register', element: Loadable('pages/boomemory/Account/Register') },
    { path: 'verify', element: Loadable('pages/boomemory/Account/Verify') }
  ]
}

/**
 * 用户界面
 */
export const userRoutes: RouteObject = {
  path: '/user',
  element: Loadable('layouts/Layout'),
  children: [{ path: 'setting', element: Loadable('pages/boomemory/Account/Setting') }]
}

/**
 * 文章
 */
export const essayRoutes: RouteObject = {
  path: '/essay',
  element: Loadable('layouts/Layout'),
  children: [
    {
      path: '',
      index: true,
      element: Loadable('pages/boomart/Essay')
    },
    {
      path: ':id',
      element: Loadable('pages/boomart/Essay')
    }
  ]
}

/**
 * 路线
 */
export const roadmapRoutes: RouteObject = {
  path: '/boomap',
  element: Loadable('pages/boomemory/Boomap')
}

/**
 * 404
 */
export const notFoundRoutes: RouteObject = {
  path: '*',
  element: Loadable('pages/boomemory/Error'),
  children: [
    {
      path: '*',
      element: Loadable('pages/boomemory/Error/NotFound')
    }
  ]
}
