// project
import type { CreateMenu, Menu, MenuTree, UpdateMenu } from '../typings/menu'
import { get, patch, post, shift } from '.'

const url = '/api/menu'

/**
 * 获取单个客户端对应的菜单树
 */
export const getMenuTree = (tenant: string) => get(`${url}/menu-tree/${tenant}`)

/**
 * 批量获取客户端对应的菜单树
 */
export const getMenuTrees = (tenants: string[]) =>
  get<MenuTree[]>(`${url}/menu-tree`, {
    params: {
      tenants
    }
  })

/**
 * 创建菜单
 */
export const create = (menu: CreateMenu) => post<Menu>('/api/menu', menu)

/**
 * 删除菜单
 */
export const remove = (id: string) => shift<Menu>(`${url}/${id}`)

/**
 * 更新菜单
 */
export const update = (id: string, menu: UpdateMenu) => patch(`${url}/${id}`, menu)
