// react
import { useMemo, createElement, useEffect } from 'react'
// redux
import { useSelector } from 'react-redux'
// react
import { Link, useLocation } from 'react-router-dom'
// antd
import { Menu } from 'antd'
import * as Icons from '@ant-design/icons/lib/icons'
// third
import PerfectScrollbar from 'perfect-scrollbar'
// project
import type { Menu as MenuType } from '~/typings/boomemory/menu'
import type { State } from '~/redux'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import styles from './SiderMenu.module.css'

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

  useEffect(() => {
    // 初始化渲染滚动条
    const ps = new PerfectScrollbar('#side-menu-wrapper')
    return () => {
      ps.destroy()
    }
  }, [])

  return (
    <div id='side-menu-wrapper' className={`relative overflow-hidden ${styles['side-menu-wrapper']}`}>
      <Menu
        mode='inline'
        theme='dark'
        defaultOpenKeys={mappedMenuKeys.defaultOpenedKeys}
        selectedKeys={mappedMenuKeys.defaultSelectedKeys}
        items={menuItems}
      />
    </div>
  )
}

export default SiderMenu
