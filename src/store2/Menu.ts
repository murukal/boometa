import { getMenus } from '~/apis/menu'
import { getMenuTreeFromMenus } from '~/utils/menu'
import store from '.'
import { Menu as MenuType } from '~/typings/menu'
import { Module } from '~/relax'

@Module()
export class Menu {
  menus: MenuType[] = []

  clear() {
    this.menus = []
  }

  async initialize() {
    const menus = (await getMenus(store.getState().tenant.code)).data?.menus.items

    if (menus) {
      // 菜单转树存到redux
      this.menus = getMenuTreeFromMenus(menus)
    }
  }
}
