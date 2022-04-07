import { Menu } from './menu'

export interface Tenant {
  code: string
  name: string
  isAuthorizate: boolean
  menus?: Menu[]
}

export interface CreateTenantInput extends Pick<Tenant, 'code' | 'name' | 'isAuthorizate'> {}

export interface UpdateTenantInput extends Partial<CreateTenantInput> {}
