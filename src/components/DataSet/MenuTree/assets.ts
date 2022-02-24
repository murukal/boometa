import type { MenuTreeNode } from '../../../typings/menu'

export interface TreeDataType {
  _id: string
  name?: string | null
  children?: MenuTreeNode[] | null
  checkable?: boolean
}

export interface Props {
  menus: string[]
  isDisable: boolean
  onCheck?: (keys: string[]) => void
}
