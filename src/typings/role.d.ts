export type PermissionKey = 'menu' | 'dictionary'

export type AbilityKey = 'retrieve' | 'create' | 'update' | 'delete'

export interface Permission {
  key: PermissionKey
  abilities: AbilityKey[]
}

export interface Role {
  _id: string
  name: string
  users: string[]
  permissions: Permission[]
}

export interface CreateRole extends Pick<Role, 'name'> {}

export interface UpdateRole extends Partial<Omit<Role, '_id'>> {}
