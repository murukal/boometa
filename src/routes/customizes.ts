// router
import { RouteObject } from 'react-router-dom'
// project
import Loadable from '../components/Loadable'

export const customizes: RouteObject[] = [
  {
    path: '/blog',
    element: Loadable('pages/Blog')
  },
  {
    path: '/blog/:id',
    element: Loadable('pages/Blog')
  }
]
