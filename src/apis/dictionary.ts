// project
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { CreateDictionary, Dictionary, UpdateDictionary } from '../typings/dictionary'
import arq from '.'

const url = '/api/dictionary'

/** 查询多个字典 */
export const getDictionaries = (params: QueryOptions) =>
  arq.get<PaginateResult<Dictionary>>(url, {
    params
  })

/** 查询单个字典 */
export const getDictionary = (code: string) => arq.get<Dictionary>(`${url}/${code}`)

export const create = (data: CreateDictionary) => arq.post<Dictionary>(url, data)

export const update = (id: string, data: UpdateDictionary) => arq.patch<Dictionary>(`${url}/${id}`, data)

export const remove = (id: string) => arq.delete(`${url}/${id}`)
