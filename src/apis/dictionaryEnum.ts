import { request } from '.'
import { QueryOptions } from '../typings/api'
import { CreateDictionaryEnum, UpdateDictionaryEnum } from '../typings/dictionaryEnum'
import { stringify } from 'qs'

const url = '/api/dictionary-enum'

export const getDictionaryEnums = (query: QueryOptions) =>
  request({
    method: 'GET',
    url: `${url}?${stringify(query)}`
  })

export const create = (data: CreateDictionaryEnum) =>
  request({
    method: 'POST',
    url,
    data
  })

export const update = (id: string, data: UpdateDictionaryEnum) =>
  request({
    method: 'PATCH',
    url: `${url}/${id}`,
    data
  })

export const remove = (id: string) =>
  request({
    method: 'DELETE',
    url: `${url}/${id}`
  })

export const getDictionaryEnumsByDictionaryCode = (dictionaryCode: string) =>
  request({
    url: `${url}/${dictionaryCode}`
  })
