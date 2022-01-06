import { MenuTreeNode } from '../../typings/menu'

export enum ActionType {
  SET_MENUS = 'SET_MENUS'
}

export interface Action {
  type: ActionType
  data: MenuTreeNode[]
}

export const setMenus = (menus: MenuTreeNode[]): Action => ({
  type: ActionType.SET_MENUS,
  data: menus
})
