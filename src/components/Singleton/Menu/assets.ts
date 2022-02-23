import { MenuTreeNode } from '../../../typings/menu'

export interface ExtraProps {
  tenantId: string
  parentId?: string
}

export const getInitialSingleton = (): MenuTreeNode => ({
  _id: '',
  component: '',
  name: '',
  icon: '',
  sortBy: 0,
  to: '',
  permissionKeys: undefined
})
