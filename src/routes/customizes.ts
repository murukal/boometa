// router
import { RouteObject } from 'react-router-dom'
// project
import Loadable from '../components/Loadable'

export const customizes: RouteObject[] = [
  {
    path: '/essay',
    element: Loadable('pages/essay')
  },
  {
    path: '/essay/:id',
    element: Loadable('pages/essay')
  }
]
