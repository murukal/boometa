// router
import { RouteObject } from 'react-router-dom'
// project
import Loadable from '../components/Loadable'

export const customizes: RouteObject[] = [
  {
    path: '/essay',
    element: Loadable('pages/Essay')
  },
  {
    path: '/essay/:id',
    element: Loadable('pages/Essay')
  }
]
