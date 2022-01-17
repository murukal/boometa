// router
import { RouteObject } from 'react-router-dom'
// project
import Loadable from '../../components/Loadable'

export const accounts: RouteObject = {
  path: '/account',
  element: Loadable('pages/Account'),
  children: [
    { path: 'login', element: Loadable('pages/Account/Login') },
    { path: 'register', element: Loadable('pages/Account/Register') }
  ]
}
