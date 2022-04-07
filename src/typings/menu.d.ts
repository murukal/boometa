import { Core } from '.'

export interface Menu extends Core {
  name: string
  sortBy: number
  icon?: string
  parentId?: number
  to?: string
  component?: string
  children?: Menu[]
}

export interface CreateMenuInput extends Pick<Menu, 'name' | 'sortBy' | 'parentId' | 'to' | 'component'> {
  tenantCode: string
}

export interface UpdateMenuInput extends Partial<CreateMenuInput> {}

export interface FilterInput {
  parentId?: number
  tenantCode?: string
}
