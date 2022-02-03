// project
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { CreateTag, Tag, UpdateTag } from '../typings/tag'
import { get, patch, post, shift } from '.'

const url = '/api/tag'

export const getTags = (params?: QueryOptions) =>
  get<PaginateResult<Tag>>(url, {
    params
  })

export const remove = (id: string) => shift(`${url}/${id}`)

export const create = (data: CreateTag) => post(url, data)

export const update = (id: string, data: UpdateTag) => patch(`${url}/${id}`, data)
