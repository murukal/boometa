export interface DictionaryEnum {
  _id: string
  code: string
  description: string
  sort: number
  belongTo: string
}

export interface CreateDictionaryEnum extends Omit<DictionaryEnum, '_id'> {}

export interface UpdateDictionaryEnum extends CreateEnum {}
