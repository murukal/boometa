import type { Role } from '~/typings/boomemory/role'

export { default } from './Role'

export const getInitialSingleton = (): Role => ({
  id: 0,
  name: ''
})
