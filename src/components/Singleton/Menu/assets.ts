import { MenuTreeNode } from '../../../typings/menu'

export interface ExtraProps {
  tenantId: string
  parentId?: string
}

export const getInitialSingleton = (): MenuTreeNode => ({
  _id: '',
  componentPath: '',
  name: '',
  icon: '',
  sort: 0,
  to: '',
  permissionKeys: undefined
})
