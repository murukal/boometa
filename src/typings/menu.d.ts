import { ResourceCode } from '~/pages/boomemory/Authorizations'
import { Core } from '.'

export interface Menu extends Core {
  name: string
  sortBy: number
  icon?: string
  parentId?: number
  to?: string
  component?: string
  children?: Menu[]
  resourceCodes?: ResourceCode[]
}

export interface CreateMenuInput extends Pick<Menu, 'name' | 'sortBy' | 'parentId' | 'to' | 'component' | 'icon'> {
  tenantCode: string
}

export interface UpdateMenuInput extends Partial<CreateMenuInput> {}

export interface FilterInput {
  parentId?: number
  tenantCode?: string
}
