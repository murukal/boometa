import type { Role } from '../../../typings/role'

export const getInitialSingleton = (): Role => ({
  _id: '',
  name: '',
  authorizations: [],
  users: []
})
