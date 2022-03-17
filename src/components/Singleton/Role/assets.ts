import type { Role } from '../../../typings/role'

export const getInitialSingleton = (): Role => ({
  id: 0,
  name: '',
  authorizations: [],
  users: []
})
