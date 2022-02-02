// project
import type { QueryOptions } from '../typings/api'
import type { CreateTag, UpdateTag } from '../typings/tag'
import { get, patch, post, shift } from '.'

const url = '/api/tag'

export const getTags = (params: QueryOptions) =>
  get(url, {
    params
  })

export const remove = (id: string) => shift(`${url}/${id}`)

export const create = (data: CreateTag) => post(url, data)

export const update = (id: string, data: UpdateTag) => patch(`${url}/${id}`, data)
