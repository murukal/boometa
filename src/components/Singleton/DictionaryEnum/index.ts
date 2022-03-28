// project
import type { DictionaryEnum } from '../../../typings/dictionary-enum'

export { default } from './DictionaryEnum'

export interface ExtraProps {
  parentId: number
}

export const getInitialSingleton = (): DictionaryEnum => ({
  code: '',
  description: '',
  sortBy: 0,
  id: 0,
  parentId: 0
})

export interface FormValues {
  code: string
  description: string
  sortBy: number
}
