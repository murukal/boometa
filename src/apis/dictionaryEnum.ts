// project
import type { QueryOptions } from '../typings/api'
import type { CreateDictionaryEnum, DictionaryEnum, UpdateDictionaryEnum } from '../typings/dictionaryEnum'
import { get, patch, post, shift } from '.'

const url = '/api/dictionary-enum'

export const getDictionaryEnums = (query: QueryOptions) => get(url, { params: query })

export const create = (data: CreateDictionaryEnum) => post(url, data)

export const update = (id: string, data: UpdateDictionaryEnum) => patch(`${url}/${id}`, data)

export const remove = (id: string) => shift(`${url}/${id}`)

export const getDictionaryEnumsByDictionaryCode = (dictionaryCode: string) => get<DictionaryEnum[]>(`${url}/dictionary-code/${dictionaryCode}`)
