// third
import path from 'path-browserify'
// project
import { permissionKeys, separator } from '../../Roles4Auth/Authorizations/assets'
import type { MenuTreeNode } from '../../../typings/menu'
import type { AbilityKey, PermissionKey } from '../../../typings/role'

export interface ExtraProps {
  tenantId: string
  parentId?: string
}

export interface FormValues {
  name: string
  sortBy: number
  icon?: string

  authorizations: string[]

  route?: {
    to: string
    component: string
  }
}

export const getInitialSingleton = (): MenuTreeNode => ({
  id: 0,
  name: '',
  sortBy: 0,
  authorizations: []
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

/** 检索权限 */
export const authorizationOptions = Object.keys(permissionKeys).map((permissionKey) => ({
  label: permissionKeys[permissionKey as PermissionKey],
  value: `${permissionKey}${separator}${'retrieve' as AbilityKey}`
}))
