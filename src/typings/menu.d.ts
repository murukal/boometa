import { Core } from '.'

export interface Menu extends Core {
  name: string
  sortBy: number
  icon?: string
  tenantId?: number
  parentId?: number

  to?: string
  component?: string

  children?: Menu[]
}

export interface CreateMenuInput extends Pick<Menu, 'name' | 'sortBy' | 'parentId' | 'to' | 'component'> {
  tenantId: number
}

export interface UpdateMenuInput extends Partial<CreateMenuInput> {}

export interface FilterInput {
  parentId?: number
  tenantId?: number
}
