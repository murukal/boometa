// project
import type { QueryOptions } from '../typings/api'
import type { CreateRole, Role, UpdateRole } from '../typings/role'
import { get, post, patch, shift } from '.'

const url = '/api/role'

export const getRoles = (params: QueryOptions) =>
  get(url, {
    params
  })

export const getRoleById = (id: string) => get<Role>(`${url}/${id}`)

export const create = (data: CreateRole) => post(url, data)

export const update = (id: string, data: UpdateRole) => patch(`${url}/${id}`, data)

export const remove = (id: string) => shift(`${url}/${id}`)
