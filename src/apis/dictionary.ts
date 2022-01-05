import { request } from '.'
import { PaginateResult } from '../typings/api'
import { CreateDictionary, Dictionary, UpdateDictionary } from '../typings/dictionary'

export const getDictionaries = () =>
  request<PaginateResult<Dictionary>>({
    method: 'GET',
    url: '/api/dictionary'
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
