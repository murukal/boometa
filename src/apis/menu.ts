// project
import { CreateMenu, Menu, MenuTree, UpdateMenu } from '../typings/menu'
import { request } from '.'

/**
 * 获取单个客户端对应的菜单树
 */
export const getMenuTree = (tenant: string) =>
  request<MenuTree>({
    method: 'GET',
    url: `/api/menu/menu-tree/${tenant}`
  })

/**
 * 批量获取客户端对应的菜单树
 */
export const getMenuTrees = (tenants: string[]) =>
  request<MenuTree[]>({
    method: 'GET',
    url: '/api/menu/menu-tree',
    params: {
      tenants
    }
  })

/**
 * 创建菜单
 */
export const create = (menu: CreateMenu) =>
  request<Menu>({
    method: 'POST',
    url: '/api/menu',
    data: menu
  })

/**
 * 删除菜单
 */
export const remove = (_id: string) =>
  request<Menu>({
    method: 'DELETE',
    url: `/api/menu/${_id}`
  })

/**
 * 更新菜单
 */
export const update = (_id: string, menu: UpdateMenu) =>
  request<Menu>({
    method: 'PATCH',
    url: `/api/menu/${_id}`,
    data: menu
  })
