// npm
import { stringify } from 'qs'
// project
import { request } from '.'
import { QueryOptions } from '../typings/api'
import type { CreateRole, Role, UpdateRole } from '../typings/role'

const url = '/api/role'

export const getRoles = (queryOptions: QueryOptions) => {
  return request({
    url: `${url}?${stringify(queryOptions)}`,
    method: 'GET'
  })
}

export const getRoleById = (id: string) =>
  request<Role>({
    url: `${url}/${id}`,
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
