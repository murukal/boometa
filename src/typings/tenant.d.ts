import { Core } from '.'
import { Menu } from './menu'

export interface Tenant extends Core {
  code?: string
  name?: string
  isAuthorizate?: boolean
  menus?: Menu[]
}
