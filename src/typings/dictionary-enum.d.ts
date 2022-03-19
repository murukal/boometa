import { Core } from '.'

export interface DictionaryEnum extends Core {
  code: string
  description: string
  sortBy: number
  parentId: number
}

export interface CreateDictionaryEnumInput extends Pick<DictionaryEnum, 'code' | 'description' | 'sortBy' | 'parentId'> {}

export interface UpdateDictionaryEnumInput extends Omit<CreateDictionaryEnumInput, 'parentId'> {}
