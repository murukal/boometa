export type PermissionKey = 'menu' | 'dictionary'

export type AbilityKey = 'retrieve' | 'create' | 'update' | 'delete'

export interface Role {
  _id: string
  name: string
  users: string[]
  authorizations: string[]
}

export interface CreateRole extends Pick<Role, 'name'> {}

export interface UpdateRole extends Partial<Omit<Role, '_id'>> {}
