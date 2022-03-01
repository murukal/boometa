export interface Menu {
  _id: string
  name: string
  sortBy: number
  icon?: string

  parent?: Menu | string
  tenant: string

  authorizations: string[]

  route?: {
    to: string
    component: string
  }
}

export interface MenuTreeNode extends Omit<Menu, 'parent' | 'tenant'> {
  children?: MenuTreeNode[]
}

export interface MenuTree {
  tenantCode: string
  nodes: MenuTreeNode[] | null
}

export interface CreateMenu extends Omit<Menu, '_id'> {}

export interface UpdateMenu extends Omit<CreateMenu, 'tenant'> {}
