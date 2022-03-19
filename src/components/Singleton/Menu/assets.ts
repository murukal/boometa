// third
import path from 'path-browserify'
// project
import type { Menu } from '../../../typings/menu'

export interface ExtraProps {
  tenantId: number
  parentId?: number
}

export interface FormValues {
  name: string
  sortBy: number
  icon?: string

  to?: string
  component?: string
}

export const getInitialSingleton = (): Menu => ({
  id: 0,
  name: '',
  sortBy: 0
})

/** 组件的路径 */
export const componentOptions = require
  .context('../../../pages/', true, /tsx$/)
  .keys()
  .map((componentPath) => {
    const actualPath = path.join('pages', path.dirname(componentPath))

    return {
      label: actualPath,
      value: actualPath
    }
  })
