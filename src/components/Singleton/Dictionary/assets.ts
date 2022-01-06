import { Dictionary } from '../../../typings/dictionary'

export interface Props {
  singleton: Dictionary
  onSubmitted?: Function
}

export const getInitialSingleton = (): Dictionary => ({
  description: '',
  _id: '',
  sort: 0,
  code: ''
})
