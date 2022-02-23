// project
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { CreateTag, Tag, UpdateTag } from '../typings/tag'
import arq from '.'

const url = '/api/tag'

export const getTags = (params?: QueryOptions) =>
  arq.get<PaginateResult<Tag>>(url, {
    params
  })

export const remove = (id: string) => arq.delete(`${url}/${id}`)

export const create = (data: CreateTag) => arq.post(url, data)

export const update = (id: string, data: UpdateTag) => arq.patch(`${url}/${id}`, data)
