// project
import type { QueryOptions } from '../typings/api'
import type { CreateRole, Role, UpdateRole } from '../typings/role'
import arq from '.'

const url = '/api/role'

export const getRoles = (params: QueryOptions) =>
  arq.get(url, {
    params
  })

export const getRoleById = (id: string) => arq.get<Role>(`${url}/${id}`)

export const create = (data: CreateRole) => arq.post(url, data)

export const update = (id: string, data: UpdateRole) => arq.patch(`${url}/${id}`, data)

export const remove = (id: string) => arq.delete(`${url}/${id}`)
