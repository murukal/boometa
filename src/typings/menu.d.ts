export interface Menu {
  _id: string
  name: string
  sortBy: number
  icon: string
  to: string
  component: string
  parent?: Menu | string
  tenant: string
  permissionKeys?: Array<string>
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
