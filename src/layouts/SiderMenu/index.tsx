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
import type { State } from '../../redux'

const { Item, SubMenu } = Menu

const SiderMenu = () => {
  const menus = useSelector<State, MenuTreeNode[]>((state) => state.menus)
  const route = useLocation()

  // 渲染默认选中的条目
  const mappedMenuKeys = useMemo(() => {
    const defaultSelectedKeys: string[] = []
    const defaultOpenedKeys: string[] = []

    // 路由匹配菜单
    const mapRoute = (menus: MenuTreeNode[]) => {
      menus.forEach((menu) => {
        if (menu.children) {
          // 默认展开父菜单
          defaultOpenedKeys.push(menu._id)
          // 存在子级，递归匹配
          mapRoute(menu.children)
        } else {
          // 匹配路由
          if (menu.route?.to === route.pathname) {
            menu._id && defaultSelectedKeys.push(menu._id)
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

          // menu 含有子节点，渲染为submenu
          if (menu.children)
            return (
              <SubMenu key={menu._id} title={menu.name} icon={Icon}>
                {renderMenu(menu.children)}
              </SubMenu>
            )

          // menu 含有路由信息，渲染为item
          if (menu.route)
            return (
              <Item
                style={{
                  marginTop: 0
                }}
                key={menu._id}
                icon={Icon}
              >
                {menu.route ? <Link to={menu.route.to}>{menu.name}</Link> : menu.name}
              </Item>
            )

          // 都不包含，返回空dom
          return <></>
        })}
      </>
    )
  }

  return (
    <Menu mode='inline' theme='dark' defaultOpenKeys={mappedMenuKeys.defaultOpenedKeys} selectedKeys={mappedMenuKeys.defaultSelectedKeys}>
      {renderMenu(menus)}
    </Menu>
  )
}

export default SiderMenu
