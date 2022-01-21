import type { Role } from '../../../typings/role'

export interface Props {
  singleton: Role
  onSubmitted?: Function
}

export const getInitialSingleton = (): Role => ({
  _id: '',
  name: '',
  menus: [],
  users: []
})
