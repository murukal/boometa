// antd
import type { ColumnsType } from 'antd/lib/table'
// project
import type { Action, Resource } from '~/typings/auth'

export enum ResourceCode {
  Menu = 'Menu',
  Tenant = 'Tenant',
  Role = 'Role',
  Dictionary = 'Dictionary',
  DictionaryEnum = 'DictionaryEnum'
}

export enum ActionCode {
  Create = 'Create',
  Retrieve = 'Retrieve',
  Update = 'Update',
  Delete = 'Delete'
}

export { default } from './Authorizations'

export const resourceCodes: ResourceCode[] = [
  ResourceCode.Dictionary,
  ResourceCode.DictionaryEnum,
  ResourceCode.Menu,
  ResourceCode.Role,
  ResourceCode.Tenant
]

export const actionCodes: ActionCode[] = [ActionCode.Create, ActionCode.Delete, ActionCode.Retrieve, ActionCode.Update]

/**
 * 权限资源列
 */
export const getResourceColumns = <T = Resource>(): ColumnsType<T> => [
  {
    title: '资源code',
    dataIndex: 'code',
    width: 100
  },
  {
    title: '资源名称',
    dataIndex: 'name',
    width: 100
  }
]

/**
 * 权限操作列
 */
export const getActionColumns = <T = Action>(): ColumnsType<T> => [
  {
    title: '操作code',
    dataIndex: 'code',
    width: 100
  },
  {
    title: '操作名称',
    dataIndex: 'name',
    width: 100
  }
]
