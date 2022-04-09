import { CSSProperties } from 'react'

export enum Resource {
  Menu = 'menu',
  Tenant = 'tenant',
  Role = 'role',
  Dictionary = 'dictionary',
  DictionaryEnum = 'dictionary-enum'
}

export enum Action {
  Create = 'create',
  Retrieve = 'retrieve',
  Update = 'update',
  Delete = 'delete'
}

export { default } from './Permissions'

export const getItemStyle = (draggableStyle?: CSSProperties): CSSProperties => ({
  userSelect: 'none',
  margin: `0 0 8px 0`,
  ...draggableStyle
})

export const resources: Resource[] = [Resource.Dictionary, Resource.DictionaryEnum, Resource.Menu, Resource.Role, Resource.Tenant]

export const actions: Action[] = [Action.Create, Action.Delete, Action.Retrieve, Action.Update]
