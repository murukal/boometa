import { Core } from '.'

export interface Menu extends Core {
  name?: string
  sortBy?: number
  icon?: string
  tenantId?: string
  parentId?: string
}
