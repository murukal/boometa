// antd
import type { DataNode } from 'antd/lib/tree'
// project
import type { AbilityKey, Permission, PermissionKey } from '../../../typings/role'

export interface PermissionDataNode extends DataNode {
  value: string
  children?: PermissionDataNode[]
}

export const permissionKeys: Record<PermissionKey, string> = {
  menu: '菜单',
  dictionary: '字典'
}

export const abilityKeys: Record<AbilityKey, string> = {
  retrieve: '检索',
  create: '新增',
  delete: '删除',
  update: '更新'
}

export const permissionTree: PermissionDataNode[] = Object.keys(permissionKeys).map((permissionKey) => ({
  key: permissionKey,
  value: permissionKey,
  title: permissionKeys[permissionKey as PermissionKey],

  // 叶子节点
  children: Object.keys(abilityKeys).map((ablityKey) => ({
    key: `${permissionKey}:${ablityKey}`,
    value: ablityKey,
    title: abilityKeys[ablityKey as AbilityKey]
  })),

  // 当前级别不可选择
  checkable: false
}))

export interface Props {
  isDisabled: boolean
  roleId: string
  onSubmit: Function
  onSubmitted: Function
  permissions: Permission[]
}

export const separator = ':'

export type PermissionModel = Partial<Record<PermissionKey, AbilityKey[]>>
