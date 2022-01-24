// project
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { CreateDictionary, Dictionary, UpdateDictionary } from '../typings/dictionary'
import { get, post, patch, shift } from '.'

const url = '/api/dictionary'

export const getDictionaries = (params: QueryOptions) =>
  get<PaginateResult<Dictionary>>(url, {
    params
  })

export const create = (data: CreateDictionary) => post<Dictionary>(url, data)

export const update = (id: string, data: UpdateDictionary) => patch<Dictionary>(`${url}/${id}`, data)

export const remove = (id: string) => shift(`${url}/${id}`)
