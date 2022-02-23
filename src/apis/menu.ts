// project
import type { CreateMenu, Menu, MenuTree, UpdateMenu } from '../typings/menu'
import arq from '.'

const url = '/api/menu'

/**
 * 获取单个客户端对应的菜单树
 */
export const getMenuTree = (tenantCode: string) => arq.get<MenuTree>(`${url}/menu-tree/${tenantCode}`)

/**
 * 批量获取客户端对应的菜单树
 */
export const getMenuTrees = (tenants: string[]) =>
  arq.get<MenuTree[]>(`${url}/menu-tree`, {
    params: {
      tenants
    }
  })

/**
 * 创建菜单
 */
export const create = (menu: CreateMenu) => arq.post<Menu>('/api/menu', menu)

/**
 * 删除菜单
 */
export const remove = (id: string) => arq.delete<Menu>(`${url}/${id}`)

/**
 * 更新菜单
 */
export const update = (id: string, menu: UpdateMenu) => arq.patch(`${url}/${id}`, menu)
