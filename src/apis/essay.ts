// project
import arq from '.'
import type { QueryOptions } from '../typings/api'
import type { Essay, CreateEssay, UpdateEssay } from '../typings/essay'

const url = '/api/essay'

export const getEssays = (params: QueryOptions) =>
  arq.get(url, {
    params
  })

export const create = (data: CreateEssay) => arq.post(url, data)

export const update = (id: string, data: UpdateEssay) => arq.patch(`${url}/${id}`, data)

export const remove = (id: string) => arq.delete(`${url}/${id}`)

export const getEssay = (id: string) => arq.get<Essay>(`${url}/${id}`)
