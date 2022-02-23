// project
import type { CreateMenu, Menu, MenuTree, UpdateMenu } from '../typings/menu'
import arq from '.'

const url = '/api/menu'

/**
 * 查询菜单树
 */
export const getMenuTrees = (tenantCodes: string[]) => arq.get<MenuTree[]>(`${url}/menu-tree/${tenantCodes.toString()}`)

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
