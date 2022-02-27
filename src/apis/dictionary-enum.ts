// project
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { CreateDictionaryEnum, DictionaryEnum, UpdateDictionaryEnum } from '../typings/dictionary-enum'
import arq from '.'

const url = '/api/dictionary-enum'

export const getDictionaryEnums = (query: QueryOptions) =>
  arq.get<PaginateResult<DictionaryEnum>>(url, { params: query })

export const create = (data: CreateDictionaryEnum) => arq.post(url, data)

export const update = (id: string, data: UpdateDictionaryEnum) => arq.patch(`${url}/${id}`, data)

export const remove = (id: string) => arq.delete(`${url}/${id}`)

/** 通过 dictionaryCode 查询 字典枚举 */
export const getDictionaryEnumsByDictionaryCode = (dicitonaryCode: string) =>
  arq.get<DictionaryEnum[]>(`${url}${dicitonaryCode}`)
