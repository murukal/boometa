export enum ResourceCode {
  Menu = 'menu',
  Tenant = 'tenant',
  Role = 'role',
  Dictionary = 'dictionary',
  DictionaryEnum = 'dictionary-enum'
}

export enum ActionCode {
  Create = 'create',
  Retrieve = 'retrieve',
  Update = 'update',
  Delete = 'delete'
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
