import type { Role } from '~/typings/role'

export { default } from './Role'

export const getInitialSingleton = (): Role => ({
  id: 0,
  name: ''
})
