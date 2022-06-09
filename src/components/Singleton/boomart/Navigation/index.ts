import { Navigation } from '~/typings/boomart/navigation'

export { default } from './Navigation'

export const getInitialSingleton = (): Navigation => ({
  id: 0,
  title: ''
})
