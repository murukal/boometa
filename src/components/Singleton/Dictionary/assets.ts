import { Dictionary } from '../../../typings/dictionary'

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
