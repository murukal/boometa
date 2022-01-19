import { RouteObject } from 'react-router-dom'
import Loadable from '../components/Loadable'

export const roadmaps: RouteObject = {
  path: '/boomap',
  element: Loadable('pages/Boomap')
}
