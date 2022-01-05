import { MenuTreeNodes } from '../../typings/menu'

export enum ActionType {
  SET_MENUS = 'SET_MENUS'
}

export interface Action {
  type: ActionType
  data: MenuTreeNodes
}

export const setMenus = (menus: MenuTreeNodes): Action => ({
  type: ActionType.SET_MENUS,
  data: menus
})
