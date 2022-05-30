import { Core } from '..'

export interface Role extends Core {
  name: string
  userIds?: number[]
  authorizationIds?: number[]
}

export interface CreateRoleInput extends Pick<Role, 'name'> {}

export interface UpdateRoleInput extends Partial<CreateRoleInput> {
  userIds?: number[]
  authorizationIds?: number[]
}
