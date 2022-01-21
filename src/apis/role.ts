// npm
import { stringify } from 'qs'
// project
import { request } from '.'
import { QueryOptions } from '../typings/api'
import type { CreateRole, UpdateRole } from '../typings/role'

const url = '/api/role'

export const getRoles = (queryOptions: QueryOptions) =>
  request({
    url: `${url}?${stringify(queryOptions)}`,
    method: 'GET'
  })

export const create = (data: CreateRole) =>
  request({
    url,
    method: 'POST',
    data
  })

export const update = (id: string, data: UpdateRole) =>
  request({
    url: `${url}/${id}`,
    method: 'PATCH',
    data
  })

export const remove = (id: string) =>
  request({
    url: `${url}/${id}`,
    method: 'DELETE'
  })
