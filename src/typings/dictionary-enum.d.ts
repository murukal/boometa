export interface DictionaryEnum {
  _id: string
  belongTo: string
  code: string
  description: string
  sortBy: number
}

export interface CreateDictionaryEnum extends Omit<DictionaryEnum, '_id'> {}

export interface UpdateDictionaryEnum extends CreateEnum {}
