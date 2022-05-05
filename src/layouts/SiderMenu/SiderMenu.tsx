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

const { Item, SubMenu } = Menu

const SiderMenu = () => {
  const menus = useSelector<State, MenuType[]>((state) => [])
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

  /**
   * menu的子项需要递归渲染
   */
  const renderMenu = (menus: MenuType[]) => {
    return (
      <>
        {menus.map((menu) => {
          // 创建动态图标
          const Icon = menu.icon && createElement(Icons[menu.icon as keyof typeof Icons])

          // menu 含有子节点，渲染为submenu
          if (menu.children?.length)
            return (
              <SubMenu key={menu.id} title={menu.name} icon={Icon}>
                {renderMenu(menu.children)}
              </SubMenu>
            )

          // 渲染为item
          if (menu.to)
            return (
              <Item key={menu.id} icon={Icon}>
                <Link to={menu.to}>{menu.name}</Link>
              </Item>
            )

          return null
        })}
      </>
    )
  }

  return (
    <Menu
      mode='inline'
      theme='dark'
      defaultOpenKeys={mappedMenuKeys.defaultOpenedKeys}
      selectedKeys={mappedMenuKeys.defaultSelectedKeys}
    >
      {renderMenu(menus)}
    </Menu>
  )
}

export default SiderMenu
