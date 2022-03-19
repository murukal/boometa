import { Core } from '.'
import { User } from './user'

export interface Role extends Core {
  name: string

  userIds?: number[]
  users?: User[]
}

export interface CreateRoleInput extends Pick<Role, 'name'> {}

export interface UpdateRoleInput extends Partial<CreateRoleInput> {
  userIds?: number[]
  authorizationIds?: number[]
}
