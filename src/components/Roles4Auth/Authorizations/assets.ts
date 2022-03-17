// antd
import type { DataNode } from 'antd/lib/tree'
// project
import type { AbilityKey, PermissionKey } from '../../../typings/role'

export const separator = ':'

export const permissionKeys: Record<PermissionKey, string> = {
  menu: '菜单',
  dictionary: '字典',
  role: '角色',
  tenant: '租户',
  user: '用户',
  essay: '文章',
  tag: '标签'
}

export const abilityKeys: Record<AbilityKey, string> = {
  retrieve: '检索',
  create: '新增',
  delete: '删除',
  update: '更新'
}

export const permissionTree: DataNode[] = Object.keys(permissionKeys).map((permissionKey) => ({
  key: permissionKey,
  title: permissionKeys[permissionKey as PermissionKey],

  // 叶子节点
  children: Object.keys(abilityKeys).map((ablityKey) => ({
    key: `${permissionKey}${separator}${ablityKey}`,
    title: abilityKeys[ablityKey as AbilityKey]
  })),

  // 当前级别不可选择
  checkable: false
}))

export interface Props {
  isDisabled: boolean
  roleId: number
  onSubmit: Function
  onSubmitted: Function
  authorizations: string[]
}
