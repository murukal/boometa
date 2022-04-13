// project
import store from '..'
import { getMenus } from '~/apis/menu'
import type { Menu } from '~/typings/menu'
import { getMenuTreeFromMenus } from '~/utils/menu'
import { ActionType } from '../reducer'

export interface Action {
  type: ActionType
  data?: Menu[]
}

export const setMenus = async (): Promise<Action> => {
  const res = await getMenus(store.getState().tenant.code)
  // 菜单转树存到redux
  const menuTree = getMenuTreeFromMenus(res.data?.menus.items)

  return {
    type: ActionType.SetMenus,
    data: menuTree
  }
}

export const resetMenus = (): Action => ({
  type: ActionType.ResetMenus
})
