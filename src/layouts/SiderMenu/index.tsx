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
import type { MenuTreeNode } from '../../typings/menu'

const { Item, SubMenu } = Menu

const SiderMenu = () => {
  const menus = useSelector((state) => state.menus)
  const route = useLocation()

  // 渲染默认选中的条目
  const mappedMenuKeys = useMemo(() => {
    const defaultSelectedKeys: string[] = []
    const defaultOpenedKeys: string[] = []

    // 路由匹配菜单
    const mapRoute = (menus: MenuTreeNode[]): boolean => {
      let isMapped = false

      for (let index = 0; index < menus.length; index++) {
        const menu = menus[index]

        if (menu.children) {
          // 存在子级，递归匹配
          isMapped = mapRoute(menu.children)
          isMapped && menu._id && defaultOpenedKeys.push(menu._id)
        } else {
          // 匹配路由
          if (menu.to === route.pathname) {
            menu._id && defaultSelectedKeys.push(menu._id)
            isMapped = true
          }
        }
      }

      return isMapped
    }

    // 调用
    mapRoute(menus)

    return {
      defaultSelectedKeys,
      defaultOpenedKeys
    }
  }, [route, menus])

  /**
   * menu的子项需要递归渲染
   * @param menuItems
   * @returns
   */
  const renderMenu = (menuItems: MenuTreeNode[]) => {
    return (
      <>
        {menuItems.map((menu) => {
          // 创建动态图标
          const Icon = menu.icon ? createElement(Icons[menu.icon as keyof typeof Icons]) : null

          return !menu.children ? (
            <Item key={menu._id} icon={Icon}>
              {menu.to ? <Link to={menu.to}>{menu.name}</Link> : menu.name}
            </Item>
          ) : (
            <SubMenu key={menu._id} title={menu.name} icon={Icon}>
              {renderMenu(menu.children)}
            </SubMenu>
          )
        })}
      </>
    )
  }

  return (
    <Menu mode='inline' theme='dark' defaultSelectedKeys={mappedMenuKeys.defaultSelectedKeys} defaultOpenKeys={mappedMenuKeys.defaultOpenedKeys}>
      {renderMenu(menus)}
    </Menu>
  )
}

export default SiderMenu
