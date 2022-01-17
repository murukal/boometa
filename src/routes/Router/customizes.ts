// router
import { RouteObject } from 'react-router-dom'
// project
import Loadable from '../../components/Loadable'

export const customizes: RouteObject[] = [
  {
    path: '/blog',
    element: Loadable('components/Singleton/Blog')
  },
  {
    path: '/blog/:id',
    element: Loadable('components/Singleton/Blog')
  }
]
