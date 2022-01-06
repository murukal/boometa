import { request } from '.'
import { QueryOptions } from '../typings/api'
import { CreateDictionaryEnum, UpdateDictionaryEnum } from '../typings/dictionaryEnum'
import { stringify } from 'qs'

export const getDictionaryEnums = (query: QueryOptions) =>
  request({
    method: 'GET',
    url: `/api/dictionary-enum?${stringify(query)}`
  })

export const create = (data: CreateDictionaryEnum) =>
  request({
    method: 'POST',
    url: '/api/dictionary-enum',
    data
  })

export const update = (id: string, data: UpdateDictionaryEnum) =>
  request({
    method: 'PATCH',
    url: `/api/dictionary-enum/${id}`,
    data
  })

export const remove = (id: string) =>
  request({
    method: 'DELETE',
    url: `/api/dictionary-enum/${id}`
  })
