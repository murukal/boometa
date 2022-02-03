import { DictionaryEnum } from '../../../typings/dictionaryEnum'

export interface ExtraProps {
  dictionaryId: string
}

export const getInitialSingleton = (): DictionaryEnum => ({
  code: '',
  description: '',
  sort: 0,
  _id: '',
  belongTo: ''
})
