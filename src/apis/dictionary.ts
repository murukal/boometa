// qs
import { stringify } from 'qs'
// project
import { request } from '.'
import { PaginateResult, QueryOptions } from '../typings/api'
import { CreateDictionary, Dictionary, UpdateDictionary } from '../typings/dictionary'

export const getDictionaries = (query: QueryOptions) =>
  request<PaginateResult<Dictionary>>({
    method: 'GET',
    url: `/api/dictionary?${stringify(query)}`
  })

export const create = (data: CreateDictionary) =>
  request<Dictionary>({
    method: 'POST',
    url: '/api/dictionary',
    data
  })

export const update = (id: string, data: UpdateDictionary) =>
  request<Dictionary>({
    method: 'PATCH',
    url: `/api/dictionary/${id}`,
    data
  })

export const remove = (id: string) =>
  request({
    method: 'DELETE',
    url: `/api/dictionary/${id}`
  })
