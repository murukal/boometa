import { MenuTreeNode } from '../../../typings/menu'

export interface Props {
  tenantId: string
  singleton: MenuTreeNode
  parentId?: string
  onSubmitted?: Function
}

export const getInitialSingleton = (): MenuTreeNode => ({
  _id: '',
  componentPath: '',
  description: '',
  icon: '',
  sort: 0,
  to: '',
  permission: undefined
})
