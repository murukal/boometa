import { DictionaryEnum } from './dictionaryEnum'

export interface Dictionary {
  _id: string
  code: string
  description: string
  sort: number
  enums?: DictionaryEnum[]
}

export interface CreateDictionary extends Omit<Dictionary, '_id' | 'enums'> {}

export interface UpdateDictionary extends CreateDictionary {}
