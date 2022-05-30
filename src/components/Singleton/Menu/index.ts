// third
import path from 'path-browserify'
import { ResourceCode } from '~/pages/boomemory/Authorizations'
// project
import type { Menu } from '~/typings/boomemory/menu'

export { default } from './Menu'

export interface ExtraProps {
  tenantCode: string
  parentId?: number
}

export interface FormValues {
  name: string
  sortBy: number
  icon?: string
  to?: string
  component?: string
  resourceCodes?: ResourceCode[]
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
