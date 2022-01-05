export interface Menu {
  _id: string
  description: string
  sort: number
  icon?: string
  to?: string
  componentPath?: string
  parent?: Menu | string
  tenant: string
}

export interface MenuTreeNode extends Omit<Menu, 'parent' | 'tenant'> {
  children?: Menus
}

export type MenuTreeNodes = MenuTreeNode[]

export interface MenuTree {
  tenant: string
  nodes: MenuTreeNodes | null
}

export type MenuTrees = MenuTree[]

export interface CreateMenu extends Omit<Menu, '_id'> {}

export interface UpdateMenu extends Omit<CreateMenu, 'tenant'> {}
