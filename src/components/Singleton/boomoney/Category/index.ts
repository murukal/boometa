import { Category } from '~/typings/boomoney/category'

export { default } from './Category'

export const getInitialSingleton = (): Category => ({
  id: 0,
  name: '',
  icon: ''
})
