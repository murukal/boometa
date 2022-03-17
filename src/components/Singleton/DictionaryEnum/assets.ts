// project
import type { DictionaryEnum } from '../../../typings/dictionary-enum'

export interface ExtraProps {
  dictionaryId: string
}

export const getInitialSingleton = (): DictionaryEnum => ({
  code: '',
  description: '',
  sortBy: 0,
  id: 0,
  belongTo: ''
})

export interface FormValues {
  code: string
  description: string
  sortBy: number
}
