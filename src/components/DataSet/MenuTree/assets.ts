import type { MenuTreeNode } from '../../../typings/menu'

export interface TreeDataType {
  tenantCode: string
  tenantName?: string | null
  children?: MenuTreeNode[] | null
}

export interface Props {
  menus: string[]
  isDisable: boolean
  onCheck?: (keys: string[]) => void
}
