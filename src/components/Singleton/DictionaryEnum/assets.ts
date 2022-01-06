import { DictionaryEnum } from '../../../typings/dictionaryEnum'

export interface Props {
  dictionaryId: string
  singleton: DictionaryEnum
  onSubmitted?: Function
}

export const getInitialSingleton = (): DictionaryEnum => ({
  code: '',
  description: '',
  sort: 0,
  _id: '',
  belongTo: ''
})
