import { Core } from '..'

export interface Dictionary extends Core {
  code: string
  description: string
  sortBy: number
}

export interface CreateDictionaryInput extends Pick<Dictionary, 'code' | 'description' | 'sortBy'> {}
