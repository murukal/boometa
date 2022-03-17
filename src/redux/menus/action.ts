import type { Menu } from '../../typings/menu'

export type ActionType = 'SET_MENUS'

export interface Action {
  type: ActionType
  data: Menu[]
}

export const setMenus = (menus: Menu[]): Action => {
  return {
    type: 'SET_MENUS',
    data: menus
  }
}
