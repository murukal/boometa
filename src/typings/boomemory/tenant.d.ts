import { Menu } from './menu'

export interface Tenant {
  code: string
  name: string
  menus?: Menu[]
}

export interface CreateTenantInput extends Pick<Tenant, 'code' | 'name'> {}

export interface UpdateTenantInput extends Partial<CreateTenantInput> {}
