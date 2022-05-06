// react
import { useMemo, createElement } from 'react'
// redux
import { useSelector } from 'react-redux'
// react
import { Link, useLocation } from 'react-router-dom'
// antd
import { Menu } from 'antd'
import * as Icons from '@ant-design/icons/lib/icons'
// project
import type { Menu as MenuType } from '~/typings/menu'
import type { State } from '~/redux'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'

const SiderMenu = () => {
  const menus = useSelector<State, MenuType[]>((state) => state.menu.menus)
  const route = useLocation()

  // 渲染默认选中的条目
  const mappedMenuKeys = useMemo(() => {
    const defaultSelectedKeys: string[] = []
    const defaultOpenedKeys: string[] = []

    // 路由匹配菜单
    const mapRoute = (menus: MenuType[]) => {
      menus.forEach((menu) => {
        if (menu.children) {
          // 默认展开父菜单
          defaultOpenedKeys.push(menu.id.toString())
          // 存在子级，递归匹配
          mapRoute(menu.children)
        } else {
          // 匹配路由
          if (menu.to === route.pathname) {
            menu.id && defaultSelectedKeys.push(menu.id.toString())
          }
        }
      })
    }

    // 调用
    mapRoute(menus)

    return {
      defaultSelectedKeys,
      defaultOpenedKeys
    }
  }, [route, menus])

  const menuItems = useMemo(() => {
    // 递归
    const getMenusMetadata = (menus?: MenuType[]): ItemType[] | undefined =>
      menus?.map((menu) => ({
        key: menu.id,
        icon: menu.icon && createElement(Icons[menu.icon as keyof typeof Icons]),
        label: menu.to ? <Link to={menu.to}>{menu.name}</Link> : menu.name,
        children: getMenusMetadata(menu.children)
      }))

    return getMenusMetadata(menus)
  }, [menus])

  return (
    <>
      <Menu
        mode='inline'
        theme='dark'
        defaultOpenKeys={mappedMenuKeys.defaultOpenedKeys}
        selectedKeys={mappedMenuKeys.defaultSelectedKeys}
        items={menuItems}
      />
    </>
  )
}

export default SiderMenu
