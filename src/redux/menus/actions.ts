import { getMenuTree } from '../../apis/menu'
import type { MenuTreeNode } from '../../typings/menu'

export type ActionType = 'GET_MENUS'

export interface Action {
  type: ActionType
  data: MenuTreeNode[]
}

export const getMenus = async (tenantCode: string): Promise<Action> => {
  const res = await getMenuTree(tenantCode)

  return {
    type: 'GET_MENUS',
    data: res.data?.nodes || []
  }
}
