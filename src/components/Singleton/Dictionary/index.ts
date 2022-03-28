import { Dictionary } from '../../../typings/dictionary'

export { default } from './Dictionary'

export const getInitialSingleton = (): Dictionary => ({
  description: '',
  id: 0,
  sortBy: 0,
  code: ''
})

export interface FormValues {
  code: string
  description: string
  sortBy: number
}
