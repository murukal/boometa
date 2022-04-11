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
