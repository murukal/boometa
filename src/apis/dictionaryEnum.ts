// project
import type { QueryOptions } from '../typings/api'
import type { CreateDictionaryEnum, DictionaryEnum, UpdateDictionaryEnum } from '../typings/dictionaryEnum'
import arq from '.'

const url = '/api/dictionary-enum'

export const getDictionaryEnums = (query: QueryOptions) => arq.get(url, { params: query })

export const create = (data: CreateDictionaryEnum) => arq.post(url, data)

export const update = (id: string, data: UpdateDictionaryEnum) => arq.patch(`${url}/${id}`, data)

export const remove = (id: string) => arq.delete(`${url}/${id}`)

export const getDictionaryEnumsByDictionaryCode = (dictionaryCode: string) => arq.get<DictionaryEnum[]>(`${url}/dictionary-code/${dictionaryCode}`)
