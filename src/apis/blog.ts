// project
import { request } from '.'
import { CreateBlog, UpdateBlog } from '../typings/blog'

export const getBlogs = () =>
  request({
    url: 'api/blog',
    method: 'GET'
  })

export const create = (data: CreateBlog) =>
  request({
    url: 'api/blog',
    method: 'POST',
    data
  })

export const update = (id: string, data: UpdateBlog) =>
  request({
    url: 'api/blog',
    method: 'PATCH',
    data
  })

export const remove = (id: string) =>
  request({
    url: `api/blog/${id}`,
    method: 'DELETE'
  })
