// project
import type { DictionaryEnum } from './dictionary-enum'

export interface Dictionary {
  _id: string
  code: string
  description: string
  sortBy: number
  enums?: DictionaryEnum[]
}

export interface CreateDictionary extends Omit<Dictionary, '_id' | 'enums'> {}

export interface UpdateDictionary extends CreateDictionary {}
